import React, { useState } from 'react';
import { Save } from 'lucide-react';
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
import { useAuthStore } from '../stores';
export function MyProfile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated');
  };
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your account information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Account Information
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
                <Button variant="outline" size="sm" type="button">
                  Change Photo
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>

            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            

            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
    </div>);

}