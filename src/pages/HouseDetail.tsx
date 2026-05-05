import React, { useEffect, useState, useId } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Save,
  X,
  Trash2,
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  Calendar,
  Hash,
  Shield,
  KeyRound,
  Plus,
  DollarSign,
  Users as UsersIcon,
  FileText } from
'lucide-react';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  Badge } from
'../components/ui/Core';
import { Modal } from '../components/ui/Modal';
import { useAppStore } from '../stores';
import { House, Payment } from '../lib/types';
import { MembersList } from '../components/houses/MembersList';
export function HouseDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    houses,
    payments,
    users,
    updateHouse,
    deleteHouse,
    addMember,
    updateMember,
    removeMember,
    addPayment
  } = useAppStore();
  const house = houses.find((h) => h.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Partial<House>>({});
  const [paymentOpen, setPaymentOpen] = useState(false);
  useEffect(() => {
    if (house) setDraft(house);
  }, [house?.id]);
  if (!house) {
    return (
      <Card className="max-w-xl mx-auto mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="font-serif text-xl font-semibold mb-2">
            House Not Found
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            The house you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/houses')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Houses
          </Button>
        </CardContent>
      </Card>);

  }
  const guardian = users.find((u) => u.id === house.guardianUserId);
  const housePayments = payments.
  filter((p) => p.houseId === house.id).
  sort((a, b) => (b.date || b.dueDate).localeCompare(a.date || a.dueDate));
  const handleSave = () => {
    updateHouse(house.id, {
      ...draft,
      contributionAmount: Number(draft.contributionAmount) || 0
    });
    toast.success('House updated');
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setDraft(house);
    setIsEditing(false);
  };
  const handleDelete = () => {
    if (confirm(`Delete ${house.name}? This cannot be undone.`)) {
      deleteHouse(house.id);
      toast.success('House deleted');
      navigate('/houses');
    }
  };
  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/houses')}
            className="p-2 -ml-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {house.name}
              </h1>
              <Badge variant="outline">
                <Hash className="h-3 w-3 mr-1 inline" />
                {house.mahalHouseNumber}
              </Badge>
              <Badge
                variant={house.status === 'Active' ? 'success' : 'default'}>
                
                {house.status}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Joined {house.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setPaymentOpen(true)}>
            <DollarSign className="h-4 w-4 mr-2" /> Record Payment
          </Button>
          {isEditing ?
          <>
              <Button variant="ghost" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </> :

          <>
              <Button variant="outline" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-red-500">Delete</span>
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </>
          }
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* House details */}
          <Card>
            <CardHeader>
              <CardTitle>House Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ?
              <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    label="Mahal House No."
                    value={draft.mahalHouseNumber || ''}
                    onChange={(e) =>
                    setDraft({
                      ...draft,
                      mahalHouseNumber: e.target.value
                    })
                    } />
                  
                    <Input
                    label="House Name"
                    value={draft.name || ''}
                    onChange={(e) =>
                    setDraft({
                      ...draft,
                      name: e.target.value
                    })
                    } />
                  
                  </div>
                  <Input
                  label="Head of Family"
                  value={draft.headOfFamily || ''}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    headOfFamily: e.target.value
                  })
                  } />
                
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    label="Contact Number"
                    value={draft.contactNumber || ''}
                    onChange={(e) =>
                    setDraft({
                      ...draft,
                      contactNumber: e.target.value
                    })
                    } />
                  
                    <Input
                    label="Alternate Number"
                    value={draft.alternateNumber || ''}
                    onChange={(e) =>
                    setDraft({
                      ...draft,
                      alternateNumber: e.target.value
                    })
                    } />
                  
                  </div>
                  <Input
                  label="Email"
                  type="email"
                  value={draft.email || ''}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    email: e.target.value
                  })
                  } />
                
                  <Input
                  label="Address"
                  value={draft.address || ''}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    address: e.target.value
                  })
                  } />
                
                  <Select
                  label="Status"
                  options={[
                  {
                    label: 'Active',
                    value: 'Active'
                  },
                  {
                    label: 'Inactive',
                    value: 'Inactive'
                  }]
                  }
                  value={draft.status || 'Active'}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    status: e.target.value as any
                  })
                  } />
                
                </div> :

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <DetailRow
                  icon={<UsersIcon className="h-4 w-4" />}
                  label="Head of Family"
                  value={house.headOfFamily} />
                
                  <DetailRow
                  icon={<UsersIcon className="h-4 w-4" />}
                  label="Members"
                  value={String(house.members.length)} />
                
                  <DetailRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Contact"
                  value={house.contactNumber} />
                
                  <DetailRow
                  icon={<PhoneCall className="h-4 w-4" />}
                  label="Alternate"
                  value={house.alternateNumber || '—'} />
                
                  <DetailRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={house.email} />
                
                  <DetailRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Joined"
                  value={house.joinedDate} />
                
                  <DetailRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                  value={house.address}
                  full />
                
                </div>
              }
            </CardContent>
          </Card>

          {/* Family members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-masjid-600" />
                Family Members
                <Badge variant="default" className="ml-3">
                  {house.members.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MembersList
                members={house.members}
                onAdd={(m) => {
                  addMember(house.id, m);
                  toast.success(`${m.name} added`);
                }}
                onUpdate={(mid, u) => {
                  updateMember(house.id, mid, u);
                  toast.success('Member updated');
                }}
                onRemove={(mid) => {
                  removeMember(house.id, mid);
                  toast.success('Member removed');
                }} />
              
            </CardContent>
          </Card>

          {/* Payment history */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-masjid-600" />
                Payment History
              </CardTitle>
              <Button size="sm" onClick={() => setPaymentOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Record
              </Button>
            </CardHeader>
            <CardContent>
              {housePayments.length === 0 ?
              <p className="text-sm text-slate-500 text-center py-6">
                  No payments recorded yet for this house.
                </p> :

              <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                        <th className="px-2 py-2 font-medium">Receipt</th>
                        <th className="px-2 py-2 font-medium">Type</th>
                        <th className="px-2 py-2 font-medium">Amount</th>
                        <th className="px-2 py-2 font-medium">Method</th>
                        <th className="px-2 py-2 font-medium">Date</th>
                        <th className="px-2 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {housePayments.map((p) =>
                    <tr key={p.id}>
                          <td className="px-2 py-2.5 font-mono text-xs text-slate-700 dark:text-slate-200">
                            {p.receiptNumber}
                          </td>
                          <td className="px-2 py-2.5">
                            <Badge variant="outline">{p.type}</Badge>
                          </td>
                          <td className="px-2 py-2.5 font-medium text-slate-900 dark:text-white">
                            ${p.amount}
                          </td>
                          <td className="px-2 py-2.5 text-slate-600 dark:text-slate-300">
                            {p.method}
                          </td>
                          <td className="px-2 py-2.5 text-slate-600 dark:text-slate-300">
                            {p.date || `Due ${p.dueDate}`}
                          </td>
                          <td className="px-2 py-2.5">
                            <Badge
                          variant={
                          p.status === 'Paid' ?
                          'success' :
                          p.status === 'Overdue' ?
                          'danger' :
                          'warning'
                          }>
                          
                              {p.status}
                            </Badge>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              }
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Contribution */}
          <Card>
            <CardHeader>
              <CardTitle>Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ?
              <div className="space-y-4">
                  <Input
                  label="Amount ($)"
                  type="number"
                  min="0"
                  value={draft.contributionAmount || ''}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    contributionAmount: Number(e.target.value)
                  })
                  } />
                
                  <Select
                  label="Frequency"
                  options={[
                  {
                    label: 'Monthly',
                    value: 'Monthly'
                  },
                  {
                    label: 'Yearly',
                    value: 'Yearly'
                  }]
                  }
                  value={draft.contributionFrequency || 'Monthly'}
                  onChange={(e) =>
                  setDraft({
                    ...draft,
                    contributionFrequency: e.target.value as any
                  })
                  } />
                
                </div> :

              <div className="text-center py-2">
                  <div className="rounded-full bg-masjid-50 dark:bg-masjid-900/30 p-3 inline-flex mb-3">
                    <DollarSign className="h-7 w-7 text-masjid-700 dark:text-masjid-400" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white">
                    ${house.contributionAmount}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    per {house.contributionFrequency.toLowerCase()}
                  </p>
                </div>
              }
            </CardContent>
          </Card>

          {/* Guardian */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-masjid-600" />
                Guardian Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              {guardian ?
              <div className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {guardian.name}
                    </p>
                    <p className="text-sm text-slate-500">{guardian.email}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <KeyRound className="h-3.5 w-3.5 mr-2" /> Send Password
                    Reset
                  </Button>
                </div> :

              <div className="space-y-3">
                  <p className="text-sm text-slate-500">
                    No guardian login linked.
                  </p>
                  <Button variant="primary" size="sm" className="w-full">
                    Invite Guardian
                  </Button>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Record Payment Modal */}
      {paymentOpen &&
      <RecordPaymentModal
        house={house}
        onClose={() => setPaymentOpen(false)}
        onSave={(p) => {
          addPayment(p);
          toast.success('Payment recorded');
          setPaymentOpen(false);
        }}
        existingCount={payments.length} />

      }
    </div>);

}
function DetailRow({
  icon,
  label,
  value,
  full





}: {icon: React.ReactNode;label: string;value: string;full?: boolean;}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <div className="flex items-center text-xs text-slate-500 mb-1">
        <span className="mr-1.5">{icon}</span>
        {label}
      </div>
      <p className="text-sm text-slate-900 dark:text-slate-100 font-medium">
        {value}
      </p>
    </div>);

}
function RecordPaymentModal({
  house,
  onClose,
  onSave,
  existingCount





}: {house: House;onClose: () => void;onSave: (p: Payment) => void;existingCount: number;}) {
  const [draft, setDraft] = useState<Partial<Payment>>({
    amount: house.contributionAmount,
    method: 'Cash',
    status: 'Paid',
    type: 'Mahal Charge',
    monthsCount: 1
  });
  const isMahalCharge = draft.type === 'Mahal Charge';
  const computedAmount = isMahalCharge ?
  house.contributionAmount * (Number(draft.monthsCount) || 1) :
  Number(draft.amount) || 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payment: Payment = {
      id: `p_${Date.now()}`,
      receiptNumber: `RCP-${new Date().getFullYear()}-${String(existingCount + 1).padStart(3, '0')}`,
      houseId: house.id,
      amount: computedAmount,
      method: draft.method as any || 'Cash',
      status: draft.status as any || 'Paid',
      type: draft.type as any || 'Mahal Charge',
      monthsCount: isMahalCharge ? Number(draft.monthsCount) || 1 : undefined,
      date:
      draft.status === 'Paid' ? new Date().toISOString().split('T')[0] : '',
      dueDate: new Date().toISOString().split('T')[0],
      notes: draft.notes
    };
    onSave(payment);
  };
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Record Payment — ${house.name}`}>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-3 text-sm flex justify-between">
          <span className="text-slate-500">Mahal No.</span>
          <span className="font-mono font-medium text-slate-900 dark:text-white">
            {house.mahalHouseNumber}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Type"
            options={[
            {
              label: 'Mahal Charge',
              value: 'Mahal Charge'
            },
            {
              label: 'Donation',
              value: 'Donation'
            },
            {
              label: 'Zakat',
              value: 'Zakat'
            },
            {
              label: 'Sadaqah',
              value: 'Sadaqah'
            },
            {
              label: 'Other',
              value: 'Other'
            }]
            }
            value={draft.type || 'Mahal Charge'}
            onChange={(e) =>
            setDraft({
              ...draft,
              type: e.target.value as any
            })
            } />
          
          <Select
            label="Method"
            options={[
            {
              label: 'Cash',
              value: 'Cash'
            },
            {
              label: 'Bank Transfer',
              value: 'Bank Transfer'
            },
            {
              label: 'UPI',
              value: 'UPI'
            }]
            }
            value={draft.method || 'Cash'}
            onChange={(e) =>
            setDraft({
              ...draft,
              method: e.target.value as any
            })
            } />
          
        </div>

        {isMahalCharge ?
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Input
              label="Number of Months"
              type="number"
              min="1"
              required
              value={draft.monthsCount || 1}
              onChange={(e) =>
              setDraft({
                ...draft,
                monthsCount: Number(e.target.value) || 1
              })
              } />
            
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                  Monthly Rate
                </label>
                <div className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center text-sm font-medium text-slate-700 dark:text-slate-200">
                  ${house.contributionAmount} / mo
                </div>
              </div>
            </div>
            <div className="rounded-md border border-masjid-100 dark:border-masjid-800 bg-masjid-50/60 dark:bg-masjid-900/20 p-3 flex items-center justify-between">
              <div className="text-sm text-masjid-900 dark:text-masjid-200">
                <span className="font-medium">Total</span>
                <span className="text-slate-500 dark:text-slate-400 ml-2 text-xs">
                  ${house.contributionAmount} × {draft.monthsCount || 1}{' '}
                  {Number(draft.monthsCount) === 1 ? 'month' : 'months'}
                </span>
              </div>
              <div className="text-2xl font-bold text-masjid-800 dark:text-masjid-300">
                ${computedAmount}
              </div>
            </div>
          </div> :

        <Input
          label="Amount ($)"
          type="number"
          required
          min="1"
          value={draft.amount || ''}
          onChange={(e) =>
          setDraft({
            ...draft,
            amount: Number(e.target.value)
          })
          } />

        }

        <Select
          label="Status"
          options={[
          {
            label: 'Paid',
            value: 'Paid'
          },
          {
            label: 'Pending',
            value: 'Pending'
          }]
          }
          value={draft.status || 'Paid'}
          onChange={(e) =>
          setDraft({
            ...draft,
            status: e.target.value as any
          })
          } />
        

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
            Notes (optional)
          </label>
          <textarea
            rows={2}
            value={draft.notes || ''}
            onChange={(e) =>
            setDraft({
              ...draft,
              notes: e.target.value
            })
            }
            placeholder="e.g. Eid donation, partial payment..."
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-masjid-500 focus:border-transparent dark:text-slate-50" />
          
        </div>
        <div className="pt-3 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Payment</Button>
        </div>
      </form>
    </Modal>);

}