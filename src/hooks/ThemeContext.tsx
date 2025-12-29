import React, { createContext, useContext } from 'react';
import { useTheme } from './useTheme';

// Shape of theme context
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  skillColorsEnabled: boolean;
  toggleSkillColors: () => void;
  setSkillColorsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [skillColorsEnabled, setSkillColorsEnabled] = React.useState<boolean>(true);

  const toggleSkillColors = React.useCallback(() => {
    setSkillColorsEnabled(prev => !prev);
  }, []);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    skillColorsEnabled,
    toggleSkillColors,
    setSkillColorsEnabled
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within a ThemeProvider');
  return ctx;
};
