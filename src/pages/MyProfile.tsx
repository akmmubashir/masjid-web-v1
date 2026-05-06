import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '../components/ui/Core';
import { useAuthStore } from '../stores';
import { useT } from '../lib/useT';

export function MyProfile() {
  const t = useT();
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.myProfile.profileUpdated);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.myProfile.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.myProfile.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t.myProfile.accountInfo}
            <Badge variant="warning">{user?.role}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-16 w-16 rounded-full bg-masjid-100 dark:bg-masjid-900/50 flex items-center justify-center text-masjid-700 dark:text-masjid-300 font-semibold text-xl">
                {(name || 'U').charAt(0)}
              </div>
              <div>
                <Button variant="outline" size="sm" type="button">{t.myProfile.changePhoto}</Button>
                <p className="text-xs text-slate-500 mt-2">{t.myProfile.photoHint}</p>
              </div>
            </div>
            <Input label={t.myProfile.fullName} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label={t.myProfile.emailAddress} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> {t.myProfile.saveProfile}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t.myProfile.security}</CardTitle></CardHeader>
        <CardContent>
          <Button variant="outline">{t.myProfile.changePassword}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
