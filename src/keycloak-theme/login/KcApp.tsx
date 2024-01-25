import { lazy, Suspense } from "react";
import Fallback, { type PageProps } from "keycloakify/login";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import "./KcApp.css";
import ThemeProvider from "theme/ThemeProvider";

const Template = lazy(() => import("./Template"));

const Error = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const Login = lazy(() => import("./pages/Login"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const Register = lazy(() => import("./pages/Register"));

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const classes: PageProps<any, any>["classes"] = {
    // NOTE: The classes are defined in ./KcApp.css
    kcHtmlClass: "my-root-class h-full",
    kcHeaderWrapperClass: "my-color my-font",
    kcBodyClass: "h-full bg-background",
};

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        // NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
        // We could display a loading progress but it's usually a matter of milliseconds.
        return null;
    }

    /*
     * Examples assuming i18n.currentLanguageTag === "en":
     * i18n.msg("access-denied") === <span>Access denied</span>
     * i18n.msg("foo") === <span>foo in English</span>
     */

    return (
        <ThemeProvider>
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "register.ftl":
                            return (
                                <Register
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-verify-email.ftl":
                            return (
                                <LoginVerifyEmail
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginResetPassword
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-update-password.ftl":
                            return (
                                <LoginUpdatePassword
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-page-expired.ftl":
                            return (
                                <LoginPageExpired
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "error.ftl":
                            return (
                                <Error // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "info.ftl":
                            return (
                                <Info // eslint-disable-next-line @typescript-eslint/naming-convention
                                    {...{ kcContext, i18n, Template, classes }}
                                    doUseDefaultCss={false}
                                />
                            );
                        default:
                            return (
                                <Fallback
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}
