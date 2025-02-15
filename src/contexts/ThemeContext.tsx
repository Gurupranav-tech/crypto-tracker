import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type Context = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const context = createContext<Context>({} as Context);

export function useTheme() {
  return useContext(context);
}

export default function ThemesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { value: theme, setValue: setTheme } = useLocalStorage<
    Context["theme"]
  >("theme", "dark");

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  useEffect(() => {
    if (theme === "light") document.body.classList.remove("dark");
    else document.body.classList.add("dark");
  }, [theme]);

  const values = {
    theme,
    toggleTheme,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}
