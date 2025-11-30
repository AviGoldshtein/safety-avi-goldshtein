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
