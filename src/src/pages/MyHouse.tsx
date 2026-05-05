import React, { useEffect, useState, useId } from 'react';
import {
  Save,
  Info,
  Lock,
  Hash,
  Users as UsersIcon,
  DollarSign } from
'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge } from
'../components/ui/Core';
import { useAppStore, useAuthStore } from '../stores';
import { House } from '../lib/types';
import { MembersList } from '../components/houses/MembersList';
export function MyHouse() {
  const { user } = useAuthStore();
  const { houses, updateHouse, addMember, updateMember, removeMember } =
  useAppStore();
  const myHouse = houses.find((h) => h.id === user?.houseId);
  const [draft, setDraft] = useState<Partial<House>>({});
  useEffect(() => {
    if (myHouse) setDraft(myHouse);
  }, [myHouse?.id]);
  if (!myHouse) {
    return (
      <Card className="max-w-xl mx-auto mt-12">
        <CardContent className="p-8 text-center">
          <Info className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold mb-2">
            No House Linked
          </h2>
          <p className="text-sm text-slate-500">
            Your account isn't linked to a house yet. Please contact the masjid
            administration.
          </p>
        </CardContent>
      </Card>);

  }
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHouse(myHouse.id, {
      name: draft.name,
      headOfFamily: draft.headOfFamily,
      contactNumber: draft.contactNumber,
      alternateNumber: draft.alternateNumber,
      email: draft.email,
      address: draft.address
    });
    toast.success('House details updated');
  };
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
          My House
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Update your family's contact details and members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            House Details
            <Badge variant="outline">
              <Hash className="h-3 w-3 mr-1 inline" />
              {myHouse.mahalHouseNumber}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="House Name"
                required
                value={draft.name || ''}
                onChange={(e) =>
                setDraft({
                  ...draft,
                  name: e.target.value
                })
                } />
              
              <Input
                label="Head of Family"
                required
                value={draft.headOfFamily || ''}
                onChange={(e) =>
                setDraft({
                  ...draft,
                  headOfFamily: e.target.value
                })
                } />
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Number"
                required
                value={draft.contactNumber || ''}
                onChange={(e) =>
                setDraft({
                  ...draft,
                  contactNumber: e.target.value
                })
                } />
              
              <Input
                label="Alternate Number"
                placeholder="Optional"
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
              required
              value={draft.email || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                email: e.target.value
              })
              } />
            
            <Input
              label="Address"
              required
              value={draft.address || ''}
              onChange={(e) =>
              setDraft({
                ...draft,
                address: e.target.value
              })
              } />
            

            <div className="pt-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Family Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-masjid-600" />
            Family Members
            <Badge variant="default" className="ml-3">
              {myHouse.members.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MembersList
            members={myHouse.members}
            onAdd={(m) => {
              addMember(myHouse.id, m);
              toast.success(`${m.name} added`);
            }}
            onUpdate={(id, u) => {
              updateMember(myHouse.id, id, u);
              toast.success('Member updated');
            }}
            onRemove={(id) => {
              removeMember(myHouse.id, id);
              toast.success('Member removed');
            }} />
          
        </CardContent>
      </Card>

      {/* Contribution - read only (set by masjid) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Your Contribution
            <Lock className="h-4 w-4 ml-2 text-slate-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-masjid-50 dark:bg-masjid-900/30 p-3">
                <DollarSign className="h-6 w-6 text-masjid-700 dark:text-masjid-400" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
                  ${myHouse.contributionAmount}
                </h3>
                <p className="text-sm text-slate-500">
                  per {myHouse.contributionFrequency.toLowerCase()}
                </p>
              </div>
            </div>
            <Badge variant="success">{myHouse.status}</Badge>
          </div>
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-masjid-600" />
            <span>
              Your contribution amount is set by the masjid based on family
              circumstances. Please contact the masjid office for any changes.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>);

}