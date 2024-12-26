// ThemeContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { colors } from './colors';
import { ThemeProviderProps } from '../types/interfaces';

interface Theme {
  colors: typeof colors;
  fontSizes: {
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    xxxLarge: number;
  };
  fonts: {
    regular: string;
    bold: string;
    italic: string;
  };
}

const defaultTheme: Theme = {
  colors,
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxxLarge: 32
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',   
    italic: 'Roboto-Italic',
  },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);