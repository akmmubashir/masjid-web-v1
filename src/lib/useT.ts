import { translations, Language } from './i18n';
import { useLanguageStore } from '../stores';

/**
 * Returns the translation object for the current language.
 * Usage:  const t = useT();  then  t.houses.title
 */
export function useT() {
  const { language } = useLanguageStore();
  return translations[language];
}
