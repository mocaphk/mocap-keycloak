import { Box, Link, Typography } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Info(
    props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const {
        messageHeader,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client,
        message,
    } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = messageHeader ?? "Mocap";
    }, []);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={messageHeader ?? "Info"}
        >
            <Box className="w-full space-y-2 my-2">
                <Box className="w-full">
                    <Typography>{message?.summary}</Typography>
                    <Typography>
                        {requiredActions
                            ?.map((action) =>
                                msgStr(`requiredAction.${action}`)
                            )
                            .join(",")}
                    </Typography>
                </Box>
                {!skipLink && pageRedirectUri !== undefined ? (
                    <Link
                        href={pageRedirectUri}
                        color="secondary"
                        underline="hover"
                    >
                        {msg("backToApplication")}
                    </Link>
                ) : actionUri !== undefined ? (
                    <Link href={actionUri} color="secondary" underline="hover">
                        {msg("proceedWithAction")}
                    </Link>
                ) : (
                    client.baseUrl !== undefined && (
                        <Link
                            href={client.baseUrl}
                            color="secondary"
                            underline="hover"
                        >
                            {msg("backToApplication")}
                        </Link>
                    )
                )}
            </Box>
        </Template>
    );
}
