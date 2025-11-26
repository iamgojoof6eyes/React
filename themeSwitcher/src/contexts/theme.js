import { useContext, createContext } from "react";

const ThemeContext = createContext(
    {
        theme: "light",
        darkMode: () => {},
        lightMode: () => {}
    }
)

const ThemeProvider = ThemeContext.Provider

const useTheme = () => useContext(ThemeContext)

export { ThemeProvider, ThemeContext };
export default useTheme;