// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import { Box, Typography, Alert, Divider, Paper } from "@mui/material";
import logo from "../../assets/logo.svg";

function ErrorMessage({ kcContext }: { kcContext: KcContext }) {
    const { message } = kcContext;

    return (
        <>
            {message !== undefined && (
                <Alert className="w-full" severity="error">
                    {message.summary}
                </Alert>
            )}
        </>
    );
}

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        headerNode,
        infoNode = null,
        kcContext,
        doUseDefaultCss,
        classes,
        children,
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { url } = kcContext;

    const { isReady } = usePrepareTemplate({
        doFetchDefaultThemeResources: doUseDefaultCss,
        styles: [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`,
        ],
        htmlClassName: getClassName("kcHtmlClass"),
        bodyClassName: getClassName("kcBodyClass"),
    });

    if (!isReady) {
        return null;
    }

    return (
        <Box className="w-full h-full flex justify-center items-center">
            <Box className="fixed left-0 top-0 m-4 flex flex-row text-center items-center space-x-3 select-none">
                <img
                    draggable={false}
                    className="w-16"
                    src={logo}
                    alt="image"
                />
                <Typography variant="h5" color="secondary">
                    MOCAPHK
                </Typography>
            </Box>
            <Paper
                className="w-[500px] min-w-[400px] m-10 -h-fit p-5 space-y-3"
                elevation={24}
            >
                <Typography variant="h4" fontWeight="light">
                    {headerNode}
                </Typography>
                <Box className="flex flex-col items-center">
                    <ErrorMessage kcContext={kcContext} />
                    {children}
                    {displayInfo && (
                        <>
                            <Divider className="w-full py-2">or</Divider>
                            {infoNode}
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
