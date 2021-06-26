import { createContext } from "react";

export const themeStyle = {
    dark: {
        backgroundColor: "#000",
        color: "#fff",
        transition: 'background-color .5s'
    },
    light: {
        backgroundColor: "#fff",
        color: "#52057b",
        transition: 'background-color .5s'
    },
};

const ThemeContext = createContext(themeStyle.light);

export default ThemeContext;
