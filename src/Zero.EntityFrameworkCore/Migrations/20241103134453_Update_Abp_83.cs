using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero.Migrations;

/// <inheritdoc />
public partial class UpdateAbp83 : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AbpDynamicPermissionGroups");

        migrationBuilder.DropTable(
            name: "AbpDynamicPermissions");

        migrationBuilder.RenameColumn(
            name: "Type",
            table: "OpenIddictApplications",
            newName: "ClientType");

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictTokens",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictTokens",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictScopes",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictScopes",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictAuthorizations",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictAuthorizations",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictApplications",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictApplications",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AddColumn<string>(
            name: "ApplicationType",
            table: "OpenIddictApplications",
            type: "nvarchar(50)",
            maxLength: 50,
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "JsonWebKeySet",
            table: "OpenIddictApplications",
            type: "nvarchar(max)",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Settings",
            table: "OpenIddictApplications",
            type: "nvarchar(max)",
            nullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppIdentityClients",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppIdentityClients",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFiles",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFiles",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFileContainers",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFileContainers",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFileAccessTokens",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFileAccessTokens",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppDictionaryItems",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppDictionaryItems",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppDictionaryGroups",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppDictionaryGroups",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpUserTwoFactors",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpUserTwoFactors",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpUsers",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpUsers",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpTenants",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpTenants",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AddColumn<string>(
            name: "NormalizedName",
            table: "AbpTenants",
            type: "nvarchar(64)",
            maxLength: 64,
            nullable: false,
            defaultValue: "");

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpSecurityLogs",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpSecurityLogs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpRoles",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpRoles",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpOrganizationUnits",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpOrganizationUnits",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "EntityId",
            table: "AbpEntityChanges",
            type: "nvarchar(128)",
            maxLength: 128,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(128)",
            oldMaxLength: 128);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpClaimTypes",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpClaimTypes",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpBackgroundJobs",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpBackgroundJobs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpAuditLogs",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(max)",
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpAuditLogs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40,
            oldNullable: true);

        migrationBuilder.CreateTable(
            name: "AbpSessions",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                SessionId = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                Device = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                DeviceInfo = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                IpAddresses = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                SignedIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                LastAccessed = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AbpSessions", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AbpSettingDefinitions",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                DisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                Description = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                DefaultValue = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                IsVisibleToClients = table.Column<bool>(type: "bit", nullable: false),
                Providers = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                IsInherited = table.Column<bool>(type: "bit", nullable: false),
                IsEncrypted = table.Column<bool>(type: "bit", nullable: false),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AbpSettingDefinitions", x => x.Id));

        migrationBuilder.CreateIndex(
            name: "IX_AbpTenants_NormalizedName",
            table: "AbpTenants",
            column: "NormalizedName");

        migrationBuilder.CreateIndex(
            name: "IX_AbpSessions_Device",
            table: "AbpSessions",
            column: "Device");

        migrationBuilder.CreateIndex(
            name: "IX_AbpSessions_SessionId",
            table: "AbpSessions",
            column: "SessionId");

        migrationBuilder.CreateIndex(
            name: "IX_AbpSessions_TenantId_UserId",
            table: "AbpSessions",
            columns: new[] { "TenantId", "UserId" });

        migrationBuilder.CreateIndex(
            name: "IX_AbpSettingDefinitions_Name",
            table: "AbpSettingDefinitions",
            column: "Name",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AbpSessions");

        migrationBuilder.DropTable(
            name: "AbpSettingDefinitions");

        migrationBuilder.DropIndex(
            name: "IX_AbpTenants_NormalizedName",
            table: "AbpTenants");

        migrationBuilder.DropColumn(
            name: "ApplicationType",
            table: "OpenIddictApplications");

        migrationBuilder.DropColumn(
            name: "JsonWebKeySet",
            table: "OpenIddictApplications");

        migrationBuilder.DropColumn(
            name: "Settings",
            table: "OpenIddictApplications");

        migrationBuilder.DropColumn(
            name: "NormalizedName",
            table: "AbpTenants");

        migrationBuilder.RenameColumn(
            name: "ClientType",
            table: "OpenIddictApplications",
            newName: "Type");

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictTokens",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictTokens",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictScopes",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictScopes",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictAuthorizations",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictAuthorizations",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "OpenIddictApplications",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "OpenIddictApplications",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppIdentityClients",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppIdentityClients",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFiles",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFiles",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFileContainers",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFileContainers",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppFileAccessTokens",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppFileAccessTokens",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppDictionaryItems",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppDictionaryItems",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AppDictionaryGroups",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AppDictionaryGroups",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpUserTwoFactors",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpUserTwoFactors",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpUsers",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpUsers",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpTenants",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpTenants",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpSecurityLogs",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpSecurityLogs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpRoles",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpRoles",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpOrganizationUnits",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpOrganizationUnits",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "EntityId",
            table: "AbpEntityChanges",
            type: "nvarchar(128)",
            maxLength: 128,
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "nvarchar(128)",
            oldMaxLength: 128,
            oldNullable: true);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpClaimTypes",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpClaimTypes",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpBackgroundJobs",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpBackgroundJobs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.AlterColumn<string>(
            name: "ExtraProperties",
            table: "AbpAuditLogs",
            type: "nvarchar(max)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "ConcurrencyStamp",
            table: "AbpAuditLogs",
            type: "nvarchar(40)",
            maxLength: 40,
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(40)",
            oldMaxLength: 40);

        migrationBuilder.CreateTable(
            name: "AbpDynamicPermissionGroups",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                DisplayName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_AbpDynamicPermissionGroups", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AbpDynamicPermissions",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Description = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                DisplayName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AbpDynamicPermissions", x => x.Id));

        migrationBuilder.CreateIndex(
            name: "IX_AbpDynamicPermissionGroups_Name",
            table: "AbpDynamicPermissionGroups",
            column: "Name",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_AbpDynamicPermissions_GroupId",
            table: "AbpDynamicPermissions",
            column: "GroupId");

        migrationBuilder.CreateIndex(
            name: "IX_AbpDynamicPermissions_Name",
            table: "AbpDynamicPermissions",
            column: "Name",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_AbpDynamicPermissions_ParentId",
            table: "AbpDynamicPermissions",
            column: "ParentId");
    }
}
