import React, { useState } from 'react';
import { Download, Search, Plus, FileText } from 'lucide-react';
import { useAppStore } from '../stores';
import { Modal } from '../components/ui/Modal';
import { Button, Input, Card, Badge, Select } from '../components/ui/Core';
import { Payment } from '../lib/types';
import { useT } from '../lib/useT';

export function Payments() {
  const t = useT();
  const { payments, houses, addPayment, updatePaymentStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    method: 'Cash', status: 'Paid', type: 'Mahal Charge', monthsCount: 1, houseId: houses[0]?.id,
  });

  const selectedHouse = houses.find((h) => h.id === newPayment.houseId);
  const isMahalCharge = newPayment.type === 'Mahal Charge';
  const computedAmount = isMahalCharge
    ? (selectedHouse?.contributionAmount || 0) * (Number(newPayment.monthsCount) || 1)
    : Number(newPayment.amount) || 0;

  const filteredPayments = payments.filter((p) => {
    const house = houses.find((h) => h.id === p.houseId);
    return house?.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const payment: Payment = {
      id: `p_${Date.now()}`,
      receiptNumber: `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
      houseId: newPayment.houseId || houses[0].id,
      amount: computedAmount,
      method: newPayment.method as Payment['method'],
      status: newPayment.status as Payment['status'],
      type: (newPayment.type as Payment['type']) || 'Mahal Charge',
      monthsCount: isMahalCharge ? Number(newPayment.monthsCount) || 1 : undefined,
      date: newPayment.status === 'Paid' ? new Date().toISOString().split('T')[0] : '',
      dueDate: new Date().toISOString().split('T')[0],
    };
    addPayment(payment);
    setIsModalOpen(false);
    setNewPayment({ method: 'Cash', status: 'Paid', type: 'Mahal Charge', monthsCount: 1, houseId: houses[0]?.id });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{t.payments.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t.payments.subtitle}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex-1 sm:flex-none">
            <Plus className="mr-2 h-4 w-4" /> {t.payments.recordPayment}
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={`${t.common.search}...`}
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            className="sm:w-48"
            options={[
              { label: t.myPayments.allStatuses, value: 'all' },
              { label: t.payments.paid, value: 'Paid' },
              { label: t.payments.pending, value: 'Pending' },
              { label: t.payments.overdue, value: 'Overdue' },
            ]}
          />
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filteredPayments.map((payment) => {
            const house = houses.find((h) => h.id === payment.houseId);
            return (
              <div key={payment.id} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-slate-500">{payment.receiptNumber}</span>
                  <Badge variant={getStatusBadge(payment.status)}>{payment.status}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{house?.name}</p>
                  <p className="font-bold text-slate-900 dark:text-white">${payment.amount}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{payment.method}</span>
                  <span>{payment.status === 'Paid' ? payment.date : `Due: ${payment.dueDate}`}</span>
                </div>
                {payment.status !== 'Paid' && (
                  <Button variant="ghost" size="sm" className="text-masjid-600 w-full" onClick={() => updatePaymentStatus(payment.id, 'Paid')}>
                    Mark Paid
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">{t.payments.receipt} #</th>
                <th className="px-6 py-4 font-medium">{t.houses.house}</th>
                <th className="px-6 py-4 font-medium">{t.payments.amount}</th>
                <th className="px-6 py-4 font-medium">{t.payments.method}</th>
                <th className="px-6 py-4 font-medium">{t.payments.date} / {t.payments.dueDate}</th>
                <th className="px-6 py-4 font-medium">{t.common.status}</th>
                <th className="px-6 py-4 font-medium text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPayments.map((payment) => {
                const house = houses.find((h) => h.id === payment.houseId);
                return (
                  <tr key={payment.id} className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{payment.receiptNumber}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{house?.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">${payment.amount}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{payment.method}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {payment.status === 'Paid' ? payment.date : `Due: ${payment.dueDate}`}
                    </td>
                    <td className="px-6 py-4"><Badge variant={getStatusBadge(payment.status)}>{payment.status}</Badge></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {payment.status !== 'Paid' && (
                          <Button variant="ghost" size="sm" className="text-masjid-600 dark:text-masjid-400" onClick={() => updatePaymentStatus(payment.id, 'Paid')}>
                            Mark Paid
                          </Button>
                        )}
                        <button className="p-1 text-slate-400 hover:text-masjid-600 transition-colors" title="View Receipt">
                          <FileText className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.payments.recordPayment}>
        <form onSubmit={handleAddPayment} className="space-y-4">
          <Select
            label={t.houses.house}
            required
            options={houses.map((h) => ({ label: `${h.mahalHouseNumber} — ${h.name}`, value: h.id }))}
            value={newPayment.houseId || ''}
            onChange={(e) => setNewPayment({ ...newPayment, houseId: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label={t.payments.type}
              options={[
                { label: t.payments.mahalCharge, value: 'Mahal Charge' },
                { label: t.payments.donation, value: 'Donation' },
                { label: t.payments.zakat, value: 'Zakat' },
                { label: t.payments.sadaqah, value: 'Sadaqah' },
                { label: t.payments.other, value: 'Other' },
              ]}
              value={newPayment.type || 'Mahal Charge'}
              onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as Payment['type'] })}
            />
            <Select
              label={t.payments.method}
              options={[
                { label: t.payments.cash, value: 'Cash' },
                { label: t.payments.bankTransfer, value: 'Bank Transfer' },
                { label: t.payments.upi, value: 'UPI' },
              ]}
              value={newPayment.method || 'Cash'}
              onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value as Payment['method'] })}
            />
          </div>

          {isMahalCharge ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t.payments.numberOfMonths}
                  type="number" min="1" required
                  value={newPayment.monthsCount || 1}
                  onChange={(e) => setNewPayment({ ...newPayment, monthsCount: Number(e.target.value) || 1 })}
                />
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1.5">{t.payments.monthlyRate}</label>
                  <div className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center text-sm font-medium text-slate-700 dark:text-slate-200">
                    ${selectedHouse?.contributionAmount || 0} / mo
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-masjid-100 dark:border-masjid-800 bg-masjid-50/60 dark:bg-masjid-900/20 p-3 flex items-center justify-between">
                <div className="text-sm text-masjid-900 dark:text-masjid-200">
                  <span className="font-medium">{t.payments.total}</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-2 text-xs">
                    ${selectedHouse?.contributionAmount || 0} × {newPayment.monthsCount || 1}{' '}
                    {Number(newPayment.monthsCount) === 1 ? t.payments.month : t.payments.months}
                  </span>
                </div>
                <div className="text-2xl font-bold text-masjid-800 dark:text-masjid-300">${computedAmount}</div>
              </div>
            </div>
          ) : (
            <Input
              label={`${t.payments.amount} ($)`}
              type="number" required min="1"
              value={newPayment.amount || ''}
              onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
            />
          )}

          <Select
            label={t.common.status}
            options={[{ label: t.payments.paid, value: 'Paid' }, { label: t.payments.pending, value: 'Pending' }]}
            value={newPayment.status || 'Paid'}
            onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value as Payment['status'] })}
          />

          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>{t.common.cancel}</Button>
            <Button type="submit">{t.payments.recordPayment}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
