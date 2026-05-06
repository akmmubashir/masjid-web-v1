import React from 'react';
import { Menu, Sun, Moon, Bell, Search } from 'lucide-react';
import { useThemeStore, useAuthStore, useLanguageStore } from '../../stores';
import { LANGUAGES } from '../../lib/i18n';
import { Button, cn } from '../ui/Core';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { isDark, toggleTheme } = useThemeStore();
  const { logout } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();

  const nextLang = LANGUAGES.find((l) => l.code !== language)!;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-3 border-b border-slate-200/80 dark:border-slate-800 bg-surface/90 dark:bg-surface-dark/90 backdrop-blur px-4 sm:gap-x-6 sm:px-6 lg:px-8 transition-colors">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">Search</label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400" aria-hidden="true" />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>

        <div className="flex items-center gap-x-2 lg:gap-x-4">
          {/* Language toggle pill */}
          <button
            type="button"
            onClick={() => setLanguage(nextLang.code)}
            title={`Switch to ${nextLang.label}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>{LANGUAGES.find((l) => l.code === language)!.flag}</span>
            <span className="hidden sm:inline uppercase tracking-wide">{language}</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
          >
            <span className="sr-only">Toggle theme</span>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 relative"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-surface dark:ring-surface-dark" />
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:lg:bg-slate-700" aria-hidden="true" />

          <Button variant="ghost" size="sm" onClick={logout} className="hidden sm:flex">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
