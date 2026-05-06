import React, { useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, FileText, Download, Search, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge } from '../components/ui/Core';
import { Modal } from '../components/ui/Modal';
import { useAppStore, useAuthStore } from '../stores';
import { Payment } from '../lib/types';
import { useT } from '../lib/useT';

export function MyPayments() {
  const t = useT();
  const { user } = useAuthStore();
  const { houses, payments } = useAppStore();
  const myHouse = houses.find((h) => h.id === user?.houseId);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewing, setViewing] = useState<Payment | null>(null);

  const myPayments = useMemo(
    () => payments.filter((p) => p.houseId === myHouse?.id).sort((a, b) => (b.date || b.dueDate).localeCompare(a.date || a.dueDate)),
    [payments, myHouse?.id]
  );

  const filtered = myPayments.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (search && !p.receiptNumber.toLowerCase().includes(search.toLowerCase()) && !p.type.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const summary = useMemo(() => ({
    totalPaid: myPayments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0),
    pending: myPayments.filter((p) => p.status === 'Pending').length,
    overdue: myPayments.filter((p) => p.status === 'Overdue').length,
    count: myPayments.length,
  }), [myPayments]);

  if (!myHouse) {
    return (
      <Card className="max-w-xl mx-auto mt-12">
        <CardContent className="p-8 text-center">
          <Info className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold mb-2">{t.myHouse.noHouseTitle}</h2>
          <p className="text-sm text-slate-500">{t.myHouse.noHouseDesc}</p>
        </CardContent>
      </Card>
    );
  }

  const statusBadge = (status: Payment['status']) =>
    status === 'Paid' ? 'success' : status === 'Overdue' ? 'danger' : 'warning';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{t.myPayments.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.myPayments.subtitle}</p>
      </div>

      <div className="p-4 bg-masjid-50 dark:bg-masjid-900/20 border border-masjid-100 dark:border-masjid-800 rounded-lg flex items-start gap-3 text-sm text-masjid-900 dark:text-masjid-200">
        <Info className="h-5 w-5 shrink-0 mt-0.5 text-masjid-700 dark:text-masjid-400" />
        <div>{t.myPayments.infoBanner}</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} label={t.myPayments.totalContributed} value={`₹${summary.totalPaid}`} tone="emerald" />
        <SummaryCard icon={<FileText className="h-5 w-5 text-slate-600" />} label={t.myPayments.totalRecords} value={String(summary.count)} />
        <SummaryCard icon={<Clock className="h-5 w-5 text-amber-600" />} label={t.myPayments.pending} value={String(summary.pending)} tone="amber" />
        <SummaryCard icon={<AlertCircle className="h-5 w-5 text-red-600" />} label={t.myPayments.overdue} value={String(summary.overdue)} tone="red" />
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder={t.myPayments.searchPlaceholder} className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select
            options={[
              { label: t.myPayments.allStatuses, value: 'all' },
              { label: t.payments.paid, value: 'Paid' },
              { label: t.payments.pending, value: 'Pending' },
              { label: t.payments.overdue, value: 'Overdue' },
            ]}
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-44"
          />
          <Select
            options={[
              { label: t.myPayments.allTypes, value: 'all' },
              { label: t.payments.mahalCharge, value: 'Mahal Charge' },
              { label: t.payments.donation, value: 'Donation' },
              { label: t.payments.zakat, value: 'Zakat' },
              { label: t.payments.sadaqah, value: 'Sadaqah' },
              { label: t.payments.other, value: 'Other' },
            ]}
            value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="sm:w-44"
          />
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((p) => (
            <div key={p.id} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-slate-500">{p.receiptNumber}</span>
                <Badge variant={statusBadge(p.status)}>{p.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{p.type}</Badge>
                  <span className="text-xs text-slate-500">{p.method}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">₹{p.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">{p.status === 'Paid' ? p.date : `Due ${p.dueDate}`}</p>
                {p.status === 'Paid' && (
                  <button onClick={() => setViewing(p)} className="text-masjid-700 dark:text-masjid-400 hover:underline text-xs font-medium">
                    {t.myPayments.viewReceipt}
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="p-8 text-center text-slate-500 text-sm">{t.myPayments.noPayments}</p>}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">{t.myPayments.receiptNo}</th>
                <th className="px-6 py-3 font-medium">{t.payments.type}</th>
                <th className="px-6 py-3 font-medium">{t.payments.amount}</th>
                <th className="px-6 py-3 font-medium">{t.payments.method}</th>
                <th className="px-6 py-3 font-medium">{t.myPayments.dateDue}</th>
                <th className="px-6 py-3 font-medium">{t.common.status}</th>
                <th className="px-6 py-3 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">{p.receiptNumber}</td>
                  <td className="px-6 py-3"><Badge variant="outline">{p.type}</Badge></td>
                  <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">₹{p.amount}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{p.method}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{p.status === 'Paid' ? p.date : `Due ${p.dueDate}`}</td>
                  <td className="px-6 py-3"><Badge variant={statusBadge(p.status)}>{p.status}</Badge></td>
                  <td className="px-6 py-3 text-right">
                    {p.status === 'Paid' && (
                      <button onClick={() => setViewing(p)} className="text-masjid-700 dark:text-masjid-400 hover:underline text-xs font-medium">
                        {t.myPayments.viewReceipt}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-slate-500">{t.myPayments.noPayments}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {viewing && (
        <Modal isOpen onClose={() => setViewing(null)} title={t.myPayments.receiptModal}>
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">MOSQLY Masjid</h3>
              <p className="text-xs text-slate-500 mt-1">Receipt #{viewing.receiptNumber}</p>
            </div>
            <div className="space-y-2 text-sm">
              <ReceiptRow label={t.myPayments.house} value={myHouse.name} />
              <ReceiptRow label={t.myPayments.mahalNo} value={myHouse.mahalHouseNumber} />
              <ReceiptRow label={t.payments.type} value={viewing.type} />
              <ReceiptRow label={t.payments.method} value={viewing.method} />
              <ReceiptRow label={t.payments.date} value={viewing.date || viewing.dueDate} />
              {viewing.notes && <ReceiptRow label={t.payments.notes} value={viewing.notes} />}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-4 flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-300">{t.myPayments.amountPaid}</span>
              <span className="font-bold text-2xl text-masjid-800 dark:text-masjid-400">₹{viewing.amount}</span>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setViewing(null)}>{t.common.close}</Button>
              <Button><Download className="h-4 w-4 mr-2" /> {t.myPayments.downloadPdf}</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SummaryCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: 'emerald' | 'amber' | 'red' }) {
  const toneClass = { emerald: 'bg-emerald-50 dark:bg-emerald-900/20', amber: 'bg-amber-50 dark:bg-amber-900/20', red: 'bg-red-50 dark:bg-red-900/20', default: 'bg-slate-100 dark:bg-slate-800' }[tone || 'default'];
  return (
    <Card>
      <CardContent className="p-4">
        <div className={`inline-flex rounded-md p-2 ${toneClass} mb-3`}>{icon}</div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 dark:text-white text-right">{value}</span>
    </div>
  );
}
