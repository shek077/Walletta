import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark' | 'lime' | 'rose' | 'ocean' | 'tangerine' | 'lavender' | 'green';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: { [key in Theme]: string } = {
  light: '#e0e5ec',
  dark: '#2c3038',
  lime: '#f0f2eb',
  rose: '#fbe9e7',
  ocean: '#e6f0f5',
  tangerine: '#fff0e6',
  lavender: '#f3eef7',
  green: '#edf7f0',
};

// Cache the original manifest content to avoid repeated fetches.
let manifestContent: any = null;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('theme', 'light');
  const [theme, setTheme] = useState<Theme>(storedTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'lime', 'rose', 'ocean', 'tangerine', 'lavender', 'green');
    root.classList.add(theme);
    setStoredTheme(theme);
    
    const themeColor = themeColors[theme];

    // 1. Update the meta tag for the live browser UI
    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColor);
    }
    
    // 2. Dynamically update the manifest for PWA splash screen and theme
    const updateManifest = async () => {
        try {
            if (!manifestContent) {
                const response = await fetch('/manifest.json');
                if (!response.ok) throw new Error('Failed to fetch manifest');
                manifestContent = await response.json();
            }

            const newManifest = { ...manifestContent };
            newManifest.theme_color = themeColor;
            newManifest.background_color = themeColor;

            const manifestString = JSON.stringify(newManifest);
            const blob = new Blob([manifestString], { type: 'application/json' });
            const manifestUrl = URL.createObjectURL(blob);

            const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
            if (manifestLink) {
                // Revoke old URL to prevent memory leaks, if one exists from a previous theme change
                if (manifestLink.href.startsWith('blob:')) {
                    URL.revokeObjectURL(manifestLink.href);
                }
                manifestLink.href = manifestUrl;
            }
        } catch (error) {
            console.error("Failed to update manifest dynamically:", error);
        }
    };

    updateManifest();

  }, [theme, setStoredTheme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
