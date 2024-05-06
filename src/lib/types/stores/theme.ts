import type { Writable } from 'svelte/store';

export interface ThemeStore extends Writable<string> {
  updateTheme: (theme: string) => void;
  resetTheme: () => void;
}
