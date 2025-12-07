import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeModeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);


export function useThemeMode(): ThemeModeContextType {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return ctx;
}

interface ThemeModeProviderProps {
  children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1565c0" : "#08487dff",
          },
          secondary: {
            main: mode === "light" ? "#d3e4fb" : "#01203a",
          },
          background: {
            default: mode === "light" ? "#f3f6fb" : "#0d1524",
            paper: mode === "light" ? "#e7e9ef" : "#293041",
          },
          table: {
            header: mode === "light" ? "#f4f6f8" : "#1f2937",
            rowEven: mode === "light" ? "#ffffff" : "#293241",
            rowOdd: mode === "light" ? "#f8fafc" : "#1a2332",
            hover: mode === "light" ? "#eef2f6" : "rgba(104, 104, 104, 0.05)",
            text: mode === "light" ? "#1f2937" : "#e5e7eb",
            divider: mode === "light" ? "#d0d7e2" : "#3b4250",
            border: mode === "light" ? "#c3c9d4" : "#81899a",
          },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: "background-color 0.4s ease, color 0.4s ease",
              },
            },
          },
        },
      }),
    [mode]
  );

  function toggleMode() {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
