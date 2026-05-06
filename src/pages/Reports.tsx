import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui/Core';
import { useT } from '../lib/useT';

export function Reports() {
  const t = useT();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.reports.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.reports.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{t.reports.financialReports}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t.reports.financialDesc}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> {t.reports.configure}
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> {t.reports.exportCsv}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t.reports.subscriptionReports}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t.reports.subscriptionDesc}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> {t.reports.configure}
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> {t.reports.exportPdf}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
