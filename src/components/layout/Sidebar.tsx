import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  CreditCard,
  BookOpen,
  Bell,
  Megaphone,
  FileText,
  Users,
  Settings,
  MoonStar,
  User as UserIcon } from
'lucide-react';
import { cn } from '../ui/Core';
import { useAuthStore } from '../../stores';
const adminNav = [
{
  section: 'Overview',
  items: [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard
  }]

},
{
  section: 'Management',
  items: [
  {
    name: 'Houses',
    path: '/houses',
    icon: Home
  },
  {
    name: 'Our Subscription',
    path: '/subscriptions',
    icon: BookOpen
  }]

},
{
  section: 'Finance',
  items: [
  {
    name: 'Payments',
    path: '/payments',
    icon: CreditCard
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: FileText
  }]

},
{
  section: 'Communication',
  items: [
  {
    name: 'Announcements',
    path: '/announcements',
    icon: Megaphone
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: Bell
  }]

},
{
  section: 'System',
  items: [
  {
    name: 'Users & Roles',
    path: '/users',
    icon: Users
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings
  }]

}];

const guardianNav = [
{
  section: 'Overview',
  items: [
  {
    name: 'My Dashboard',
    path: '/my',
    icon: LayoutDashboard
  }]

},
{
  section: 'My Account',
  items: [
  {
    name: 'My House',
    path: '/my/house',
    icon: Home
  },
  {
    name: 'My Payments',
    path: '/my/payments',
    icon: CreditCard
  },
  {
    name: 'Profile',
    path: '/my/profile',
    icon: UserIcon
  }]

},
{
  section: 'Updates',
  items: [
  {
    name: 'Announcements',
    path: '/my/announcements',
    icon: Megaphone
  },
  {
    name: 'Notifications',
    path: '/my/notifications',
    icon: Bell
  }]

}];

export function Sidebar({
  isOpen,
  setIsOpen



}: {isOpen: boolean;setIsOpen: (v: boolean) => void;}) {
  const { user, logout } = useAuthStore();
  const isGuardian = user?.role === 'Guardian';
  const navItems = isGuardian ? guardianNav : adminNav;
  return (
    <>
      {isOpen &&
      <div
        className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        onClick={() => setIsOpen(false)} />

      }

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-masjid-900 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none',
          !isOpen && '-translate-x-full'
        )}>
        
        <div className="flex h-16 shrink-0 items-center px-6 bg-masjid-950">
          <MoonStar className="h-8 w-8 text-gold-500 mr-3" />
          <div>
            <span className="font-serif text-xl font-bold text-white tracking-wide block leading-tight">
              MOSQLY
            </span>
            {isGuardian &&
            <span className="text-[10px] uppercase tracking-wider text-gold-500">
                Guardian Portal
              </span>
            }
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navItems.map((group, i) =>
          <div key={i}>
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-masjid-400 mb-2">
                {group.section}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/' || item.path === '/my'}
                    onClick={() =>
                    window.innerWidth < 1024 && setIsOpen(false)
                    }
                    className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all relative',
                      isActive ?
                      'bg-masjid-800 text-white shadow-sm before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-gold-500 before:rounded-r' :
                      'hover:bg-masjid-800/50 hover:text-white'
                    )
                    }>
                    
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </NavLink>);

              })}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-masjid-950 border-t border-masjid-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-masjid-700 flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-masjid-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-masjid-400 hover:text-white text-xs">
              
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>);

}