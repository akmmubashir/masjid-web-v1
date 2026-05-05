import {
  House,
  Payment,
  SaaSPlan,
  Announcement,
  User,
  RevenueDataPoint,
  MasjidSubscription,
  SaaSInvoice,
  RoleDefinition } from
'./types';

// === Masjid's SaaS plans (paid by the masjid to the service provider) ===
export const mockSaaSPlans: SaaSPlan[] = [
{
  id: 'saas_starter',
  tier: 'Starter',
  name: 'Starter',
  monthlyPrice: 19,
  yearlyPrice: 190,
  description: 'Perfect for small masjids getting started.',
  limits: { maxHouses: 100, maxStaff: 3, storageGB: 5 },
  features: [
  'Up to 100 houses',
  'Up to 3 staff accounts',
  'House & member management',
  'Contribution tracking',
  'Email support']

},
{
  id: 'saas_pro',
  tier: 'Pro',
  name: 'Pro',
  monthlyPrice: 49,
  yearlyPrice: 490,
  description: 'Most popular for growing communities.',
  limits: { maxHouses: 500, maxStaff: 10, storageGB: 50 },
  features: [
  'Up to 500 houses',
  'Up to 10 staff accounts',
  'Everything in Starter',
  'Guardian portal access',
  'Announcements & notifications',
  'PDF receipts & exports',
  'Priority email support'],

  popular: true
},
{
  id: 'saas_enterprise',
  tier: 'Enterprise',
  name: 'Enterprise',
  monthlyPrice: 99,
  yearlyPrice: 990,
  description: 'For large mahals with advanced needs.',
  limits: { maxHouses: 'Unlimited', maxStaff: 'Unlimited', storageGB: 500 },
  features: [
  'Unlimited houses & staff',
  'Everything in Pro',
  'Custom branding',
  'API access',
  'Audit logs & advanced reports',
  'Dedicated account manager',
  '24/7 phone support']

}];


export const mockMasjidSubscription: MasjidSubscription = {
  planId: 'saas_pro',
  billingCycle: 'Yearly',
  status: 'Active',
  currentPeriodStart: '2024-01-15',
  currentPeriodEnd: '2025-01-15',
  autoRenew: true,
  seats: 8
};

export const mockSaaSInvoices: SaaSInvoice[] = [
{
  id: 'inv_1',
  invoiceNumber: 'INV-2024-0115',
  date: '2024-01-15',
  amount: 490,
  status: 'Paid',
  planName: 'Pro (Yearly)',
  billingCycle: 'Yearly',
  paymentMethod: 'Visa ending 4242'
},
{
  id: 'inv_2',
  invoiceNumber: 'INV-2023-0115',
  date: '2023-01-15',
  amount: 490,
  status: 'Paid',
  planName: 'Pro (Yearly)',
  billingCycle: 'Yearly',
  paymentMethod: 'Visa ending 4242'
},
{
  id: 'inv_3',
  invoiceNumber: 'INV-2022-0815',
  date: '2022-08-15',
  amount: 19,
  status: 'Paid',
  planName: 'Starter (Monthly)',
  billingCycle: 'Monthly',
  paymentMethod: 'Visa ending 4242'
},
{
  id: 'inv_4',
  invoiceNumber: 'INV-2022-0715',
  date: '2022-07-15',
  amount: 19,
  status: 'Paid',
  planName: 'Starter (Monthly)',
  billingCycle: 'Monthly',
  paymentMethod: 'Visa ending 4242'
}];


// === Houses with custom contribution amounts (set by masjid per family) ===
export const mockHouses: House[] = [
{
  id: 'h_1',
  mahalHouseNumber: 'MH-A-101',
  name: 'The Ahmed Family',
  headOfFamily: 'Tariq Ahmed',
  guardianUserId: 'u_g1',
  contactNumber: '+1 234 567 8900',
  alternateNumber: '+1 234 567 1100',
  email: 'tariq@example.com',
  address: '123 Maple St, Springfield',
  membersCount: 4,
  members: [
  {
    id: 'm_1',
    name: 'Tariq Ahmed',
    relation: 'Head',
    age: 42,
    gender: 'Male',
    phone: '+1 234 567 8900'
  },
  {
    id: 'm_2',
    name: 'Aisha Ahmed',
    relation: 'Spouse',
    age: 38,
    gender: 'Female'
  },
  {
    id: 'm_3',
    name: 'Yusuf Ahmed',
    relation: 'Son',
    age: 14,
    gender: 'Male'
  },
  {
    id: 'm_4',
    name: 'Maryam Ahmed',
    relation: 'Daughter',
    age: 9,
    gender: 'Female'
  }],

  contributionAmount: 50,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-01-15'
},
{
  id: 'h_2',
  mahalHouseNumber: 'MH-A-102',
  name: 'The Khan Family',
  headOfFamily: 'Imran Khan',
  guardianUserId: 'u_g2',
  contactNumber: '+1 234 567 8901',
  alternateNumber: '+1 234 567 1101',
  email: 'imran@example.com',
  address: '456 Oak Ave, Springfield',
  membersCount: 6,
  members: [
  {
    id: 'm_5',
    name: 'Imran Khan',
    relation: 'Head',
    age: 50,
    gender: 'Male'
  },
  {
    id: 'm_6',
    name: 'Fatima Khan',
    relation: 'Spouse',
    age: 46,
    gender: 'Female'
  },
  {
    id: 'm_7',
    name: 'Hamza Khan',
    relation: 'Son',
    age: 22,
    gender: 'Male'
  },
  {
    id: 'm_8',
    name: 'Zainab Khan',
    relation: 'Daughter',
    age: 18,
    gender: 'Female'
  },
  {
    id: 'm_9',
    name: 'Bilal Khan',
    relation: 'Son',
    age: 12,
    gender: 'Male'
  },
  {
    id: 'm_10',
    name: 'Khadija Khan',
    relation: 'Mother',
    age: 72,
    gender: 'Female'
  }],

  contributionAmount: 150,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-03-22'
},
{
  id: 'h_3',
  mahalHouseNumber: 'MH-B-201',
  name: 'The Siddiqui Family',
  headOfFamily: 'Omar Siddiqui',
  guardianUserId: 'u_g3',
  contactNumber: '+1 234 567 8902',
  email: 'omar@example.com',
  address: '789 Pine Rd, Springfield',
  membersCount: 3,
  members: [
  {
    id: 'm_11',
    name: 'Omar Siddiqui',
    relation: 'Head',
    age: 36,
    gender: 'Male'
  },
  {
    id: 'm_12',
    name: 'Hafsa Siddiqui',
    relation: 'Spouse',
    age: 32,
    gender: 'Female'
  },
  {
    id: 'm_13',
    name: 'Ibrahim Siddiqui',
    relation: 'Son',
    age: 5,
    gender: 'Male'
  }],

  contributionAmount: 75,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-06-10'
},
{
  id: 'h_4',
  mahalHouseNumber: 'MH-B-202',
  name: 'The Rahman Family',
  headOfFamily: 'Zaid Rahman',
  contactNumber: '+1 234 567 8903',
  email: 'zaid@example.com',
  address: '321 Elm St, Springfield',
  membersCount: 5,
  members: [
  {
    id: 'm_14',
    name: 'Zaid Rahman',
    relation: 'Head',
    age: 45,
    gender: 'Male'
  },
  {
    id: 'm_15',
    name: 'Sumaya Rahman',
    relation: 'Spouse',
    age: 41,
    gender: 'Female'
  },
  {
    id: 'm_16',
    name: 'Adam Rahman',
    relation: 'Son',
    age: 16,
    gender: 'Male'
  },
  {
    id: 'm_17',
    name: 'Layla Rahman',
    relation: 'Daughter',
    age: 13,
    gender: 'Female'
  },
  {
    id: 'm_18',
    name: 'Noor Rahman',
    relation: 'Daughter',
    age: 8,
    gender: 'Female'
  }],

  contributionAmount: 200,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2022-11-05'
},
{
  id: 'h_5',
  mahalHouseNumber: 'MH-C-301',
  name: 'The Patel Family',
  headOfFamily: 'Yusuf Patel',
  contactNumber: '+1 234 567 8904',
  email: 'yusuf@example.com',
  address: '654 Cedar Ln, Springfield',
  membersCount: 2,
  members: [
  {
    id: 'm_19',
    name: 'Yusuf Patel',
    relation: 'Head',
    age: 30,
    gender: 'Male'
  },
  {
    id: 'm_20',
    name: 'Sara Patel',
    relation: 'Spouse',
    age: 28,
    gender: 'Female'
  }],

  contributionAmount: 25,
  contributionFrequency: 'Monthly',
  status: 'Inactive',
  joinedDate: '2024-01-12'
},
{
  id: 'h_6',
  mahalHouseNumber: 'MH-C-302',
  name: 'The Shaikh Family',
  headOfFamily: 'Bilal Shaikh',
  contactNumber: '+1 234 567 8905',
  email: 'bilal@example.com',
  address: '987 Birch Blvd, Springfield',
  membersCount: 7,
  members: [
  {
    id: 'm_21',
    name: 'Bilal Shaikh',
    relation: 'Head',
    age: 55,
    gender: 'Male'
  },
  {
    id: 'm_22',
    name: 'Amina Shaikh',
    relation: 'Spouse',
    age: 50,
    gender: 'Female'
  },
  {
    id: 'm_23',
    name: 'Hassan Shaikh',
    relation: 'Son',
    age: 28,
    gender: 'Male'
  },
  {
    id: 'm_24',
    name: 'Husain Shaikh',
    relation: 'Son',
    age: 25,
    gender: 'Male'
  },
  {
    id: 'm_25',
    name: 'Ruqayyah Shaikh',
    relation: 'Daughter',
    age: 20,
    gender: 'Female'
  },
  {
    id: 'm_26',
    name: 'Anwar Shaikh',
    relation: 'Father',
    age: 80,
    gender: 'Male'
  },
  {
    id: 'm_27',
    name: 'Saima Shaikh',
    relation: 'Mother',
    age: 76,
    gender: 'Female'
  }],

  contributionAmount: 250,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-08-19'
},
{
  id: 'h_7',
  mahalHouseNumber: 'MH-D-401',
  name: 'The Ali Family',
  headOfFamily: 'Hassan Ali',
  contactNumber: '+1 234 567 8906',
  email: 'hassan@example.com',
  address: '147 Walnut St, Springfield',
  membersCount: 4,
  members: [
  {
    id: 'm_28',
    name: 'Hassan Ali',
    relation: 'Head',
    age: 40,
    gender: 'Male'
  },
  {
    id: 'm_29',
    name: 'Khadija Ali',
    relation: 'Spouse',
    age: 36,
    gender: 'Female'
  },
  {
    id: 'm_30',
    name: 'Ali Hassan',
    relation: 'Son',
    age: 11,
    gender: 'Male'
  },
  {
    id: 'm_31',
    name: 'Safiyya Ali',
    relation: 'Daughter',
    age: 7,
    gender: 'Female'
  }],

  contributionAmount: 60,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-09-01'
},
{
  id: 'h_8',
  mahalHouseNumber: 'MH-D-402',
  name: 'The Mahmood Family',
  headOfFamily: 'Khalid Mahmood',
  contactNumber: '+1 234 567 8907',
  email: 'khalid@example.com',
  address: '258 Cherry Ct, Springfield',
  membersCount: 5,
  members: [
  {
    id: 'm_32',
    name: 'Khalid Mahmood',
    relation: 'Head',
    age: 48,
    gender: 'Male'
  },
  {
    id: 'm_33',
    name: 'Nadia Mahmood',
    relation: 'Spouse',
    age: 44,
    gender: 'Female'
  },
  {
    id: 'm_34',
    name: 'Idris Mahmood',
    relation: 'Son',
    age: 19,
    gender: 'Male'
  },
  {
    id: 'm_35',
    name: 'Rabia Mahmood',
    relation: 'Daughter',
    age: 15,
    gender: 'Female'
  },
  {
    id: 'm_36',
    name: 'Tahir Mahmood',
    relation: 'Son',
    age: 10,
    gender: 'Male'
  }],

  contributionAmount: 100,
  contributionFrequency: 'Monthly',
  status: 'Active',
  joinedDate: '2023-10-15'
}];


export const mockPayments: Payment[] = [
{
  id: 'p_1',
  receiptNumber: 'RCP-2024-001',
  houseId: 'h_1',
  amount: 50,
  method: 'Cash',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-05-01',
  dueDate: '2024-05-05'
},
{
  id: 'p_1b',
  receiptNumber: 'RCP-2024-021',
  houseId: 'h_1',
  amount: 50,
  method: 'UPI',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-04-02',
  dueDate: '2024-04-05'
},
{
  id: 'p_1c',
  receiptNumber: 'RCP-2024-035',
  houseId: 'h_1',
  amount: 100,
  method: 'Cash',
  status: 'Paid',
  type: 'Donation',
  date: '2024-03-15',
  dueDate: '2024-03-15',
  notes: 'Eid donation'
},
{
  id: 'p_1d',
  receiptNumber: 'RCP-2024-048',
  houseId: 'h_1',
  amount: 50,
  method: 'Cash',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-03-01',
  dueDate: '2024-03-05'
},
{
  id: 'p_1e',
  receiptNumber: 'RCP-2024-061',
  houseId: 'h_1',
  amount: 250,
  method: 'Bank Transfer',
  status: 'Paid',
  type: 'Zakat',
  date: '2024-04-10',
  dueDate: '2024-04-10'
},
{
  id: 'p_1f',
  receiptNumber: 'RCP-2024-080',
  houseId: 'h_1',
  amount: 50,
  method: 'Cash',
  status: 'Pending',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '',
  dueDate: '2024-06-05'
},
{
  id: 'p_2',
  receiptNumber: 'RCP-2024-002',
  houseId: 'h_2',
  amount: 150,
  method: 'Bank Transfer',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-03-22',
  dueDate: '2024-03-22'
},
{
  id: 'p_3',
  receiptNumber: 'RCP-2024-003',
  houseId: 'h_3',
  amount: 75,
  method: 'UPI',
  status: 'Pending',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '',
  dueDate: '2024-06-10'
},
{
  id: 'p_4',
  receiptNumber: 'RCP-2024-004',
  houseId: 'h_4',
  amount: 200,
  method: 'Bank Transfer',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-04-05',
  dueDate: '2024-04-05'
},
{
  id: 'p_5',
  receiptNumber: 'RCP-2024-005',
  houseId: 'h_6',
  amount: 250,
  method: 'Cash',
  status: 'Overdue',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '',
  dueDate: '2024-04-19'
},
{
  id: 'p_6',
  receiptNumber: 'RCP-2024-006',
  houseId: 'h_7',
  amount: 60,
  method: 'UPI',
  status: 'Paid',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '2024-05-02',
  dueDate: '2024-05-01'
},
{
  id: 'p_7',
  receiptNumber: 'RCP-2024-007',
  houseId: 'h_8',
  amount: 100,
  method: 'Bank Transfer',
  status: 'Overdue',
  type: 'Mahal Charge',
  monthsCount: 1,
  date: '',
  dueDate: '2024-04-15'
}];


export const mockAnnouncements: Announcement[] = [
{
  id: 'a_1',
  title: 'Eid-ul-Adha Prayer Timings',
  content:
  'First Jamaat at 7:00 AM, Second Jamaat at 8:30 AM. Please arrive early.',
  category: 'Event',
  date: '2024-05-20',
  hasAttachment: false
},
{
  id: 'a_2',
  title: 'Jummah Timing Change',
  content:
  'Starting this Friday, Jummah Khutbah will begin at 1:15 PM instead of 1:30 PM.',
  category: 'Jummah',
  date: '2024-05-18',
  hasAttachment: false
},
{
  id: 'a_3',
  title: 'Annual Masjid Fundraiser',
  content:
  'Join us for our annual fundraising dinner. Tickets available in the office.',
  category: 'Event',
  date: '2024-05-10',
  hasAttachment: true
},
{
  id: 'a_4',
  title: 'Parking Notice',
  content:
  'Please do not park in the reserved spots for the neighboring businesses.',
  category: 'Notice',
  date: '2024-05-05',
  hasAttachment: false
}];


export const mockRoles: RoleDefinition[] = [
{
  id: 'role_admin',
  name: 'Admin',
  description: 'Full access to all system features.',
  permissions: [
  'houses.view',
  'houses.manage',
  'payments.view',
  'payments.manage',
  'announcements.view',
  'announcements.manage',
  'reports.view',
  'subscriptions.manage',
  'users.view',
  'users.manage',
  'roles.manage',
  'settings.manage'],

  isSystem: true
},
{
  id: 'role_staff',
  name: 'Staff',
  description: 'Can manage daily operations but not system settings.',
  permissions: [
  'houses.view',
  'houses.manage',
  'payments.view',
  'payments.manage',
  'announcements.view',
  'announcements.manage',
  'reports.view',
  'users.view'],

  isSystem: true
},
{
  id: 'role_viewer',
  name: 'Viewer',
  description: 'Read-only access to most data.',
  permissions: [
  'houses.view',
  'payments.view',
  'announcements.view',
  'reports.view',
  'users.view'],

  isSystem: true
},
{
  id: 'role_guardian',
  name: 'Guardian',
  description: 'Limited access to own house data only.',
  permissions: [],
  isSystem: true
},
{
  id: 'role_accountant',
  name: 'Accountant',
  description: 'Access to financial records and reports.',
  permissions: ['payments.view', 'payments.manage', 'reports.view'],
  isSystem: false
},
{
  id: 'role_communications',
  name: 'Communications',
  description: 'Can only manage announcements.',
  permissions: ['announcements.view', 'announcements.manage'],
  isSystem: false
}];


export const mockUsers: User[] = [
{
  id: 'u_1',
  name: 'Admin User',
  email: 'admin@masjid.com',
  role: 'Admin',
  lastActive: '2024-05-25T10:30:00Z',
  status: 'Active'
},
{
  id: 'u_2',
  name: 'Staff Member',
  email: 'staff@masjid.com',
  role: 'Staff',
  lastActive: '2024-05-24T14:15:00Z',
  status: 'Active'
},
{
  id: 'u_3',
  name: 'Finance Team',
  email: 'finance@masjid.com',
  role: 'Accountant',
  lastActive: '2024-05-25T09:00:00Z',
  status: 'Active'
},
{
  id: 'u_4',
  name: 'Board Member',
  email: 'board@masjid.com',
  role: 'Viewer',
  lastActive: '2024-05-20T11:45:00Z',
  status: 'Active'
},
{
  id: 'u_5',
  name: 'PR Manager',
  email: 'pr@masjid.com',
  role: 'Communications',
  lastActive: '2024-05-22T10:00:00Z',
  status: 'Active'
},
{
  id: 'u_g1',
  name: 'Tariq Ahmed',
  email: 'tariq@example.com',
  role: 'Guardian',
  lastActive: '2024-05-25T08:00:00Z',
  status: 'Active',
  houseId: 'h_1'
},
{
  id: 'u_g2',
  name: 'Imran Khan',
  email: 'imran@example.com',
  role: 'Guardian',
  lastActive: '2024-05-24T18:00:00Z',
  status: 'Active',
  houseId: 'h_2'
},
{
  id: 'u_g3',
  name: 'Omar Siddiqui',
  email: 'omar@example.com',
  role: 'Guardian',
  lastActive: '2024-05-23T12:00:00Z',
  status: 'Active',
  houseId: 'h_3'
}];


export const mockRevenueData: RevenueDataPoint[] = [
{ month: 'Jun', revenue: 4200 },
{ month: 'Jul', revenue: 4500 },
{ month: 'Aug', revenue: 4100 },
{ month: 'Sep', revenue: 5800 },
{ month: 'Oct', revenue: 4900 },
{ month: 'Nov', revenue: 5200 },
{ month: 'Dec', revenue: 6100 },
{ month: 'Jan', revenue: 5500 },
{ month: 'Feb', revenue: 5900 },
{ month: 'Mar', revenue: 8200 },
{ month: 'Apr', revenue: 9500 },
{ month: 'May', revenue: 5100 }];