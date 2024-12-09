export class ThemeService {
    static setTheme(theme: 'dark' | 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
