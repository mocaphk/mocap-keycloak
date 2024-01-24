import { Box, Link } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Error(
    props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { client } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        document.title = msgStr("errorTitle");
    }, []);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("errorTitle")}
        >
            <Box className="w-full space-y-2 my-2">
                <Link href={client.baseUrl} color="secondary" underline="hover">
                    {msg("backToApplication")}
                </Link>
            </Box>
        </Template>
    );
}
