import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

export default function Register(
    props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const {
        url,
        realm,
        register,
        passwordRequired,
        recaptchaRequired,
        recaptchaSiteKey,
    } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("registerTitle")}
        >
            <Box className="w-full">
                <Box
                    component="form"
                    action={url.registrationAction}
                    method="post"
                    className="w-full flex flex-col my-4"
                >
                    <Grid container className="w-full my-2" spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                className="w-full"
                                label={msg("firstName")}
                                color="secondary"
                                type="text"
                                autoFocus={true}
                                autoComplete="off"
                                defaultValue={register.formData.firstName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                className="w-full"
                                label={msg("lastName")}
                                color="secondary"
                                type="text"
                                autoComplete="off"
                                defaultValue={register.formData.lastName}
                                tabIndex={2}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                className="w-full"
                                label={msg("email")}
                                color="secondary"
                                type="text"
                                autoComplete="email"
                                defaultValue={register.formData.email}
                                tabIndex={3}
                                required
                            />
                        </Grid>
                        {!realm.registrationEmailAsUsername && (
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    name="username"
                                    className="w-full"
                                    label={msg("username")}
                                    color="secondary"
                                    type="text"
                                    autoComplete="username"
                                    defaultValue={register.formData.username}
                                    tabIndex={4}
                                    required
                                />
                            </Grid>
                        )}
                        {passwordRequired && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        className="w-full"
                                        label={msg("password")}
                                        color="secondary"
                                        type="password"
                                        autoComplete="new-password"
                                        tabIndex={5}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password-confirm"
                                        name="password-confirm"
                                        className="w-full"
                                        label={msg("passwordConfirm")}
                                        color="secondary"
                                        type="password"
                                        tabIndex={6}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        {recaptchaRequired && (
                            <Box
                                data-size="compact"
                                data-sitekey={recaptchaSiteKey}
                            />
                        )}
                    </Grid>
                    <Button
                        id="kc-form-buttons"
                        name="register"
                        className="p-12"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        tabIndex={7}
                    >
                        <Typography className="p-2">
                            {msgStr("doRegister")}
                        </Typography>
                    </Button>
                </Box>
                <Link
                    href={url.loginUrl}
                    color="secondary"
                    underline="hover"
                    tabIndex={8}
                >
                    {msg("backToLogin")}
                </Link>
            </Box>
        </Template>
    );
}
