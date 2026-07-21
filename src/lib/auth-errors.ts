const AUTH_ERROR_MESSAGES: Record<string, string> = {
    OAuthSignin: "Google sign-in could not be started. Please try again.",
    OAuthCallback: "Google sign-in could not be completed. Please try again or use your email and password.",
    OAuthAccountNotLinked: "This email already uses another sign-in method. Sign in with that method first.",
    AccessDenied: "Google sign-in was cancelled or access was denied.",
    Configuration: "Google sign-in is temporarily unavailable. Please use your email and password.",
    Verification: "The sign-in link is invalid or has expired.",
    MissingCSRF: "Your sign-in session expired. Refresh this page and try again.",
    Default: "Sign-in could not be completed. Please try again.",
};

export function getAuthErrorMessage(code: string | null | undefined) {
    if (!code) return null;
    return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.Default;
}
