import React from 'react';
import { Save, DownloadCloud, Globe, Check } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, cn } from '../components/ui/Core';
import { useLanguageStore } from '../stores';
import { LANGUAGES } from '../lib/i18n';
import { useT } from '../lib/useT';

export function Settings() {
  const t = useT();
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.settings.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.settings.subtitle}</p>
      </div>

      {/* Masjid Details */}
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.masjidDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label={t.settings.masjidName} defaultValue="MOSQLY Masjid" />
            <Input label={t.settings.contactEmail} defaultValue="admin@alnoor.com" />
            <Input label={t.settings.phoneNumber} defaultValue="+1 234 567 8900" />
            <Input label={t.houses.address} defaultValue="123 Main St, City" />
          </div>
          <Button className="mt-4">
            <Save className="mr-2 h-4 w-4" /> {t.common.save}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language & System */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.systemLocalization}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language picker */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-masjid-600" />
                <p className="font-medium text-slate-900 dark:text-white text-sm">
                  {t.settings.defaultLanguage}
                </p>
              </div>
              <p className="text-xs text-slate-500 mb-3">{t.settings.languageDesc}</p>
              <div className="grid grid-cols-1 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all',
                      language === lang.code
                        ? 'border-masjid-600 bg-masjid-50 dark:bg-masjid-900/30 text-masjid-800 dark:text-masjid-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="flex flex-col text-left">
                        <span>{lang.label}</span>
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                          {lang.nativeLabel}
                        </span>
                      </span>
                    </span>
                    {language === lang.code && (
                      <Check className="h-4 w-4 text-masjid-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PWA install hint */}
            <div className="p-4 bg-masjid-50 dark:bg-masjid-900/20 rounded-lg border border-masjid-100 dark:border-masjid-800">
              <h4 className="font-medium text-masjid-900 dark:text-masjid-100 mb-1">
                {t.settings.installApp}
              </h4>
              <p className="text-sm text-masjid-700 dark:text-masjid-300 mb-3">
                {t.settings.installAppDesc}
              </p>
              <Button variant="primary" size="sm">{t.settings.installPwa}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Backup */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.backup}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t.settings.backupDesc}</p>
            <Button variant="outline" className="w-full">
              <DownloadCloud className="mr-2 h-4 w-4" /> {t.settings.generateBackup}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
