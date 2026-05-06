import React, { useEffect, useState } from 'react';
import {
  Save, Info, Lock, Hash, Users as UsersIcon,
  DollarSign, QrCode, X,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import {
  Card, CardContent, CardHeader, CardTitle,
  Button, Input, Badge,
} from '../components/ui/Core';
import { Modal } from '../components/ui/Modal';
import { useAppStore, useAuthStore } from '../stores';
import { House } from '../lib/types';
import { MembersList } from '../components/houses/MembersList';
export function MyHouse() {
  const { user } = useAuthStore();
  const { houses, updateHouse, addMember, updateMember, removeMember } =
  useAppStore();
  const myHouse = houses.find((h) => h.id === user?.houseId);
  const [draft, setDraft] = useState<Partial<House>>({});
  const [qrOpen, setQrOpen] = useState(false);
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

      {/* QR Code — guardian shows this to masjid staff for quick identification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-masjid-600" />
            My House QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* QR */}
            <div className="shrink-0 p-4 bg-white rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <QRCodeSVG
                value={JSON.stringify({
                  id: myHouse.id,
                  mahalNo: myHouse.mahalHouseNumber,
                  name: myHouse.name,
                  head: myHouse.headOfFamily,
                })}
                size={140}
                bgColor="#ffffff"
                fgColor="#1e3a5f"
                level="M"
                includeMargin={false}
              />
            </div>

            {/* Info + action */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <p className="font-mono font-bold text-masjid-700 dark:text-masjid-400 text-lg">
                  {myHouse.mahalHouseNumber}
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">{myHouse.name}</p>
                <p className="text-sm text-slate-500">{myHouse.headOfFamily}</p>
              </div>
              <p className="text-xs text-slate-500">
                Show this QR code to the masjid staff when making a payment or for quick house identification.
              </p>
              <Button variant="outline" size="sm" onClick={() => setQrOpen(true)}>
                <QrCode className="h-3.5 w-3.5 mr-2" /> View Full Size
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Full-size Modal */}
      {qrOpen && (
        <Modal isOpen onClose={() => setQrOpen(false)} title="My House QR Code">
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md">
              <QRCodeSVG
                value={JSON.stringify({
                  id: myHouse.id,
                  mahalNo: myHouse.mahalHouseNumber,
                  name: myHouse.name,
                  head: myHouse.headOfFamily,
                })}
                size={240}
                bgColor="#ffffff"
                fgColor="#1e3a5f"
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-center space-y-1">
              <p className="font-mono font-bold text-masjid-700 dark:text-masjid-400 text-xl">
                {myHouse.mahalHouseNumber}
              </p>
              <p className="font-semibold text-slate-900 dark:text-white text-lg">{myHouse.name}</p>
              <p className="text-sm text-slate-500">{myHouse.headOfFamily}</p>
            </div>
            <p className="text-xs text-slate-400 text-center max-w-xs">
              Present this to masjid staff for quick identification during payment collection or events.
            </p>
          </div>
        </Modal>
      )}
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