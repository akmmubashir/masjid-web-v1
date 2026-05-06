import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User, House, Payment, SaaSPlan, Announcement,
  Role, Member, MasjidSubscription, SaaSInvoice, RoleDefinition,
} from '../lib/types';
import { Language } from '../lib/i18n';
import {
  mockHouses, mockPayments, mockSaaSPlans, mockAnnouncements,
  mockUsers, mockRoles, mockMasjidSubscription, mockSaaSInvoices,
} from '../lib/mockData';

// ── Auth store ───────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role = 'Admin') => {
        if (role === 'Guardian') {
          set({
            user: {
              id: 'u_g1',
              name: 'Tariq Ahmed',
              email: email || 'tariq@example.com',
              role: 'Guardian',
              lastActive: new Date().toISOString(),
              status: 'Active',
              houseId: 'h_1',
            },
            isAuthenticated: true,
          });
        } else {
          set({
            user: {
              id: 'u_1',
              name: 'Admin User',
              email: email || 'admin@masjid.com',
              role,
              lastActive: new Date().toISOString(),
              status: 'Active',
            },
            isAuthenticated: true,
          });
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'masjid-auth' }
  )
);

// ── Language store ───────────────────────────────────────────────────────────
interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en' as Language,
      setLanguage: (language) => set({ language }),
    }),
    { name: 'masjid-language' }
  )
);

// ── Theme store ──────────────────────────────────────────────────────────────
interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((state) => {
          const newDark = !state.isDark;
          if (newDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newDark };
        }),
    }),
    { name: 'masjid-theme' }
  )
);

// ── App data store ───────────────────────────────────────────────────────────
interface AppDataState {
  houses: House[];
  payments: Payment[];
  saasPlans: SaaSPlan[];
  masjidSubscription: MasjidSubscription;
  saasInvoices: SaaSInvoice[];
  announcements: Announcement[];
  users: User[];
  roles: RoleDefinition[];
  addHouse: (house: House) => void;
  updateHouse: (id: string, house: Partial<House>) => void;
  deleteHouse: (id: string) => void;
  addPayment: (payment: Payment) => void;
  updatePaymentStatus: (id: string, status: Payment['status']) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  addMember: (houseId: string, member: Member) => void;
  updateMember: (houseId: string, memberId: string, updates: Partial<Member>) => void;
  removeMember: (houseId: string, memberId: string) => void;
  changeMasjidSubscription: (planId: string, billingCycle: 'Monthly' | 'Yearly') => void;
  toggleAutoRenew: () => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: RoleDefinition) => void;
  updateRole: (id: string, updates: Partial<RoleDefinition>) => void;
  deleteRole: (id: string) => void;
}

export const useAppStore = create<AppDataState>((set) => ({
  houses: mockHouses,
  payments: mockPayments,
  saasPlans: mockSaaSPlans,
  masjidSubscription: mockMasjidSubscription,
  saasInvoices: mockSaaSInvoices,
  announcements: mockAnnouncements,
  users: mockUsers,
  roles: mockRoles,

  addHouse: (house) => set((state) => ({ houses: [...state.houses, house] })),
  updateHouse: (id, updatedFields) =>
    set((state) => ({
      houses: state.houses.map((h) => (h.id === id ? { ...h, ...updatedFields } : h)),
    })),
  deleteHouse: (id) =>
    set((state) => ({ houses: state.houses.filter((h) => h.id !== id) })),

  addPayment: (payment) =>
    set((state) => ({ payments: [payment, ...state.payments] })),
  updatePaymentStatus: (id, status) =>
    set((state) => ({
      payments: state.payments.map((p) =>
        p.id === id
          ? { ...p, status, date: status === 'Paid' ? new Date().toISOString().split('T')[0] : p.date }
          : p
      ),
    })),

  addAnnouncement: (announcement) =>
    set((state) => ({ announcements: [announcement, ...state.announcements] })),
  deleteAnnouncement: (id) =>
    set((state) => ({ announcements: state.announcements.filter((a) => a.id !== id) })),

  addMember: (houseId, member) =>
    set((state) => ({
      houses: state.houses.map((h) =>
        h.id === houseId
          ? { ...h, members: [...h.members, member], membersCount: h.members.length + 1 }
          : h
      ),
    })),
  updateMember: (houseId, memberId, updates) =>
    set((state) => ({
      houses: state.houses.map((h) =>
        h.id === houseId
          ? { ...h, members: h.members.map((m) => (m.id === memberId ? { ...m, ...updates } : m)) }
          : h
      ),
    })),
  removeMember: (houseId, memberId) =>
    set((state) => ({
      houses: state.houses.map((h) =>
        h.id === houseId
          ? {
              ...h,
              members: h.members.filter((m) => m.id !== memberId),
              membersCount: Math.max(1, h.members.length - 1),
            }
          : h
      ),
    })),

  changeMasjidSubscription: (planId, billingCycle) =>
    set((state) => ({
      masjidSubscription: {
        ...state.masjidSubscription,
        planId,
        billingCycle,
        currentPeriodStart: new Date().toISOString().split('T')[0],
        currentPeriodEnd: new Date(
          Date.now() + (billingCycle === 'Yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split('T')[0],
      },
    })),
  toggleAutoRenew: () =>
    set((state) => ({
      masjidSubscription: {
        ...state.masjidSubscription,
        autoRenew: !state.masjidSubscription.autoRenew,
      },
    })),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),

  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id, updates) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
  deleteRole: (id) =>
    set((state) => ({ roles: state.roles.filter((r) => r.id !== id) })),
}));
