import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoonStar, Shield, Home as HomeIcon } from 'lucide-react';
import { useAuthStore } from '../stores';
import { Button, Input, cn } from '../components/ui/Core';
type LoginMode = 'admin' | 'guardian';
export function Login() {
  const defaultEmails: Record<LoginMode, string> = {
    admin: 'admin@masjid.com',
    guardian: 'tariq@example.com',
  };

  const [mode, setMode] = useState<LoginMode>('admin');
  const [email, setEmail] = useState(defaultEmails['admin']);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = location.state?.from?.pathname;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (mode === 'guardian') {
        login(email || 'tariq@example.com', 'Guardian');
        navigate(fromState && fromState.startsWith('/my') ? fromState : '/my', {
          replace: true
        });
      } else {
        login(email || 'admin@masjid.com', 'Admin');
        navigate(fromState && !fromState.startsWith('/my') ? fromState : '/', {
          replace: true
        });
      }
    }, 700);
  };
  return (
    <div className="min-h-screen flex bg-ivory dark:bg-ivory-dark">
      <div className="hidden lg:flex lg:w-1/2 bg-masjid-900 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}>
        </div>
        <div className="relative z-10 text-center px-12">
          <MoonStar className="h-24 w-24 text-gold-500 mx-auto mb-8" />
          <h1 className="font-serif text-5xl font-bold text-white mb-4">
            MOSQLY Masjid
          </h1>
          <p className="text-masjid-200 text-lg max-w-md mx-auto">
            Comprehensive management system for our community. Manage houses,
            subscriptions, and payments seamlessly.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden text-center mb-8">
            <MoonStar className="h-12 w-12 text-masjid-800 dark:text-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
              MOSQLY Masjid
            </h2>
          </div>

          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Please sign in to your account
            </p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => { setMode('admin'); setEmail(defaultEmails['admin']); }}
              className={cn(
                'flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors',
                mode === 'admin' ?
                'bg-white dark:bg-slate-700 text-masjid-800 dark:text-white shadow-sm' :
                'text-slate-600 dark:text-slate-400'
              )}>
              
              <Shield className="h-4 w-4 mr-2" /> Masjid Admin
            </button>
            <button
              type="button"
              onClick={() => { setMode('guardian'); setEmail(defaultEmails['guardian']); }}
              className={cn(
                'flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors',
                mode === 'guardian' ?
                'bg-white dark:bg-slate-700 text-masjid-800 dark:text-white shadow-sm' :
                'text-slate-600 dark:text-slate-400'
              )}>
              
              <HomeIcon className="h-4 w-4 mr-2" /> House Guardian
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
              mode === 'admin' ? 'admin@masjid.com' : 'tariq@example.com'
              } />
            

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" />
              
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-masjid-600 hover:text-masjid-500 dark:text-gold-500 dark:hover:text-gold-400">
                  
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ?
              'Signing in...' :
              `Sign in as ${mode === 'admin' ? 'Admin' : 'Guardian'}`}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Mock login: Any credentials will work.</p>
          </div>
        </div>
      </div>
    </div>);

}