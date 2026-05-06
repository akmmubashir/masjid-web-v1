import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, Filter, Edit, Trash2, Eye,
  Shield, DollarSign, Users as UsersIcon, Home,
} from 'lucide-react';
import { useAppStore } from '../stores';
import { Modal } from '../components/ui/Modal';
import { Button, Input, Card, Badge, Select, cn } from '../components/ui/Core';
import { House } from '../lib/types';

const emptyHouse: Partial<House> = {
  status: 'Active',
  members: [],
  contributionAmount: 50,
  contributionFrequency: 'Monthly',
};

export function Houses() {
  const { houses, addHouse, deleteHouse } = useAppStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<House>>(emptyHouse);

  const filteredHouses = houses.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.headOfFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.mahalHouseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const house: House = {
      id: `h_${Date.now()}`,
      mahalHouseNumber: draft.mahalHouseNumber || '',
      name: draft.name || '',
      headOfFamily: draft.headOfFamily || '',
      guardianUserId: draft.guardianUserId,
      contactNumber: draft.contactNumber || '',
      alternateNumber: draft.alternateNumber,
      email: draft.email || '',
      address: draft.address || '',
      membersCount: 1,
      members: [],
      contributionAmount: Number(draft.contributionAmount) || 50,
      contributionFrequency: (draft.contributionFrequency as 'Monthly' | 'Yearly') || 'Monthly',
      status: (draft.status as 'Active' | 'Inactive') || 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    addHouse(house);
    setAddOpen(false);
    setDraft(emptyHouse);
    navigate(`/houses/${house.id}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Houses
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">
            {houses.length} registered families
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add House
        </Button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search name, guardian, Mahal No…"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['All', 'Active', 'Inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors border',
                statusFilter === s
                  ? 'bg-masjid-800 text-white border-masjid-800'
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile card grid / desktop table */}
      {filteredHouses.length === 0 ? (
        <Card>
          <div className="p-12 text-center text-slate-500">
            <Home className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No houses found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Mobile cards (hidden on lg+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredHouses.map((house) => (
              <Card
                key={house.id}
                className="cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => navigate(`/houses/${house.id}`)}
              >
                <div className="p-4 space-y-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">
                        {house.name}
                      </p>
                      <p className="text-xs text-masjid-600 dark:text-masjid-400 font-mono mt-0.5">
                        {house.mahalHouseNumber}
                      </p>
                    </div>
                    <Badge variant={house.status === 'Active' ? 'success' : 'default'}>
                      {house.status}
                    </Badge>
                  </div>

                  {/* Info row */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="h-3.5 w-3.5 text-slate-400" />
                      {house.members.length} members
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                      {house.contributionAmount}/{house.contributionFrequency === 'Monthly' ? 'mo' : 'yr'}
                    </span>
                    {house.guardianUserId && (
                      <span title="Has guardian login">
                        <Shield className="h-3.5 w-3.5 text-masjid-600" />
                      </span>
                    )}
                  </div>

                  {/* Guardian name */}
                  <p className="text-xs text-slate-500 truncate">{house.headOfFamily}</p>

                  {/* Actions */}
                  <div
                    className="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-masjid-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => navigate(`/houses/${house.id}`)}
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-masjid-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => navigate(`/houses/${house.id}`)}
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => deleteHouse(house.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table (hidden below lg) */}
          <Card className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Mahal No.</th>
                    <th className="px-6 py-4 font-medium">House</th>
                    <th className="px-6 py-4 font-medium">Guardian</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Contribution</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredHouses.map((house) => (
                    <tr
                      key={house.id}
                      className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/houses/${house.id}`)}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-medium text-masjid-700 dark:text-masjid-400">
                        {house.mahalHouseNumber}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {house.name}
                        <div className="text-xs text-slate-500 font-normal">
                          {house.members.length} members
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          {house.headOfFamily}
                          {house.guardianUserId && (
                            <Shield className="h-3.5 w-3.5 text-masjid-600" title="Has guardian login" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {house.contactNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white flex items-center">
                          <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                          {house.contributionAmount}
                        </div>
                        <div className="text-xs text-slate-500">
                          per {house.contributionFrequency.toLowerCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={house.status === 'Active' ? 'success' : 'default'}>
                          {house.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 text-slate-400 hover:text-masjid-600 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => navigate(`/houses/${house.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 text-slate-400 hover:text-masjid-600 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => navigate(`/houses/${house.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => deleteHouse(house.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
              <span>Showing {filteredHouses.length} of {houses.length} houses</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => { setAddOpen(false); setDraft(emptyHouse); }}
        title="Add New House"
        className="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Mahal House No."
              required
              placeholder="e.g. MH-A-101"
              value={draft.mahalHouseNumber || ''}
              onChange={(e) => setDraft({ ...draft, mahalHouseNumber: e.target.value })}
            />
            <Input
              label="House Name"
              required
              placeholder="e.g. The Ahmed Family"
              value={draft.name || ''}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <Input
            label="Head of Family / Guardian Name"
            required
            value={draft.headOfFamily || ''}
            onChange={(e) => setDraft({ ...draft, headOfFamily: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Number"
              required
              value={draft.contactNumber || ''}
              onChange={(e) => setDraft({ ...draft, contactNumber: e.target.value })}
            />
            <Input
              label="Alternate Number"
              value={draft.alternateNumber || ''}
              onChange={(e) => setDraft({ ...draft, alternateNumber: e.target.value })}
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            required
            value={draft.email || ''}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
          />
          <Input
            label="Address"
            required
            value={draft.address || ''}
            onChange={(e) => setDraft({ ...draft, address: e.target.value })}
          />
          <div className="bg-masjid-50 dark:bg-masjid-900/20 border border-masjid-100 dark:border-masjid-800 rounded-md p-4">
            <label className="text-sm font-medium text-masjid-900 dark:text-masjid-200 flex items-center mb-3">
              <DollarSign className="h-4 w-4 mr-1.5" />
              Contribution Amount (set by masjid)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Amount ($)"
                type="number"
                min="0"
                required
                value={draft.contributionAmount || ''}
                onChange={(e) => setDraft({ ...draft, contributionAmount: Number(e.target.value) })}
              />
              <Select
                label="Frequency"
                options={[{ label: 'Monthly', value: 'Monthly' }, { label: 'Yearly', value: 'Yearly' }]}
                value={draft.contributionFrequency || 'Monthly'}
                onChange={(e) => setDraft({ ...draft, contributionFrequency: e.target.value as any })}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">Members can be added on the next page after saving.</p>
          <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button type="submit">Save & Continue</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
