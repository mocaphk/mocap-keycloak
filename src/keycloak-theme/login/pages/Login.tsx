import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useEffect, useState, type FormEventHandler } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Login(
    props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    useEffect(() => {
        document.title = msgStr("doLogIn");
    }, []);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            setIsLoginButtonDisabled(true);
            const formElement = e.target as HTMLFormElement;
            formElement.submit();
        }
    );

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
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <>
                        <Box className="w-full flex flex-row justify-evenly py-2 items-baseline">
                            {realm.resetPasswordAllowed && (
                                <Link
                                    id="doForgotPassword"
                                    // className="py-4"
                                    tabIndex={5}
                                    href={url.loginResetCredentialsUrl}
                                    color="secondary"
                                    underline="hover"
                                >
                                    {msg("doForgotPassword")}
                                </Link>
                            )}
                            <Box className="flex flex-row justify-center py-2 space-x-1">
                                <Typography>{msg("noAccount")}</Typography>
                                <Link
                                    href={url.registrationUrl}
                                    tabIndex={6}
                                    color="secondary"
                                    underline="hover"
                                >
                                    {msg("doRegister")}
                                </Link>
                            </Box>
                        </Box>
                    </>
                )
            }
        >
            <Box className="w-full">
                {realm.password && (
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        action={url.loginAction}
                        method="post"
                        className="w-full flex flex-col my-4"
                    >
                        <Grid container className="w-full my-2" spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id={autoCompleteHelper}
                                    name={autoCompleteHelper}
                                    className="w-full"
                                    label={msg(label)}
                                    color="secondary"
                                    type="text"
                                    autoFocus={true}
                                    defaultValue={login.username}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    className="w-full"
                                    label={msg("password")}
                                    color="secondary"
                                    type="password"
                                    autoComplete="off"
                                    tabIndex={2}
                                />
                            </Grid>
                        </Grid>
                        {realm.rememberMe && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="rememberMe"
                                        name="rememberMe"
                                        color="secondary"
                                        tabIndex={3}
                                        defaultChecked={
                                            login.rememberMe === "on"
                                        }
                                    />
                                }
                                label={msg("rememberMe")}
                            />
                        )}
                        {/* hidden logic */}
                        <input
                            type="hidden"
                            id="id-hidden-input"
                            name="credentialId"
                            {...(auth.selectedCredential !== undefined
                                ? {
                                      value: auth.selectedCredential,
                                  }
                                : {})}
                        />
                        <Button
                            id="kc-login"
                            name="login"
                            className="p-12"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            tabIndex={4}
                            disabled={isLoginButtonDisabled}
                        >
                            <Typography className="p-2">
                                {msgStr("doLogIn")}
                            </Typography>
                        </Button>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
