import { Box, Link, Typography } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginVerifyEmail(
    props: PageProps<
        Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, user } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = msgStr("emailVerifyTitle");
    }, []);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("emailVerifyTitle")}
        >
            <Box className="w-full space-y-2 my-2">
                <Typography>
                    {msgStr("emailVerifyInstruction1", user?.email)}
                </Typography>
                <Typography>{msg("emailVerifyInstruction2")}</Typography>
                <Typography className="space-x-1">
                    <Link
                        color="secondary"
                        underline="hover"
                        href={url.loginAction}
                    >
                        {msg("doClickHere")}
                    </Link>
                    {msg("emailVerifyInstruction3")}
                </Typography>
            </Box>
        </Template>
    );
}
