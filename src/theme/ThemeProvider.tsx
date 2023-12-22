import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MaterialUIThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <MaterialUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MaterialUIThemeProvider>
    );
}
