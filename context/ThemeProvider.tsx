"use client";

import React, { useState, createContext, useContext, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Below values will either be Light or Dark
   */
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      console.log("Trying to remove dark mode");
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    console.log("Inside useEffect of Theme Provider");
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  // When we wrap components with a Provider, the corresponding context,
  // gets initialised.
  if (context === undefined) {
    throw new Error("use theme must always be used within a Theme Provider");
  }

  return context;
};
