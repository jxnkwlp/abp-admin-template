/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 **/
//
// enum types
//
/**
 * *TODO*
 **/
export enum AccountLoginResultType {
    Success = 1,
    InvalidUserNameOrPasswordOrToken = 2,
    NotAllowed = 3,
    LockedOut = 4,
    RequiresTwoFactor = 5,
    RequiresChangePassword = 6,
}

/**
 * *TODO*
 **/
export enum EntityChangeType {
    Created = 0,
    Updated = 1,
    Deleted = 2,
}

/**
 * *TODO*
 **/
export enum FileAccessMode {
    Anonymous = 0,
    Readonly = 1,
    Authorized = 10,
    Private = 20,
}

/**
 * *TODO*
 **/
export enum FileOverrideBehavior {
    None = 0,
    Override = 1,
    Rename = 2,
}

/**
 * *TODO*
 **/
export enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    IMUsed = 226,
    MultipleChoices = 300,
    Ambiguous = 301,
    MovedPermanently = 302,
    Moved = 303,
    Found = 304,
    Redirect = 305,
    SeeOther = 306,
    RedirectMethod = 307,
    NotModified = 308,
    UseProxy = 400,
    Unused = 401,
    TemporaryRedirect = 402,
    RedirectKeepVerb = 403,
    PermanentRedirect = 404,
    BadRequest = 405,
    Unauthorized = 406,
    PaymentRequired = 407,
    Forbidden = 408,
    NotFound = 409,
    MethodNotAllowed = 410,
    NotAcceptable = 411,
    ProxyAuthenticationRequired = 412,
    RequestTimeout = 413,
    Conflict = 414,
    Gone = 415,
    LengthRequired = 416,
    PreconditionFailed = 417,
    RequestEntityTooLarge = 421,
    RequestUriTooLong = 422,
    UnsupportedMediaType = 423,
    RequestedRangeNotSatisfiable = 424,
    ExpectationFailed = 426,
    MisdirectedRequest = 428,
    UnprocessableEntity = 429,
    Locked = 431,
    FailedDependency = 451,
    UpgradeRequired = 500,
    PreconditionRequired = 501,
    TooManyRequests = 502,
    RequestHeaderFieldsTooLarge = 503,
    UnavailableForLegalReasons = 504,
    InternalServerError = 505,
    NotImplemented = 506,
    BadGateway = 507,
    ServiceUnavailable = 508,
    GatewayTimeout = 510,
    HttpVersionNotSupported = 511,
}

/**
 * *TODO*
 **/
export enum IdentityClaimValueType {
    String = 0,
    Int = 1,
    Boolean = 2,
    DateTime = 3,
}

/**
 * *TODO*
 **/
export enum IdentityClientClaimMapAction {
    AddIfNotExists = 0,
    AddOrUpdate = 1,
    Append = 2,
    Remove = 3,
}

/**
 * *TODO*
 **/
export enum IdentityProviderType {
    OpenIdConnect = 1,
    Saml2 = 2,
}

/**
 * *TODO*
 **/
export enum IdentityTwofactoryBehaviour {
    Optional = 0,
    Disabled = 1,
    Forced = 2,
}

