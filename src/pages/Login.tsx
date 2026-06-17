import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoonStar, Shield } from 'lucide-react';
import { useAuthStore } from '../stores';
import { Button, Input } from '../components/ui/Core';
import { useT } from '../lib/useT';

export function Login() {
  const t = useT();
  const [email, setEmail] = useState('admin@masjid.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = location.state?.from?.pathname;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email || 'admin@masjid.com', 'Admin');
      navigate(fromState && !fromState.startsWith('/login') ? fromState : '/', { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-ivory dark:bg-ivory-dark">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-masjid-900 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative z-10 text-center px-12">
          <MoonStar className="h-24 w-24 text-gold-500 mx-auto mb-8" />
          <h1 className="font-serif text-5xl font-bold text-white mb-4">MOSQLY Masjid</h1>
          <p className="text-masjid-200 text-lg max-w-md mx-auto">
            Comprehensive management system for our community. Manage houses, subscriptions, and payments seamlessly.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden text-center mb-8">
            <MoonStar className="h-12 w-12 text-masjid-800 dark:text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">MOSQLY Masjid</h2>
          </div>

          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.login.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t.login.subtitle}</p>
          </div>

          <div className="mb-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-masjid-700 dark:text-gold-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{t.login.masjidAdmin}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin access only</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t.login.email}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@masjid.com"
            />
            <div className="space-y-1">
              <Input
                label={t.login.password}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-masjid-600 hover:text-masjid-500 dark:text-gold-500 dark:hover:text-gold-400">
                  {t.login.forgotPassword}
                </a>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t.login.signingIn : `${t.login.signInAs} ${t.login.admin}`}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>{t.login.mockNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
