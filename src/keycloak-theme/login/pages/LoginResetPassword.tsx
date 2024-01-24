import { Box, Button, Link, TextField, Typography } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginResetPassword(
    props: PageProps<
        Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = msgStr("emailForgotTitle");
    }, []);

    const label = !realm.loginWithEmailAllowed
        ? "username"
        : realm.registrationEmailAsUsername
        ? "email"
        : "usernameOrEmail";

    const autoCompleteHelper: typeof label =
        label === "usernameOrEmail" ? "username" : label;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("emailForgotTitle")}
        >
            <Box className="w-full space-y-2 my-2">
                <Box
                    id="kc-reset-password-form"
                    component="form"
                    action={url.loginAction}
                    method="post"
                    className="w-full flex flex-col my-4 space-y-4"
                >
                    <TextField
                        id={autoCompleteHelper}
                        name={autoCompleteHelper}
                        className="w-full"
                        label={msg(label)}
                        color="secondary"
                        type="text"
                        autoFocus={true}
                        autoComplete="off"
                    />
                    <Button
                        id="kc-reset-password-form-buttons"
                        name="register"
                        className="p-12"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        tabIndex={2}
                    >
                        <Typography className="p-2">
                            {msgStr("doSubmit")}
                        </Typography>
                    </Button>
                </Box>
                <Link
                    href={url.loginUrl}
                    color="secondary"
                    underline="hover"
                    tabIndex={3}
                >
                    {msg("backToLogin")}
                </Link>
            </Box>
        </Template>
    );
}
