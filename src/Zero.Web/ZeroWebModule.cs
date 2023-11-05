using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.MemoryStorage;
using Hangfire.Redis.StackExchange;
using Medallion.Threading;
using Medallion.Threading.FileSystem;
using Medallion.Threading.Redis;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenIddict.Validation.AspNetCore;
using Owl.Abp.CultureMap;
using Passingwind.Abp.FileManagement.Files;
using Passingwind.Abp.FileManagement.Options;
using Passingwind.Abp.Identity.AspNetCore;
using Passingwind.Abp.IdentityClientManagement;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.SwaggerGen;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Basic;
using Volo.Abp.Autofac;
using Volo.Abp.AutoMapper;
using Volo.Abp.BackgroundJobs.Hangfire;
using Volo.Abp.BackgroundWorkers.Hangfire;
using Volo.Abp.BlobStoring;
using Volo.Abp.BlobStoring.FileSystem;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.DistributedLocking;
using Volo.Abp.Emailing;
using Volo.Abp.Hangfire;
using Volo.Abp.Json;
using Volo.Abp.Json.SystemTextJson;
using Volo.Abp.Localization;
using Volo.Abp.MailKit;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict;
using Volo.Abp.Swashbuckle;
using Volo.Abp.Timing;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.VirtualFileSystem;
using Zero.EntityFrameworkCore;
using Zero.Localization;
using Zero.Redis;

namespace Zero.Web;

[DependsOn(
    typeof(ZeroHttpApiModule),
    typeof(ZeroApplicationModule),
    typeof(ZeroEntityFrameworkCoreModule),
    typeof(AbpOpenIddictAspNetCoreModule),
    typeof(AbpAspNetCoreMvcUiBasicThemeModule),
    typeof(AbpAutofacModule),
    typeof(AbpBackgroundJobsHangfireModule),
    typeof(AbpBackgroundWorkersHangfireModule),
    typeof(AbpBlobStoringFileSystemModule),
    typeof(AbpCachingStackExchangeRedisModule),
    typeof(AbpDistributedLockingModule),
    typeof(IdentityAspNetCoreModule),
    typeof(AbpMailKitModule),
    typeof(AbpSwashbuckleModule)
    )]
[DependsOn(typeof(IdentityClientManagementAspNetCoreModule))]
public class ZeroWebModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.PreConfigure<AbpMvcDataAnnotationsLocalizationOptions>(options =>
        {
            options.AddAssemblyResource(
                typeof(ZeroResource),
                typeof(ZeroDomainModule).Assembly,
                typeof(ZeroDomainSharedModule).Assembly,
                typeof(ZeroApplicationModule).Assembly,
                typeof(ZeroApplicationContractsModule).Assembly,
                typeof(ZeroWebModule).Assembly
            );
        });

        PreConfigure<OpenIddictBuilder>(builder =>
        {
            builder.AddValidation(options =>
            {
                options.AddAudiences("zero");
                options.UseLocalServer();
                options.UseAspNetCore();
            });
        });
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var hostingEnvironment = context.Services.GetHostingEnvironment();
        var configuration = context.Services.GetConfiguration();

        ConfigureAuthentication(context.Services);
        ConfigureAutoMapper();
        ConfigureBlobStoring(configuration, hostingEnvironment);
        ConfigureCache(configuration);
        ConfigureClock();
        ConfigureCookies();
        ConfigureDataProtection(context.Services, configuration, hostingEnvironment);
        ConfigureDistributedLocking(context.Services, configuration);
        ConfigureForwardedHeaders();
        ConfigureHealthCheck(context.Services);
        ConfigureJsonOptions();
        ConfigureHangfire(context.Services, configuration);
        ConfigureHttpResponse(context.Services);
        ConfigureLocalization();
        ConfigureUrls(configuration);
        ConfigureVirtualFileSystem(hostingEnvironment);
        ConfigureAutoApiControllers();
        ConfigureSwaggerServices(context.Services);
    }

    public override void PostConfigureServices(ServiceConfigurationContext context)
    {
#if DEBUG
        context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }

    #region Configure Services

    private void ConfigureCookies()
    {
        Configure<CookiePolicyOptions>(options =>
        {
            options.Secure = Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest;
            options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
        });
    }

    private static void ConfigureAuthentication(IServiceCollection services)
    {
        services.ForwardIdentityAuthenticationForBearer(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);

        services.ConfigureApplicationCookie(optopns =>
        {
            optopns.LoginPath = "/auth/login";
            optopns.LogoutPath = "/auth/logout";

            optopns.Events.OnRedirectToLogin = (context) =>
            {
                if (IsAjaxRequest(context.Request) || context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.Headers.Location = context.RedirectUri;
                    context.Response.StatusCode = 401;
                }
                else
                {
                    context.Response.Redirect(context.RedirectUri);
                }

                return Task.CompletedTask;
            };
            optopns.Events.OnRedirectToAccessDenied = (context) =>
            {
                if (IsAjaxRequest(context.Request) || context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.Headers.Location = context.RedirectUri;
                    context.Response.StatusCode = 403;
                }
                else
                {
                    context.Response.Redirect(context.RedirectUri);
                }

                return Task.CompletedTask;
            };
            optopns.Events.OnRedirectToLogout = (context) =>
            {
                if (IsAjaxRequest(context.Request) || context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.Headers.Location = context.RedirectUri;
                    context.Response.StatusCode = 401;
                }
                else
                {
                    context.Response.Redirect(context.RedirectUri);
                }

                return Task.CompletedTask;
            };

            optopns.ForwardDefaultSelector = (ctx) =>
            {
                // Bearer
                string? authorization = ctx.Request?.Headers?.Authorization;
                return !authorization.IsNullOrWhiteSpace() && authorization?.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase) == true
                    ? JwtBearerDefaults.AuthenticationScheme
                    : null;
            };
        });
    }

    private void ConfigureCache(IConfiguration configuration)
    {
        Configure<AbpDistributedCacheOptions>(options => options.KeyPrefix = GetAppName(configuration) + ":");
    }

    private void ConfigureClock()
    {
        Configure<AbpClockOptions>(options => options.Kind = DateTimeKind.Utc);
    }

    private static void ConfigureDataProtection(IServiceCollection services, IConfiguration configuration, IHostEnvironment hostingEnvironment)
    {
        if (!hostingEnvironment.IsDevelopment())
        {
            IDataProtectionBuilder dpBuilder = services.AddDataProtection();

            string appName = GetAppName(configuration);
            RedisOptions redisOptions = GetRedisOptions(configuration);

            if (redisOptions.IsEnabled)
            {
                ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(redisOptions.Configuration);
                dpBuilder.PersistKeysToStackExchangeRedis(redis, $"{appName}:DataProtection-Keys");
            }
        }
    }

    private static void ConfigureDistributedLocking(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IDistributedLockProvider>(_ =>
        {
            RedisOptions redisOptions = GetRedisOptions(configuration);
            if (redisOptions.IsEnabled)
            {
                ConnectionMultiplexer connection = ConnectionMultiplexer.Connect(redisOptions.Configuration!);
                return new RedisDistributedSynchronizationProvider(connection.GetDatabase(redisOptions.DefaultDatabase));
            }

            return new FileDistributedSynchronizationProvider(new DirectoryInfo(Path.Combine(Path.GetTempPath(), GetAppName(configuration), "distributedlock")));
        });
    }
    private void ConfigureForwardedHeaders()
    {
        Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;

            options.ForwardLimit = null;
            options.KnownProxies.Clear();
            options.KnownNetworks.Clear();
        });
    }

    private static void ConfigureHealthCheck(IServiceCollection services)
    {
        services.AddHealthChecks();
    }

    private void ConfigureJsonOptions()
    {
        Configure<AbpJsonOptions>(options =>
        {
            options.InputDateTimeFormats.Add("yyyy/MM/dd HH:mm:ss"); // 2009/06/15 13:45:30
            options.InputDateTimeFormats.Add("yyyy/MM/ddTHH:mm:sszz");  // 2009/06/15T13:45:30+07:00
            options.InputDateTimeFormats.Add("yyyy-MM-dd HH:mm:ss");
        });

        Configure<AbpSystemTextJsonSerializerOptions>(options => options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull);

        Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
        {
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.ReadCommentHandling = System.Text.Json.JsonCommentHandling.Skip;
            options.JsonSerializerOptions.AllowTrailingCommas = true;
        });

        // Config default 'JsonSerializerSettings'
        JsonConvert.DefaultSettings = () =>
        {
            return new JsonSerializerSettings
            {
                Formatting = Formatting.None,
                ContractResolver = new CamelCasePropertyNamesContractResolver() { NamingStrategy = new CamelCaseNamingStrategy(false, true) },
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                DateTimeZoneHandling = DateTimeZoneHandling.Utc,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                NullValueHandling = NullValueHandling.Ignore,
                DefaultValueHandling = DefaultValueHandling.Include,
                TypeNameHandling = TypeNameHandling.None,
                TypeNameAssemblyFormatHandling = TypeNameAssemblyFormatHandling.Simple,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };
        };
    }

    private static void ConfigureHangfire(IServiceCollection services, IConfiguration configuration)
    {
        string appName = GetAppName(configuration);

        services.AddHangfire(config =>
        {
            RedisOptions redisOptions = GetRedisOptions(configuration);
            if (redisOptions.IsEnabled)
            {
                config.UseRedisStorage(redisOptions.Configuration, new RedisStorageOptions
                {
                    Db = redisOptions.DefaultDatabase,
                    Prefix = $"{appName}:Hangfire:"
                });
            }
            else
            {
                config.UseMemoryStorage();
            }

            config
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseColouredConsoleLogProvider();
        });
    }

    private static void ConfigureHttpResponse(IServiceCollection services)
    {
        services.AddResponseCaching();
        services.AddResponseCompression();
    }

    private void ConfigureUrls(IConfiguration configuration)
    {
        Configure<AppUrlOptions>(options => options.Applications["MVC"].RootUrl = configuration["App:SelfUrl"]);
    }

    private void ConfigureAutoMapper()
    {
        Configure<AbpAutoMapperOptions>(options => options.AddMaps<ZeroWebModule>());
    }

    private void ConfigureBlobStoring(IConfiguration configuration, IHostEnvironment hostEnvironment)
    {
        Configure<AbpBlobStoringOptions>(options =>
        {
            options.Containers.ConfigureDefault(container =>
            {
                container.UseFileSystem(fileSystem =>
                {
                    string? path = configuration.GetValue<string>("BlobStoring:FileSystem", "./storage");
                    if (!Path.IsPathRooted(path))
                    {
                        path = Path.Combine(hostEnvironment.ContentRootPath, path!);
                    }

                    fileSystem.BasePath = path;
                });
            });
        });

        Configure<FileManagementOptions>(options =>
        {
            options.DefaultOverrideBehavior = FileOverrideBehavior.Rename;
            options.DefaultContainerAccessMode = FileAccessMode.Authorized;
            options.DefaultAllowedFileExtensions = configuration.GetValue("FileManagement:Default:FileExtensions", "")!.Split(',');
            options.DefaultMaximumFileSize = configuration.GetValue<long>("FileManagement:Default:MaxByteSizeForFile", 10 * 1024 * 1024);
        });
    }

    private void ConfigureLocalization()
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Languages.Add(new LanguageInfo("en", "en", "English"));
            options.Languages.Add(new LanguageInfo("zh-Hans", "zh-Hans", "简体中文"));
        });

        Configure<OwlCultureMapOptions>(options =>
        {
            CultureMapInfo zhHansCultureMapInfo = new CultureMapInfo
            {
                TargetCulture = "zh-Hans",
                SourceCultures = new List<string>
                {
                    "zh",
                    "zh-CN"
                }
            };

            options.CulturesMaps.Add(zhHansCultureMapInfo);
            options.UiCulturesMaps.Add(zhHansCultureMapInfo);
        });
    }

    private void ConfigureVirtualFileSystem(IWebHostEnvironment hostingEnvironment)
    {
        if (hostingEnvironment.IsDevelopment())
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.ReplaceEmbeddedByPhysical<ZeroDomainSharedModule>(Path.Combine(hostingEnvironment.ContentRootPath, $"..{Path.DirectorySeparatorChar}Zero.Domain.Shared"));
                options.FileSets.ReplaceEmbeddedByPhysical<ZeroDomainModule>(Path.Combine(hostingEnvironment.ContentRootPath, $"..{Path.DirectorySeparatorChar}Zero.Domain"));
                options.FileSets.ReplaceEmbeddedByPhysical<ZeroApplicationContractsModule>(Path.Combine(hostingEnvironment.ContentRootPath, $"..{Path.DirectorySeparatorChar}Zero.Application.Contracts"));
                options.FileSets.ReplaceEmbeddedByPhysical<ZeroApplicationModule>(Path.Combine(hostingEnvironment.ContentRootPath, $"..{Path.DirectorySeparatorChar}Zero.Application"));
                options.FileSets.ReplaceEmbeddedByPhysical<ZeroWebModule>(hostingEnvironment.ContentRootPath);
            });
        }
    }

    private static void ConfigureAutoApiControllers()
    {
        //Configure<AbpAspNetCoreMvcOptions>(options =>
        //{
        //    options.ConventionalControllers.Create(typeof(ZeroApplicationModule).Assembly);
        //});
    }

    private static void ConfigureSwaggerServices(IServiceCollection services)
    {
        services.AddAbpSwaggerGen(
            options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Zero App API", Version = "v1" });
                options.DocInclusionPredicate((_, __) => true);
                options.ApplyExtensions();
            }
        );
    }

    #endregion Configure Services

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();
        var configuration = context.GetConfiguration();

        app.UseForwardedHeaders();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
        }

        app.UseOwlRequestLocalization();

        app.UseResponseCaching();
        app.UseResponseCompression();
        app.UseCookiePolicy();
        app.UseForwardedHeaders();
        app.UseCorrelationId();
        app.UseHealthChecks("/health-check");
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAbpOpenIddictValidation();
        app.UseMultiTenancy();
        app.UseHangfireDashboard(options: new DashboardOptions()
        {
            IgnoreAntiforgeryToken = true,
            AsyncAuthorization = new[] { new AbpHangfireAuthorizationFilter() }
        });
        app.UseAuthorization();
        // swagger
        if (configuration.GetValue("OpenApi:Enabled", false))
        {
            app.UseSwagger();
            app.UseAbpSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Zero API");
                options.DisplayOperationId();
                options.DisplayRequestDuration();
                options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });
        }
        app.UseAuditing();
        app.UseConfiguredEndpoints();
        app.Use((context, next) =>
        {
            if (context.Request.Path.StartsWithSegments("/api"))
            {
                context.Response.StatusCode = 404;
                return Task.CompletedTask;
            }

            return next();
        });
    }

    #region Helper

    private static bool IsAjaxRequest(HttpRequest request)
    {
        return string.Equals(request.Query[HeaderNames.XRequestedWith], "XMLHttpRequest", StringComparison.Ordinal) ||
            string.Equals(request.Headers.XRequestedWith, "XMLHttpRequest", StringComparison.Ordinal);
    }

    private static string GetAppName(IConfiguration configuration)
    {
        return configuration.GetValue("App:Name", "ZeroApp")!;
    }

    private static RedisOptions GetRedisOptions(IConfiguration configuration)
    {
        return configuration.GetValue<RedisOptions>("Redis") ?? new RedisOptions();
    }

    #endregion Helper
}
