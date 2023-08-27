import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const getDarkMode = () => JSON.parse(localStorage.getItem('dark-mode')) || false;

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(getDarkMode());

    useEffect(() => {
        localStorage.setItem('dark-mode', JSON.stringify(darkMode));

        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        // Cleanup - remove the class when the component unmounts
        return () => {
            document.body.classList.remove('dark');
        };
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={[darkMode, setDarkMode]}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context; // this returns [darkMode, setDarkMode]
};
