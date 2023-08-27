import { useTheme } from "../context/ThemeContext";

function useDarkModeStyles(baseStyles) {
    const [darkMode] = useTheme();

    const getAdjustedStyles = (className) => {
        return darkMode && baseStyles[`${className}Dark`] ? `${baseStyles[className]} ${baseStyles[`${className}Dark`]}` : baseStyles[className];
    };

    const adjustedStyles = Object.keys(baseStyles).reduce((acc, className) => {
        acc[className] = getAdjustedStyles(className);
        return acc;
    }, {});

    return adjustedStyles;
}

export default useDarkModeStyles;
