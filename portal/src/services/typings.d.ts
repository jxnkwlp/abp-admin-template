/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 211
 **/
import * as Enum from "./enums";

declare namespace API {
    /**
     * *TODO*
     **/
    type AccountAdminSettings = {
        general: AccountGeneralSettings;
        captcha: AccountCaptchaSettings;
        recaptcha: AccountRecaptchaSettings;
    };

    /**
     * *TODO*
     **/
    type AccountAuthenticatorCodeVerifyRequest = {
        code: string;
    };

    /**
     * *TODO*
     **/
    type AccountAuthenticatorInfo = {
        enabled?: boolean | undefined;
        key?: string | undefined;
        formatKey?: string | undefined;
        uri?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountAuthenticatorRecoveryCodesResult = {
        recoveryCodes?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountCaptchaSettings = {
        enableOnLogin?: boolean | undefined;
        enableOnRegistration?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountExternalAuthenticationSchame = {
        name?: string | undefined;
        displayName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountExternalAuthenticationSchameListResult = {
        items?: AccountExternalAuthenticationSchame[] | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountGeneralSettings = {
        isSelfRegistrationEnabled?: boolean | undefined;
        enableLocalLogin?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountHasAuthenticatorResult = {
        enabled?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLink = {
        userId: string;
        token?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLinkTokenValidationRequest = {
        userId: string;
        token: string;
    };

    /**
     * *TODO*
     **/
    type AccountLinkTokenValidationResult = {
        verified?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLinkUser = {
        targetUserId: string;
        targetUserName?: string | undefined;
        targetTenantId?: string | undefined;
        targetTenantName?: string | undefined;
        directlyLinked?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLinkUserListResult = {
        items?: AccountLinkUser[] | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLoginRequest = {
        userNameOrEmailAddress: string;
        password: string;
        rememberMe?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLoginResult = {
        result: Enum.AccountLoginResultType;
        description?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLoginVerifyTwoFactorToken = {
        token: string;
    };

    /**
     * *TODO*
     **/
    type AccountLoginWith2FaRequest = {
        code: string;
        rememberMe?: boolean | undefined;
        rememberMachine?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountLoginWithAuthenticatorRecoveryCodeRequest = {
        recoveryCode: string;
    };

    /**
     * *TODO*
     **/
    type AccountRecaptchaSettings = {
        score: number;
        siteKey?: string | undefined;
        siteSecret?: string | undefined;
        verifyBaseUrl?: string | undefined;
        version: number;
    };

    /**
     * *TODO*
     **/
    type AccountRequiredChangePasswordRequest = {
        password: string;
    };

    /**
     * *TODO*
     **/
    type AccountTfa = {
        enabled?: boolean | undefined;
        isMachineRemembered?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountTFaState = {
        enabled?: boolean | undefined;
        providers?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type AccountTfaVerifyTokenRequest = {
        token: string;
    };

    /**
     * *TODO*
     **/
    type AccountUnlink = {
        userId: string;
        tenantId: string;
    };

    /**
     * *TODO*
     **/
    type AccountVerifyTokenResult = {
        valid?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type ActionApiDescriptionModel = {
        uniqueName?: string | undefined;
        name?: string | undefined;
        httpMethod?: string | undefined;
        url?: string | undefined;
        supportedVersions?: string[] | undefined;
        parametersOnMethod?: MethodParameterApiDescriptionModel[] | undefined;
        parameters?: ParameterApiDescriptionModel[] | undefined;
        returnValue: ReturnValueApiDescriptionModel;
        allowAnonymous?: boolean | undefined;
        implementFrom?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationApiDescriptionModel = {
        modules?: Record<any, ModuleApiDescriptionModel> | undefined;
        types?: Record<any, TypeApiDescriptionModel> | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationAuthConfiguration = {
        grantedPolicies?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationConfiguration = {
        localization: ApplicationLocalizationConfiguration;
        auth: ApplicationAuthConfiguration;
        setting: ApplicationSettingConfiguration;
        currentUser: CurrentUser;
        features: ApplicationFeatureConfiguration;
        globalFeatures: ApplicationGlobalFeatureConfiguration;
        multiTenancy: MultiTenancyInfo;
        currentTenant: CurrentTenant;
        timing: Timing;
        clock: Clock;
        objectExtensions: ObjectExtensions;
        extraProperties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationFeatureConfiguration = {
        values?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationGlobalFeatureConfiguration = {
        enabledFeatures?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationLocalization = {
        resources?: Record<any, ApplicationLocalizationResource> | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationLocalizationConfiguration = {
        values?: any | undefined;
        resources?: Record<any, ApplicationLocalizationResource> | undefined;
        languages?: LanguageInfo[] | undefined;
        currentCulture: CurrentCulture;
        defaultResourceName?: string | undefined;
        languagesMap?: any | undefined;
        languageFilesMap?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationLocalizationResource = {
        texts?: any | undefined;
        baseResources?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type ApplicationSettingConfiguration = {
        values?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type AuditLog = {
        extraProperties?: any | undefined;
        id: string;
        applicationName?: string | undefined;
        userId?: string | undefined;
        userName?: string | undefined;
        tenantId?: string | undefined;
        tenantName?: string | undefined;
        impersonatorUserId?: string | undefined;
        impersonatorTenantId?: string | undefined;
        impersonatorTenantName?: string | undefined;
        executionTime: string;
        executionDuration: number;
        clientIpAddress?: string | undefined;
        clientName?: string | undefined;
        clientId?: string | undefined;
        correlationId?: string | undefined;
        browserInfo?: string | undefined;
        httpMethod?: string | undefined;
        url?: string | undefined;
        exceptions?: string | undefined;
        comments?: string | undefined;
        httpStatusCode?: number | undefined;
        entityChanges?: EntityChange[] | undefined;
        actions?: AuditLogAction[] | undefined;
    };

    /**
     * *TODO*
     **/
    type AuditLogAction = {
        id: string;
        tenantId?: string | undefined;
        auditLogId: string;
        serviceName?: string | undefined;
        methodName?: string | undefined;
        parameters?: string | undefined;
        executionTime: string;
        executionDuration: number;
        extraProperties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type AuditLogPagedResult = {
        items?: AuditLog[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type ChangePasswordInput = {
        currentPassword?: string | undefined;
        newPassword: string;
    };

    /**
     * *TODO*
     **/
    type Clock = {
        kind?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ControllerApiDescriptionModel = {
        controllerName?: string | undefined;
        controllerGroupName?: string | undefined;
        isRemoteService?: boolean | undefined;
        isIntegrationService?: boolean | undefined;
        apiVersion?: string | undefined;
        type?: string | undefined;
        interfaces?: ControllerInterfaceApiDescriptionModel[] | undefined;
        actions?: Record<any, ActionApiDescriptionModel> | undefined;
    };

    /**
     * *TODO*
     **/
    type ControllerInterfaceApiDescriptionModel = {
        type?: string | undefined;
        name?: string | undefined;
        methods?: InterfaceMethodApiDescriptionModel[] | undefined;
    };

    /**
     * *TODO*
     **/
    type CreateFileRequest = {
        parentId: string;
        file: any;
        extraProperties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type CreateOpenIddictScope = {
        extraProperties?: any | undefined;
        description?: string | undefined;
        displayName?: string | undefined;
        name: string;
        properties?: any | undefined;
        resources?: string[] | undefined;
        descriptions?: any | undefined;
        displayNames?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type CreateOrUpdateOpenIddictApplication = {
        extraProperties?: any | undefined;
        clientId: string;
        type: string;
        consentType: string;
        displayName?: string | undefined;
        clientSecret?: string | undefined;
        clientUri?: string | undefined;
        logoUri?: string | undefined;
        properties?: any | undefined;
        displayNames?: any | undefined;
        redirectUris?: string[] | undefined;
        postLogoutRedirectUris?: string[] | undefined;
        requirements?: string[] | undefined;
        grantTypes?: string[] | undefined;
        scopes?: string[] | undefined;
        permissions?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type CurrentCulture = {
        displayName?: string | undefined;
        englishName?: string | undefined;
        threeLetterIsoLanguageName?: string | undefined;
        twoLetterIsoLanguageName?: string | undefined;
        isRightToLeft?: boolean | undefined;
        cultureName?: string | undefined;
        name?: string | undefined;
        nativeName?: string | undefined;
        dateTimeFormat: DateTimeFormat;
    };

    /**
     * *TODO*
     **/
    type CurrentTenant = {
        id?: string | undefined;
        name?: string | undefined;
        isAvailable?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type CurrentUser = {
        isAuthenticated?: boolean | undefined;
        id?: string | undefined;
        tenantId?: string | undefined;
        impersonatorUserId?: string | undefined;
        impersonatorTenantId?: string | undefined;
        impersonatorUserName?: string | undefined;
        impersonatorTenantName?: string | undefined;
        userName?: string | undefined;
        name?: string | undefined;
        surName?: string | undefined;
        email?: string | undefined;
        emailVerified?: boolean | undefined;
        phoneNumber?: string | undefined;
        phoneNumberVerified?: boolean | undefined;
        roles?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DateTimeFormat = {
        calendarAlgorithmType?: string | undefined;
        dateTimeFormatLong?: string | undefined;
        shortDatePattern?: string | undefined;
        fullDateTimePattern?: string | undefined;
        dateSeparator?: string | undefined;
        shortTimePattern?: string | undefined;
        longTimePattern?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryGroup = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        displayName?: string | undefined;
        parentName?: string | undefined;
        description?: string | undefined;
        isPublic?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryGroupCreate = {
        extraProperties?: any | undefined;
        displayName: string;
        description?: string | undefined;
        isPublic?: boolean | undefined;
        name: string;
        parentName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryGroupListResult = {
        items?: DictionaryGroup[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryGroupPagedResult = {
        items?: DictionaryGroup[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type DictionaryGroupUpdate = {
        extraProperties?: any | undefined;
        displayName: string;
        description?: string | undefined;
        isPublic?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryItem = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        displayName?: string | undefined;
        displayOrder: number;
        isEnabled?: boolean | undefined;
        description?: string | undefined;
        value?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryItemCreate = {
        extraProperties?: any | undefined;
        groupName: string;
        displayName: string;
        displayOrder: number;
        isEnabled?: boolean | undefined;
        description?: string | undefined;
        value?: string | undefined;
        name: string;
    };

    /**
     * *TODO*
     **/
    type DictionaryItemListResult = {
        items?: DictionaryItem[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryItemPagedResult = {
        items?: DictionaryItem[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type DictionaryItemUpdate = {
        extraProperties?: any | undefined;
        groupName: string;
        displayName: string;
        displayOrder: number;
        isEnabled?: boolean | undefined;
        description?: string | undefined;
        value?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryListResult = {
        items?: DictionaryResult[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DictionaryResult = {
        name?: string | undefined;
        displayName?: string | undefined;
        description?: string | undefined;
        value?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionDefinition = {
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        displayName?: string | undefined;
        isEnabled?: boolean | undefined;
        groupId?: string | undefined;
        parentId?: string | undefined;
        description?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionDefinitionCreate = {
        name: string;
        displayName: string;
        groupId: string;
        parentId?: string | undefined;
        description?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionDefinitionListResult = {
        items?: DynamicPermissionDefinition[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionDefinitionPagedResult = {
        items?: DynamicPermissionDefinition[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionDefinitionUpdate = {
        displayName: string;
        description?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionGroupDefinition = {
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        displayName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionGroupDefinitionCreateOrUpdate = {
        name: string;
        displayName: string;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionGroupDefinitionListResult = {
        items?: DynamicPermissionGroupDefinition[] | undefined;
    };

    /**
     * *TODO*
     **/
    type DynamicPermissionGroupDefinitionPagedResult = {
        items?: DynamicPermissionGroupDefinition[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type EmailSettings = {
        smtpHost?: string | undefined;
        smtpPort: number;
        smtpUserName?: string | undefined;
        smtpPassword?: string | undefined;
        smtpDomain?: string | undefined;
        smtpEnableSsl?: boolean | undefined;
        smtpUseDefaultCredentials?: boolean | undefined;
        defaultFromAddress?: string | undefined;
        defaultFromDisplayName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type EntityChange = {
        id: string;
        auditLogId: string;
        tenantId?: string | undefined;
        changeTime: string;
        changeType: Enum.EntityChangeType;
        entityTenantId?: string | undefined;
        entityId?: string | undefined;
        entityTypeFullName?: string | undefined;
        propertyChanges?: EntityPropertyChange[] | undefined;
        extraProperties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type EntityChangePagedResult = {
        items?: EntityChange[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type EntityChangeWithUsername = {
        entityChange: EntityChange;
        userName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type EntityExtension = {
        properties?: Record<any, ExtensionProperty> | undefined;
        configuration?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type EntityPropertyChange = {
        id: string;
        tenantId?: string | undefined;
        entityChangeId: string;
        newValue?: string | undefined;
        originalValue?: string | undefined;
        propertyName?: string | undefined;
        propertyTypeFullName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionEnum = {
        fields?: ExtensionEnumField[] | undefined;
        localizationResource?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionEnumField = {
        name?: string | undefined;
        value?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionProperty = {
        type?: string | undefined;
        typeSimple?: string | undefined;
        displayName: LocalizableString;
        api: ExtensionPropertyApi;
        ui: ExtensionPropertyUi;
        attributes?: ExtensionPropertyAttribute[] | undefined;
        configuration?: any | undefined;
        defaultValue?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyApi = {
        onGet: ExtensionPropertyApiGet;
        onCreate: ExtensionPropertyApiCreate;
        onUpdate: ExtensionPropertyApiUpdate;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyApiCreate = {
        isAvailable?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyApiGet = {
        isAvailable?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyApiUpdate = {
        isAvailable?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyAttribute = {
        typeSimple?: string | undefined;
        config?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyUi = {
        onTable: ExtensionPropertyUiTable;
        onCreateForm: ExtensionPropertyUiForm;
        onEditForm: ExtensionPropertyUiForm;
        lookup: ExtensionPropertyUiLookup;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyUiForm = {
        isVisible?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyUiLookup = {
        url?: string | undefined;
        resultListPropertyName?: string | undefined;
        displayPropertyName?: string | undefined;
        valuePropertyName?: string | undefined;
        filterParamName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ExtensionPropertyUiTable = {
        isVisible?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type Feature = {
        name?: string | undefined;
        displayName?: string | undefined;
        value?: string | undefined;
        provider: FeatureProvider;
        description?: string | undefined;
        valueType: IStringValueType;
        depth: number;
        parentName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type FeatureGroup = {
        name?: string | undefined;
        displayName?: string | undefined;
        features?: Feature[] | undefined;
    };

    /**
     * *TODO*
     **/
    type FeatureProvider = {
        name?: string | undefined;
        key?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type File = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        isDirectory?: boolean | undefined;
        fileName?: string | undefined;
        mimeType?: string | undefined;
        length: number;
        hash?: string | undefined;
        uniqueId?: string | undefined;
        parentId?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type FileContainer = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        accessMode: Enum.FileAccessMode;
        accessModeDescription?: string | undefined;
        maximumEachFileSize?: number | undefined;
        maximumFileQuantity?: number | undefined;
        overrideBehavior: Enum.FileOverrideBehavior;
        overrideBehaviorDescription?: string | undefined;
        allowAnyFileExtension?: boolean | undefined;
        allowedFileExtensions?: string | undefined;
        prohibitedFileExtensions?: string | undefined;
        filesCount: number;
        autoDeleteBlob?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type FileContainerCreate = {
        extraProperties?: any | undefined;
        description?: string | undefined;
        accessMode: Enum.FileAccessMode;
        maximumEachFileSize?: number | undefined;
        maximumFileQuantity?: number | undefined;
        overrideBehavior: Enum.FileOverrideBehavior;
        allowAnyFileExtension?: boolean | undefined;
        allowedFileExtensions?: string | undefined;
        prohibitedFileExtensions?: string | undefined;
        autoDeleteBlob?: boolean | undefined;
        name?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type FileContainerListResult = {
        items?: FileContainer[] | undefined;
    };

    /**
     * *TODO*
     **/
    type FileContainerPagedResult = {
        items?: FileContainer[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type FileContainerUpdate = {
        extraProperties?: any | undefined;
        description?: string | undefined;
        accessMode: Enum.FileAccessMode;
        maximumEachFileSize?: number | undefined;
        maximumFileQuantity?: number | undefined;
        overrideBehavior: Enum.FileOverrideBehavior;
        allowAnyFileExtension?: boolean | undefined;
        allowedFileExtensions?: string | undefined;
        prohibitedFileExtensions?: string | undefined;
        autoDeleteBlob?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type FileDirectoryCreate = {
        extraProperties?: any | undefined;
        fileName: string;
        parentId?: string | undefined;
        force?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type FileMoveRequest = {
        targetId?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type FilePagedResult = {
        items?: File[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type FileShareCreateRequest = {
        expirationSecond?: number | undefined;
    };

    /**
     * *TODO*
     **/
    type FileShareResult = {
        fileName?: string | undefined;
        length: number;
        mimeType?: string | undefined;
        downloadUrl?: string | undefined;
        token?: string | undefined;
        expirationTime?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type FileUpdate = {
        extraProperties?: any | undefined;
        fileName: string;
    };

    /**
     * *TODO*
     **/
    type FindTenantResult = {
        success?: boolean | undefined;
        tenantId?: string | undefined;
        name?: string | undefined;
        isActive?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type GetFeatureListResult = {
        groups?: FeatureGroup[] | undefined;
    };

    /**
     * *TODO*
     **/
    type GetPermissionListResult = {
        entityDisplayName?: string | undefined;
        groups?: PermissionGroup[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IanaTimeZone = {
        timeZoneName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClaim = {
        claimType?: string | undefined;
        claimValue?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimListResult = {
        items?: IdentityClaim[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimType = {
        extraProperties?: any | undefined;
        id: string;
        name?: string | undefined;
        required?: boolean | undefined;
        isStatic?: boolean | undefined;
        regex?: string | undefined;
        regexDescription?: string | undefined;
        description?: string | undefined;
        valueType: Enum.IdentityClaimValueType;
        valueTypeAsString?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimTypeCreate = {
        extraProperties?: any | undefined;
        name: string;
        required?: boolean | undefined;
        isStatic?: boolean | undefined;
        regex?: string | undefined;
        regexDescription?: string | undefined;
        description?: string | undefined;
        valueType: Enum.IdentityClaimValueType;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimTypeListResult = {
        items?: IdentityClaimType[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimTypePagedResult = {
        items?: IdentityClaimType[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type IdentityClaimTypeUpdate = {
        extraProperties?: any | undefined;
        name: string;
        required?: boolean | undefined;
        regex?: string | undefined;
        regexDescription?: string | undefined;
        description?: string | undefined;
        valueType: Enum.IdentityClaimValueType;
    };

    /**
     * *TODO*
     **/
    type IdentityClient = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        name?: string | undefined;
        displayName?: string | undefined;
        providerType: Enum.IdentityProviderType;
        providerName?: string | undefined;
        isEnabled?: boolean | undefined;
        displayOrder: number;
        isDebugMode?: boolean | undefined;
        claimMaps?: IdentityClientClaimMap[] | undefined;
        requiredClaimTypes?: string[] | undefined;
        openIdConnectConfiguration: IdentityClientOpenIdConnectConfiguration;
        saml2Configuration: IdentityClientSaml2Configuration;
    };

    /**
     * *TODO*
     **/
    type IdentityClientClaimMap = {
        claimType: string;
        action: Enum.IdentityClientClaimMapAction;
        valueFromType?: string | undefined;
        rawValue?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClientCreate = {
        extraProperties?: any | undefined;
        displayName: string;
        providerType: Enum.IdentityProviderType;
        isEnabled?: boolean | undefined;
        displayOrder: number;
        isDebugMode?: boolean | undefined;
        claimMaps?: IdentityClientClaimMap[] | undefined;
        requiredClaimTypes?: string[] | undefined;
        openIdConnectConfiguration: IdentityClientOpenIdConnectConfiguration;
        saml2Configuration: IdentityClientSaml2Configuration;
        name: string;
    };

    /**
     * *TODO*
     **/
    type IdentityClientOpenIdConnectConfiguration = {
        authority: string;
        clientId?: string | undefined;
        clientSecret?: string | undefined;
        metadataAddress: string;
        requireHttpsMetadata?: boolean | undefined;
        responseMode?: string | undefined;
        responseType?: string | undefined;
        usePkce?: boolean | undefined;
        scope?: string | undefined;
        getClaimsFromUserInfoEndpoint?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClientPagedResult = {
        items?: IdentityClient[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type IdentityClientSaml2Configuration = {
        idpMetadataUrl?: string | undefined;
        idpMetadataContent?: string | undefined;
        issuer?: string | undefined;
        forceAuthn?: boolean | undefined;
        trustCertificate?: boolean | undefined;
        authnRequestsSigned?: boolean | undefined;
        requireAssertionsSigned?: boolean | undefined;
        signingCertificatePem?: string | undefined;
        signingCertificateKeyPem?: string | undefined;
        useGetAsAssertionConsumerService?: boolean | undefined;
        useGetAsSingleLogoutService?: boolean | undefined;
        callbackPath?: string | undefined;
        remoteSignOutPath?: string | undefined;
        nameIDFormats?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityClientUpdate = {
        extraProperties?: any | undefined;
        displayName: string;
        providerType: Enum.IdentityProviderType;
        isEnabled?: boolean | undefined;
        displayOrder: number;
        isDebugMode?: boolean | undefined;
        claimMaps?: IdentityClientClaimMap[] | undefined;
        requiredClaimTypes?: string[] | undefined;
        openIdConnectConfiguration: IdentityClientOpenIdConnectConfiguration;
        saml2Configuration: IdentityClientSaml2Configuration;
    };

    /**
     * *TODO*
     **/
    type IdentityLockoutSettings = {
        allowedForNewUsers?: boolean | undefined;
        lockoutDuration: number;
        maxFailedAccessAttempts: number;
    };

    /**
     * *TODO*
     **/
    type IdentityPasswordSettings = {
        requireDigit?: boolean | undefined;
        requireLowercase?: boolean | undefined;
        requireNonAlphanumeric?: boolean | undefined;
        requireUppercase?: boolean | undefined;
        requiredLength: number;
        requiredUniqueChars: number;
        forceUsersToPeriodicallyChangePassword?: boolean | undefined;
        passwordChangePeriodDays: number;
    };

    /**
     * *TODO*
     **/
    type IdentityProvider = {
        name?: string | undefined;
        displayName?: string | undefined;
        providerType: Enum.IdentityProviderType;
        authenticationUrl?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityProviderListResult = {
        items?: IdentityProvider[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRole = {
        extraProperties?: any | undefined;
        id: string;
        name?: string | undefined;
        isDefault?: boolean | undefined;
        isStatic?: boolean | undefined;
        isPublic?: boolean | undefined;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleClaim = {
        claimType: string;
        claimValue: string;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleClaimAddOrUpdate = {
        items?: IdentityRoleClaim[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleCreate = {
        extraProperties?: any | undefined;
        name: string;
        isDefault?: boolean | undefined;
        isPublic?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleListResult = {
        items?: IdentityRole[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleMoveAllUserRequest = {
        targetId?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityRolePagedResult = {
        items?: IdentityRole[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type IdentityRoleUpdate = {
        extraProperties?: any | undefined;
        name: string;
        isDefault?: boolean | undefined;
        isPublic?: boolean | undefined;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentitySecurityLog = {
        extraProperties?: any | undefined;
        id: string;
        tenantId?: string | undefined;
        applicationName?: string | undefined;
        identity?: string | undefined;
        action?: string | undefined;
        userId?: string | undefined;
        userName?: string | undefined;
        tenantName?: string | undefined;
        clientId?: string | undefined;
        correlationId?: string | undefined;
        clientIpAddress?: string | undefined;
        browserInfo?: string | undefined;
        creationTime: string;
    };

    /**
     * *TODO*
     **/
    type IdentitySecurityLogPagedResult = {
        items?: IdentitySecurityLog[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type IdentitySettings = {
        user: IdentityUserSettings;
        password: IdentityPasswordSettings;
        lockout: IdentityLockoutSettings;
        signIn: IdentitySignInSettings;
        twofactor: IdentityTwofactorSettings;
        organizationUnit: OrganizationUnitSettings;
    };

    /**
     * *TODO*
     **/
    type IdentitySignInSettings = {
        enablePhoneNumberConfirmation?: boolean | undefined;
        requireConfirmedEmail?: boolean | undefined;
        requireConfirmedPhoneNumber?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityTwofactorSettings = {
        isRememberBrowserEnabled?: boolean | undefined;
        twoFactorBehaviour: Enum.IdentityTwofactoryBehaviour;
        usersCanChange?: boolean | undefined;
        authenticatorIssuer?: string | undefined;
        twoFactorBehaviourDescription?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUser = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        isDeleted?: boolean | undefined;
        deleterId?: string | undefined;
        deletionTime?: string | undefined;
        tenantId?: string | undefined;
        userName?: string | undefined;
        name?: string | undefined;
        surname?: string | undefined;
        email?: string | undefined;
        emailConfirmed?: boolean | undefined;
        phoneNumber?: string | undefined;
        phoneNumberConfirmed?: boolean | undefined;
        isActive?: boolean | undefined;
        lockoutEnabled?: boolean | undefined;
        lockoutEnd?: string | undefined;
        concurrencyStamp?: string | undefined;
        entityVersion: number;
    };

    /**
     * *TODO*
     **/
    type IdentityUserClaim = {
        claimType: string;
        claimValue: string;
    };

    /**
     * *TODO*
     **/
    type IdentityUserClaimAddOrUpdate = {
        items?: IdentityUserClaim[] | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserCreateV2 = {
        extraProperties?: any | undefined;
        userName: string;
        name?: string | undefined;
        surname?: string | undefined;
        email: string;
        phoneNumber?: string | undefined;
        isActive?: boolean | undefined;
        lockoutEnabled?: boolean | undefined;
        roleNames?: string[] | undefined;
        shouldChangePasswordOnNextLogin?: boolean | undefined;
        organizationUnitIds?: string[] | undefined;
        password?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserPagedResult = {
        items?: IdentityUser[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type IdentityUserSetLockoutRequest = {
        endTime: string;
    };

    /**
     * *TODO*
     **/
    type IdentityUserSettings = {
        isEmailUpdateEnabled?: boolean | undefined;
        isUserNameUpdateEnabled?: boolean | undefined;
        requireUniqueEmail?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserShouldChangePassword = {
        result?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserTwoFactorEnabled = {
        enabled?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserUpdateConfirmed = {
        confirmed?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserUpdateOrganizationUnits = {
        ids: string[];
    };

    /**
     * *TODO*
     **/
    type IdentityUserUpdatePassword = {
        password: string;
    };

    /**
     * *TODO*
     **/
    type IdentityUserUpdateRoles = {
        roleNames: string[];
    };

    /**
     * *TODO*
     **/
    type IdentityUserUpdateV2 = {
        extraProperties?: any | undefined;
        userName: string;
        name?: string | undefined;
        surname?: string | undefined;
        email: string;
        phoneNumber?: string | undefined;
        isActive?: boolean | undefined;
        lockoutEnabled?: boolean | undefined;
        roleNames?: string[] | undefined;
        shouldChangePasswordOnNextLogin?: boolean | undefined;
        organizationUnitIds?: string[] | undefined;
        password?: string | undefined;
        concurrencyStamp: string;
    };

    /**
     * *TODO*
     **/
    type IdentityUserV2 = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        isDeleted?: boolean | undefined;
        deleterId?: string | undefined;
        deletionTime?: string | undefined;
        tenantId?: string | undefined;
        userName?: string | undefined;
        name?: string | undefined;
        surname?: string | undefined;
        email?: string | undefined;
        emailConfirmed?: boolean | undefined;
        phoneNumber?: string | undefined;
        phoneNumberConfirmed?: boolean | undefined;
        isActive?: boolean | undefined;
        lockoutEnabled?: boolean | undefined;
        lockoutEnd?: string | undefined;
        concurrencyStamp?: string | undefined;
        entityVersion: number;
        shouldChangePasswordOnNextLogin?: boolean | undefined;
        twoFactorEnabled?: boolean | undefined;
        isExternal?: boolean | undefined;
        isLockout?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type IdentityUserV2PagedResult = {
        items?: IdentityUserV2[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type InterfaceMethodApiDescriptionModel = {
        name?: string | undefined;
        parametersOnMethod?: MethodParameterApiDescriptionModel[] | undefined;
        returnValue: ReturnValueApiDescriptionModel;
    };

    /**
     * *TODO*
     **/
    type IStringValueType = {
        name?: string | undefined;
        properties?: any | undefined;
        validator: IValueValidator;
    };

    /**
     * *TODO*
     **/
    type IValueValidator = {
        name?: string | undefined;
        properties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type LanguageInfo = {
        cultureName?: string | undefined;
        uiCultureName?: string | undefined;
        displayName?: string | undefined;
        twoLetterISOLanguageName?: string | undefined;
        flagIcon?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type LocalizableString = {
        name?: string | undefined;
        resource?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type MethodParameterApiDescriptionModel = {
        name?: string | undefined;
        typeAsString?: string | undefined;
        type?: string | undefined;
        typeSimple?: string | undefined;
        isOptional?: boolean | undefined;
        defaultValue?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type ModuleApiDescriptionModel = {
        rootPath?: string | undefined;
        remoteServiceName?: string | undefined;
        controllers?: Record<any, ControllerApiDescriptionModel> | undefined;
    };

    /**
     * *TODO*
     **/
    type ModuleExtension = {
        entities?: Record<any, EntityExtension> | undefined;
        configuration?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type MultiTenancyInfo = {
        isEnabled?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type NameValue = {
        name?: string | undefined;
        value?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ObjectExtensions = {
        modules?: Record<any, ModuleExtension> | undefined;
        enums?: Record<any, ExtensionEnum> | undefined;
    };

    /**
     * *TODO*
     **/
    type OpenIddictApplication = {
        extraProperties?: any | undefined;
        id: string;
        clientId?: string | undefined;
        type?: string | undefined;
        consentType?: string | undefined;
        displayName?: string | undefined;
        clientSecret?: string | undefined;
        clientUri?: string | undefined;
        logoUri?: string | undefined;
        properties?: any | undefined;
        displayNames?: any | undefined;
        redirectUris?: string[] | undefined;
        postLogoutRedirectUris?: string[] | undefined;
        requirements?: string[] | undefined;
        grantTypes?: string[] | undefined;
        scopes?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type OpenIddictApplicationPagedResult = {
        items?: OpenIddictApplication[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type OpenIddictScope = {
        extraProperties?: any | undefined;
        id: string;
        description?: string | undefined;
        displayName?: string | undefined;
        name?: string | undefined;
        properties?: any | undefined;
        resources?: string[] | undefined;
        descriptions?: any | undefined;
        displayNames?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type OpenIddictScopePagedResult = {
        items?: OpenIddictScope[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnit = {
        extraProperties?: any | undefined;
        id: string;
        creationTime: string;
        creatorId?: string | undefined;
        lastModificationTime?: string | undefined;
        lastModifierId?: string | undefined;
        isDeleted?: boolean | undefined;
        deleterId?: string | undefined;
        deletionTime?: string | undefined;
        parentId?: string | undefined;
        code?: string | undefined;
        displayName?: string | undefined;
        roleIds?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitAddRoleRequest = {
        roleIds: string[];
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitAddUserRequest = {
        userIds: string[];
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitCreate = {
        parentId?: string | undefined;
        displayName: string;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitListResult = {
        items?: OrganizationUnit[] | undefined;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitPagedResult = {
        items?: OrganizationUnit[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitSettings = {
        maxUserMembershipCount: number;
    };

    /**
     * *TODO*
     **/
    type OrganizationUnitUpdate = {
        displayName: string;
    };

    /**
     * *TODO*
     **/
    type ParameterApiDescriptionModel = {
        nameOnMethod?: string | undefined;
        name?: string | undefined;
        jsonName?: string | undefined;
        type?: string | undefined;
        typeSimple?: string | undefined;
        isOptional?: boolean | undefined;
        defaultValue?: any | undefined;
        constraintTypes?: string[] | undefined;
        bindingSourceId?: string | undefined;
        descriptorName?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type PermissionGrantInfo = {
        name?: string | undefined;
        displayName?: string | undefined;
        parentName?: string | undefined;
        isGranted?: boolean | undefined;
        allowedProviders?: string[] | undefined;
        grantedProviders?: ProviderInfo[] | undefined;
    };

    /**
     * *TODO*
     **/
    type PermissionGroup = {
        name?: string | undefined;
        displayName?: string | undefined;
        displayNameKey?: string | undefined;
        displayNameResource?: string | undefined;
        permissions?: PermissionGrantInfo[] | undefined;
    };

    /**
     * *TODO*
     **/
    type Profile = {
        extraProperties?: any | undefined;
        userName?: string | undefined;
        email?: string | undefined;
        name?: string | undefined;
        surname?: string | undefined;
        phoneNumber?: string | undefined;
        isExternal?: boolean | undefined;
        hasPassword?: boolean | undefined;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type PropertyApiDescriptionModel = {
        name?: string | undefined;
        jsonName?: string | undefined;
        type?: string | undefined;
        typeSimple?: string | undefined;
        isRequired?: boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        minimum?: string | undefined;
        maximum?: string | undefined;
        regex?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type ProviderInfo = {
        providerName?: string | undefined;
        providerKey?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type Register = {
        extraProperties?: any | undefined;
        userName: string;
        emailAddress: string;
        password: string;
        appName: string;
    };

    /**
     * *TODO*
     **/
    type RemoteServiceErrorInfo = {
        code?: string | undefined;
        message?: string | undefined;
        details?: string | undefined;
        data?: any | undefined;
        validationErrors?: RemoteServiceValidationErrorInfo[] | undefined;
    };

    /**
     * *TODO*
     **/
    type RemoteServiceErrorResponse = {
        error: RemoteServiceErrorInfo;
    };

    /**
     * *TODO*
     **/
    type RemoteServiceValidationErrorInfo = {
        message?: string | undefined;
        members?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type ResetPassword = {
        userId: string;
        resetToken: string;
        password: string;
    };

    /**
     * *TODO*
     **/
    type ReturnValueApiDescriptionModel = {
        type?: string | undefined;
        typeSimple?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type SendPasswordResetCode = {
        email: string;
        appName: string;
        returnUrl?: string | undefined;
        returnUrlHash?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type SendTestEmailInput = {
        senderEmailAddress: string;
        targetEmailAddress: string;
        subject: string;
        body?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type StringListResult = {
        items?: string[] | undefined;
    };

    /**
     * *TODO*
     **/
    type Tenant = {
        extraProperties?: any | undefined;
        id: string;
        name?: string | undefined;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type TenantCreate = {
        extraProperties?: any | undefined;
        name: string;
        adminEmailAddress: string;
        adminPassword: string;
    };

    /**
     * *TODO*
     **/
    type TenantPagedResult = {
        items?: Tenant[] | undefined;
        totalCount: number;
    };

    /**
     * *TODO*
     **/
    type TenantUpdate = {
        extraProperties?: any | undefined;
        name: string;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type TimeZone = {
        iana: IanaTimeZone;
        windows: WindowsTimeZone;
    };

    /**
     * *TODO*
     **/
    type Timing = {
        timeZone: TimeZone;
    };

    /**
     * *TODO*
     **/
    type TypeApiDescriptionModel = {
        baseType?: string | undefined;
        isEnum?: boolean | undefined;
        enumNames?: string[] | undefined;
        enumValues?: any[] | undefined;
        genericArguments?: string[] | undefined;
        properties?: PropertyApiDescriptionModel[] | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdateEmailSettings = {
        smtpHost?: string | undefined;
        smtpPort: number;
        smtpUserName?: string | undefined;
        smtpPassword?: string | undefined;
        smtpDomain?: string | undefined;
        smtpEnableSsl?: boolean | undefined;
        smtpUseDefaultCredentials?: boolean | undefined;
        defaultFromAddress: string;
        defaultFromDisplayName: string;
    };

    /**
     * *TODO*
     **/
    type UpdateFeature = {
        name?: string | undefined;
        value?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdateFeatures = {
        features?: UpdateFeature[] | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdateOpenIddictScope = {
        extraProperties?: any | undefined;
        description?: string | undefined;
        displayName?: string | undefined;
        name: string;
        properties?: any | undefined;
        resources?: string[] | undefined;
        descriptions?: any | undefined;
        displayNames?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdatePermission = {
        name?: string | undefined;
        isGranted?: boolean | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdatePermissions = {
        permissions?: UpdatePermission[] | undefined;
    };

    /**
     * *TODO*
     **/
    type UpdateProfile = {
        extraProperties?: any | undefined;
        userName?: string | undefined;
        email?: string | undefined;
        name?: string | undefined;
        surname?: string | undefined;
        phoneNumber?: string | undefined;
        concurrencyStamp?: string | undefined;
    };

    /**
     * *TODO*
     **/
    type UserData = {
        id: string;
        tenantId?: string | undefined;
        userName?: string | undefined;
        name?: string | undefined;
        surname?: string | undefined;
        isActive?: boolean | undefined;
        email?: string | undefined;
        emailConfirmed?: boolean | undefined;
        phoneNumber?: string | undefined;
        phoneNumberConfirmed?: boolean | undefined;
        extraProperties?: any | undefined;
    };

    /**
     * *TODO*
     **/
    type UserDataListResult = {
        items?: UserData[] | undefined;
    };

    /**
     * *TODO*
     **/
    type VerifyPasswordResetTokenInput = {
        userId: string;
        resetToken: string;
    };

    /**
     * *TODO*
     **/
    type WindowsTimeZone = {
        timeZoneId?: string | undefined;
    };


}
