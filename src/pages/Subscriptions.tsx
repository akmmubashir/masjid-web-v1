import React, { useState } from 'react';
import {
  Check, Sparkles, Calendar, CreditCard as CreditCardIcon,
  Download, AlertTriangle, Building2, Users as UsersIcon, HardDrive,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '../stores';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, cn } from '../components/ui/Core';
import { useT } from '../lib/useT';
export function Subscriptions() {
  const t = useT();
  const {
    saasPlans,
    masjidSubscription,
    saasInvoices,
    houses,
    users,
    changeMasjidSubscription,
    toggleAutoRenew
  } = useAppStore();
  const [billingPreview, setBillingPreview] = useState<'Monthly' | 'Yearly'>(
    masjidSubscription.billingCycle
  );
  const currentPlan = saasPlans.find((p) => p.id === masjidSubscription.planId)!;
  const currentPrice =
  masjidSubscription.billingCycle === 'Yearly' ?
  currentPlan.yearlyPrice :
  currentPlan.monthlyPrice;
  const housesUsed = houses.length;
  const staffUsed = users.filter((u) => u.role !== 'Guardian').length;
  const housesLimit = currentPlan.limits.maxHouses;
  const staffLimit = currentPlan.limits.maxStaff;
  const handleSelectPlan = (planId: string) => {
    if (planId === masjidSubscription.planId) return;
    changeMasjidSubscription(planId, billingPreview);
    const plan = saasPlans.find((p) => p.id === planId);
    toast.success(`Plan changed to ${plan?.name} (${billingPreview})`);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.subscriptions.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.subscriptions.subtitle}</p>
      </div>

      {/* Current plan summary */}
      <Card className="border-masjid-200 dark:border-masjid-800">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-gold-500" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {t.subscriptions.currentPlan}
                </span>
                <Badge variant="success">{masjidSubscription.status}</Badge>
              </div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">{currentPlan.name}</h2>
              <p className="text-slate-500 mt-1">{currentPlan.description}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  ${currentPrice}
                </span>
                <span className="text-slate-500">
                  /
                  {masjidSubscription.billingCycle === 'Yearly' ?
                  'year' :
                  'month'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {t.subscriptions.renewsOn}{' '}
                  <span className="font-medium text-slate-900 dark:text-white">{masjidSubscription.currentPeriodEnd}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CreditCardIcon className="h-4 w-4 text-slate-400" />
                  {t.subscriptions.autoRenew}{' '}
                  <button
                    onClick={() => {
                      toggleAutoRenew();
                      toast.success('Auto-renew updated');
                    }}
                    className={cn(
                      'inline-flex h-5 w-9 items-center rounded-full transition-colors ml-1',
                      masjidSubscription.autoRenew ?
                      'bg-masjid-700' :
                      'bg-slate-300 dark:bg-slate-700'
                    )}>
                    
                    <span
                      className={cn(
                        'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform',
                        masjidSubscription.autoRenew ?
                        'translate-x-5' :
                        'translate-x-1'
                      )} />
                    
                  </button>
                </div>
              </div>
            </div>

            {/* Usage panel */}
            <div className="lg:w-80 space-y-3 lg:border-l lg:pl-6 lg:border-slate-200 lg:dark:border-slate-800">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t.subscriptions.usage}</p>
              <UsageBar icon={<Building2 className="h-4 w-4" />} label={t.subscriptions.houses} used={housesUsed} limit={housesLimit} />
              <UsageBar icon={<UsersIcon className="h-4 w-4" />} label={t.subscriptions.staff} used={staffUsed} limit={staffLimit} />
              <UsageBar icon={<HardDrive className="h-4 w-4" />} label={t.subscriptions.storage} used={0.4} limit={currentPlan.limits.storageGB} unit="GB" />
              
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan selector */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">{t.subscriptions.availablePlans}</h2>
            <p className="text-sm text-slate-500 mt-1">{t.subscriptions.availablePlansDesc}</p>
          </div>
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button onClick={() => setBillingPreview('Monthly')} className={cn('px-4 py-1.5 rounded-md text-sm font-medium transition-colors', billingPreview === 'Monthly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400')}>
              {t.subscriptions.monthly}
            </button>
            <button onClick={() => setBillingPreview('Yearly')} className={cn('px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5', billingPreview === 'Yearly' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400')}>
              {t.subscriptions.yearly}
              <Badge variant="warning" className="text-[10px] py-0">{t.subscriptions.save17}</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {saasPlans.map((plan) => {
            const isCurrent = plan.id === masjidSubscription.planId;
            const price =
            billingPreview === 'Yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <Card
                key={plan.id}
                className={cn(
                  'relative flex flex-col',
                  plan.popular && 'ring-2 ring-masjid-700 dark:ring-masjid-500'
                )}>
                
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-masjid-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t.subscriptions.mostPopular}
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="ml-1.5 text-slate-500">/{billingPreview === 'Yearly' ? t.subscriptions.year : t.subscriptions.month}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((feature, idx) =>
                    <li key={idx} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-masjid-600 shrink-0 mr-2 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300">
                          {feature}
                        </span>
                      </li>
                    )}
                  </ul>
                  <Button
                    className="w-full"
                    variant={
                    isCurrent ?
                    'outline' :
                    plan.popular ?
                    'primary' :
                    'outline'
                    }
                    disabled={isCurrent}
                    onClick={() => handleSelectPlan(plan.id)}>
                    {isCurrent ? t.subscriptions.currentPlanBtn : `${t.subscriptions.switchTo} ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>);

          })}
        </div>
      </div>

      {/* Billing history */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.subscriptions.billingHistory}</CardTitle>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> {t.subscriptions.exportAll}</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">{t.subscriptions.invoice}</th>
                  <th className="px-6 py-3 font-medium">{t.subscriptions.date}</th>
                  <th className="px-6 py-3 font-medium">{t.subscriptions.plan}</th>
                  <th className="px-6 py-3 font-medium">{t.subscriptions.amount}</th>
                  <th className="px-6 py-3 font-medium">{t.subscriptions.paymentMethod}</th>
                  <th className="px-6 py-3 font-medium">{t.common.status}</th>
                  <th className="px-6 py-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {saasInvoices.map((inv) =>
                <tr
                  key={inv.id}
                  className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  
                    <td className="px-6 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">
                      {inv.date}
                    </td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">
                      {inv.planName}
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">
                      ${inv.amount}
                    </td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">
                      {inv.paymentMethod}
                    </td>
                    <td className="px-6 py-3">
                      <Badge
                      variant={
                      inv.status === 'Paid' ?
                      'success' :
                      inv.status === 'Failed' ?
                      'danger' :
                      'warning'
                      }>
                      
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button className="text-masjid-700 dark:text-masjid-400 hover:underline text-xs font-medium">
                        {t.subscriptions.download}
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cancel zone */}
      <Card className="border-red-200 dark:border-red-900/40">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="rounded-full bg-red-50 dark:bg-red-900/20 p-2 shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-900 dark:text-white">{t.subscriptions.cancelSubscription}</h3>
            <p className="text-sm text-slate-500 mt-1">{t.subscriptions.cancelDesc}</p>
          </div>
          <Button variant="outline">{t.subscriptions.cancel}</Button>
        </CardContent>
      </Card>
    </div>);

}
function UsageBar({
  icon,
  label,
  used,
  limit,
  unit = ''






}: {icon: React.ReactNode;label: string;used: number;limit: number | 'Unlimited';unit?: string;}) {
  const isUnlimited = limit === 'Unlimited';
  const pct = isUnlimited ? 0 : Math.min(100, used / (limit as number) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          {icon}
          {label}
        </span>
        <span className="text-slate-500">
          {used}
          {unit} / {isUnlimited ? '∞' : `${limit}${unit}`}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            pct > 80 ?
            'bg-red-500' :
            pct > 60 ?
            'bg-amber-500' :
            'bg-masjid-600'
          )}
          style={{
            width: isUnlimited ? '5%' : `${pct}%`
          }} />
        
      </div>
    </div>);

}