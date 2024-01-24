import React from "react";
import { StrictMode, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import "./styles.css";

const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <StrictMode>
            <Suspense>
                {(() => {
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                })()}
            </Suspense>
        </StrictMode>
    </React.StrictMode>
);
