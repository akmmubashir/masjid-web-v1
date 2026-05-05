import React from 'react';
import { Save, DownloadCloud, Globe } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input } from
'../components/ui/Core';
export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage system configurations and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Masjid Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Masjid Name" defaultValue="MOSQLY Masjid" />
            <Input label="Contact Email" defaultValue="admin@alnoor.com" />
            <Input label="Phone Number" defaultValue="+1 234 567 8900" />
            <Input label="Address" defaultValue="123 Main St, City" />
          </div>
          <Button className="mt-4">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System & Localization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Language
                  </p>
                  <p className="text-xs text-slate-500">English (US)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>

            {/* PWA Hint UI */}
            <div className="p-4 bg-masjid-50 dark:bg-masjid-900/20 rounded-lg border border-masjid-100 dark:border-masjid-800">
              <h4 className="font-medium text-masjid-900 dark:text-masjid-100 mb-1">
                Install App
              </h4>
              <p className="text-sm text-masjid-700 dark:text-masjid-300 mb-3">
                Install this dashboard on your device for quick access.
              </p>
              <Button variant="primary" size="sm">
                Install PWA
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Create a manual backup of all database records.
            </p>
            <Button variant="outline" className="w-full">
              <DownloadCloud className="mr-2 h-4 w-4" /> Generate Backup
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>);

}