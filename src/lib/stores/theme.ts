import { browser } from '$app/environment';
import type { ThemeStore } from '$lib/types/stores/theme';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const getSystemTheme = () => {
  if (browser) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }
};

const saveTheme = (theme: string) => {
  if (browser) {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }
};

const getSavedTheme = () => {
  if (browser) {
    const theme = localStorage.getItem('theme') ?? '';
    if (theme === 'system') return getSystemTheme();
    return theme;
  }
};

const themeContext = Symbol('themeContext');

export const createThemeStore = () => {
  const theme = getSavedTheme() || getSystemTheme();
  const themeStore = writable(theme) as ThemeStore;
  setContext(themeContext, themeStore);

  themeStore.updateTheme = (theme: string) => {
    saveTheme(theme);
    themeStore.update(() => {
      return theme;
    });
  };

  themeStore.resetTheme = () => {
    const theme = getSystemTheme();
    if (theme) {
      saveTheme(theme);
      themeStore.set(theme);
    }
  };
  return themeStore;
};

export const getThemeStore = () => {
  return getContext<ThemeStore>(themeContext);
};
