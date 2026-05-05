export type Role = 'Admin' | 'Staff' | 'Viewer' | 'Guardian';

export type Permission =
'houses.view' |
'houses.manage' |
'payments.view' |
'payments.manage' |
'announcements.view' |
'announcements.manage' |
'reports.view' |
'subscriptions.manage' |
'users.view' |
'users.manage' |
'roles.manage' |
'settings.manage';

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'Active' | 'Inactive';
  houseId?: string;
}

export type Relation =
'Head' |
'Spouse' |
'Son' |
'Daughter' |
'Father' |
'Mother' |
'Brother' |
'Sister' |
'Other';

export interface Member {
  id: string;
  name: string;
  relation: Relation;
  age: number;
  gender: 'Male' | 'Female';
  phone?: string;
}

export type ContributionFrequency = 'Monthly' | 'Yearly';

export interface House {
  id: string;
  mahalHouseNumber: string;
  name: string;
  headOfFamily: string;
  guardianUserId?: string;
  contactNumber: string;
  alternateNumber?: string;
  email: string;
  address: string;
  membersCount: number;
  members: Member[];
  contributionAmount: number; // Custom monthly amount the masjid set for THIS house
  contributionFrequency: ContributionFrequency;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

// ===== Masjid's SaaS plans (the masjid pays the service provider) =====

export type SaaSTier = 'Starter' | 'Pro' | 'Enterprise';

export interface SaaSPlan {
  id: string;
  tier: SaaSTier;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  limits: {
    maxHouses: number | 'Unlimited';
    maxStaff: number | 'Unlimited';
    storageGB: number;
  };
  features: string[];
  popular?: boolean;
}

export interface MasjidSubscription {
  planId: string;
  billingCycle: 'Monthly' | 'Yearly';
  status: 'Active' | 'Past Due' | 'Cancelled' | 'Trial';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  seats: number;
}

export interface SaaSInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  planName: string;
  billingCycle: 'Monthly' | 'Yearly';
  paymentMethod: string;
}

// ===== House contribution payments to masjid =====

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer';
export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';
export type PaymentType =
'Mahal Charge' |
'Donation' |
'Zakat' |
'Sadaqah' |
'Other';

export interface Payment {
  id: string;
  receiptNumber: string;
  houseId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  type: PaymentType;
  date: string;
  dueDate: string;
  monthsCount?: number;
  periodStart?: string;
  periodEnd?: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Jummah' | 'Event' | 'Notice' | 'General';
  date: string;
  hasAttachment: boolean;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}