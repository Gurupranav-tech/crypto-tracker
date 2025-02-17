import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemesProvider from "./contexts/ThemeContext";
import SettingsProvider from "./contexts/SettingsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CurrenciesProvider from "./contexts/CurrenciesContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemesProvider>
        <CurrenciesProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </CurrenciesProvider>
      </ThemesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
