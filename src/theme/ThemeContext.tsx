import React, { createContext, useContext, ReactNode } from 'react';
import { dark_theme} from './theme';
import {ThemeProviderProps} from '../types/interfaces';

const ThemeContext = createContext(dark_theme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={dark_theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);