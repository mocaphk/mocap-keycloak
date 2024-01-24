import { Box, Link, Typography } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginPageExpired(
    props: PageProps<
        Extract<KcContext, { pageId: "login-page-expired.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = msgStr("pageExpiredTitle");
    }, []);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("pageExpiredTitle")}
        >
            <Box className="w-full space-y-2 my-2">
                <Typography className="space-x-1">
                    {msg("pageExpiredMsg1")}
                    <Link
                        color="secondary"
                        underline="hover"
                        href={url.loginRestartFlowUrl}
                    >
                        {msg("doClickHere")}
                    </Link>
                </Typography>
                <Typography className="space-x-1">
                    {msg("pageExpiredMsg2")}
                    <Link
                        color="secondary"
                        underline="hover"
                        href={url.loginAction}
                    >
                        {msg("doClickHere")}
                    </Link>
                </Typography>
            </Box>
        </Template>
    );
}
