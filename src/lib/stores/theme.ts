import { browser } from '$app/environment';
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

const createThemeStore = () => {
  const theme = getSavedTheme() || getSystemTheme();
  const { subscribe, set, update } = writable(theme);

  const updateTheme = (theme: string) => {
    saveTheme(theme);
    update(() => {
      return theme;
    });
  };

  const resetTheme = () => {
    const theme = getSystemTheme();
    if (theme) {
      saveTheme(theme);
      set(theme);
    }
  };

  return { subscribe, updateTheme, resetTheme };
};
export const theme = createThemeStore();
