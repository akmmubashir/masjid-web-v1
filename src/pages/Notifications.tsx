import React from 'react';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui/Core';
import { useT } from '../lib/useT';

export function Notifications() {
  const t = useT();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.notifications.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.notifications.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.notifications.recentAlerts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start p-3 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full mr-3">
                      <Mail className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {t.notifications.paymentReminder}: The Ahmed Family
                        </p>
                        <span className="text-xs text-slate-500">2 {t.notifications.hoursAgo}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {t.notifications.automatedEmail} ₹50.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.notifications.notificationSettings}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{t.notifications.emailAlerts}</p>
                  <p className="text-xs text-slate-500">{t.notifications.emailAlertsDesc}</p>
                </div>
                <Badge variant="success">{t.notifications.enabled}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{t.notifications.smsAlerts}</p>
                  <p className="text-xs text-slate-500">{t.notifications.smsAlertsDesc}</p>
                </div>
                <Badge variant="default">{t.notifications.disabled}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{t.notifications.adminDigest}</p>
                  <p className="text-xs text-slate-500">{t.notifications.adminDigestDesc}</p>
                </div>
                <Badge variant="success">{t.notifications.enabled}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
