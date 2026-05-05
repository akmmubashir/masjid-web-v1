import React from 'react';
import { Download, Filter } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../components/ui/Core';
export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Reports & Exports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Generate and download financial and operational reports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Export payment history, revenue summaries, and outstanding
              balances.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Configure
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Export active subscriptions, upcoming renewals, and plan
              distributions.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Configure
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}