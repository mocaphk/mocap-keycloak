import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginUpdatePassword(
    props: PageProps<
        Extract<KcContext, { pageId: "login-update-password.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = msgStr("updatePasswordTitle");
    }, []);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("updatePasswordTitle")}
        >
            <Box className="w-full space-y-2 my-2">
                <Box
                    id="kc-passwd-update-form"
                    component="form"
                    action={url.loginAction}
                    method="post"
                    className="w-full flex flex-col my-4 space-y-4"
                >
                    <Grid container className="w-full my-2" spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="password-new"
                                name="password-new"
                                className="w-full"
                                label={msg("passwordNew")}
                                color="secondary"
                                type="password"
                                autoFocus
                                autoComplete="new-password"
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
                                tabIndex={2}
                                required
                            />
                        </Grid>
                    </Grid>
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
            </Box>
        </Template>
    );
}
