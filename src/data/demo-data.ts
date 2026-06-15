export interface Document {
  id: string;
  name: string;
  category: 'buyer' | 'seller' | 'property';
  status: 'complete' | 'pending' | 'missing' | 'ai-detected';
  uploadedBy?: string;
  uploadedAt?: string;
  notes?: string;
}

export interface Deal {
  id: string;
  title: string;
  buyer: { name: string; phone: string };
  seller: { name: string; phone: string };
  propertyType: string;
  location: string;
  dealValue: string;
  registrationDate: string;
  status: 'active' | 'urgent' | 'completed' | 'draft';
  completion: number;
  documents: Document[];
  reminders: Reminder[];
  activity: Activity[];
  createdAt: string;
}

export interface Reminder {
  id: string;
  to: string;
  message: string;
  status: 'sent' | 'scheduled' | 'failed';
  sentAt: string;
  channel: 'whatsapp' | 'email' | 'sms';
}

export interface Activity {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  user: string;
  type: 'upload' | 'reminder' | 'check' | 'update' | 'ai' | 'export';
}

export const brokerName = 'Vikram Singh';
export const brokerCompany = 'Singh Properties & Registrations';

export const stats = {
  activeDeals: 8,
  pendingDocuments: 23,
  upcomingRegistrations: 4,
  completedDealsThisMonth: 12,
  documentsProcessed: 847,
  clientsServed: 156,
  remindersSent: 1234,
  avgCompletionRate: 73,
};

export const deals: Deal[] = [
  {
    id: 'D-1024',
    title: 'Jaipur Apartment — 3BHK',
    buyer: { name: 'Rajesh Sharma', phone: '+91 98765 43210' },
    seller: { name: 'Priya Mehta', phone: '+91 87654 32109' },
    propertyType: 'Residential Apartment',
    location: 'Vaishali Nagar, Jaipur',
    dealValue: '₹ 85,00,000',
    registrationDate: '15 Jul 2026',
    status: 'urgent',
    completion: 82,
    documents: [
      { id: 'd1', name: 'Aadhaar Card', category: 'buyer', status: 'complete', uploadedBy: 'Rajesh Sharma', uploadedAt: '2 days ago' },
      { id: 'd2', name: 'PAN Card', category: 'buyer', status: 'complete', uploadedBy: 'Rajesh Sharma', uploadedAt: '2 days ago' },
      { id: 'd3', name: 'Bank Statement (6 months)', category: 'buyer', status: 'pending', notes: 'Loan case — bank statement required' },
      { id: 'd4', name: 'Passport Photo', category: 'buyer', status: 'missing' },
      { id: 'd5', name: 'Income Tax Returns', category: 'buyer', status: 'ai-detected', notes: 'AI detected loan requirement' },
      { id: 'd6', name: 'Registry Copy', category: 'seller', status: 'complete', uploadedBy: 'Priya Mehta', uploadedAt: '5 days ago' },
      { id: 'd7', name: 'Tax Receipt (Latest)', category: 'seller', status: 'pending' },
      { id: 'd8', name: 'NOC from Society', category: 'seller', status: 'missing' },
      { id: 'd9', name: 'Sale Deed', category: 'property', status: 'complete', uploadedBy: 'Priya Mehta', uploadedAt: '5 days ago' },
      { id: 'd10', name: 'Encumbrance Certificate', category: 'property', status: 'pending' },
      { id: 'd11', name: 'Khata Certificate', category: 'property', status: 'missing' },
      { id: 'd12', name: 'Property Tax Receipt', category: 'property', status: 'complete', uploadedBy: 'Rajesh Sharma', uploadedAt: '1 day ago' },
    ],
    reminders: [
      { id: 'r1', to: 'Rajesh Sharma', message: 'Bank Statement (6 months) & Passport Photo are pending. Please upload at the earliest.', status: 'sent', sentAt: 'Today, 9:30 AM', channel: 'whatsapp' },
      { id: 'r2', to: 'Priya Mehta', message: 'Tax Receipt & NOC from Society are still pending. Registration is in 5 days.', status: 'sent', sentAt: 'Yesterday, 6:15 PM', channel: 'whatsapp' },
      { id: 'r3', to: 'Priya Mehta', message: 'Gentle reminder: NOC from Society is critical. Please arrange urgently.', status: 'scheduled', sentAt: 'Tomorrow, 8:00 AM', channel: 'whatsapp' },
    ],
    activity: [
      { id: 'a1', action: 'AI Insight', detail: 'Loan case detected — ITR documents suggested for buyer', timestamp: 'Today, 10:15 AM', user: 'AI Assistant', type: 'ai' },
      { id: 'a2', action: 'Document Uploaded', detail: 'Property Tax Receipt uploaded by Rajesh Sharma', timestamp: 'Today, 9:45 AM', user: 'Rajesh Sharma', type: 'upload' },
      { id: 'a3', action: 'Reminder Sent', detail: 'WhatsApp reminder sent to Priya Mehta (2 docs pending)', timestamp: 'Yesterday, 6:15 PM', user: 'Auto', type: 'reminder' },
      { id: 'a4', action: 'Document Verified', detail: 'Aadhaar & PAN verified via AI', timestamp: '2 days ago', user: 'AI Assistant', type: 'check' },
      { id: 'a5', action: 'Deal Created', detail: 'Deal initiated for Jaipur Apartment', timestamp: '5 days ago', user: 'Vikram Singh', type: 'update' },
    ],
    createdAt: '5 days ago',
  },
  {
    id: 'D-1023',
    title: 'Gurgaon Commercial Space',
    buyer: { name: 'Ashok Verma', phone: '+91 98765 43211' },
    seller: { name: 'Sneha Kapoor', phone: '+91 87654 32108' },
    propertyType: 'Commercial Office',
    location: 'Sector 48, Gurgaon',
    dealValue: '₹ 2,40,00,000',
    registrationDate: '22 Jul 2026',
    status: 'active',
    completion: 65,
    documents: [
      { id: 'd13', name: 'Aadhaar Card', category: 'buyer', status: 'complete' },
      { id: 'd14', name: 'PAN Card', category: 'buyer', status: 'complete' },
      { id: 'd15', name: 'GST Certificate', category: 'buyer', status: 'pending', notes: 'Commercial property — GST mandatory' },
      { id: 'd16', name: 'Business Registration', category: 'buyer', status: 'missing' },
      { id: 'd17', name: 'Registry Copy', category: 'seller', status: 'complete' },
      { id: 'd18', name: 'Tax Receipt', category: 'seller', status: 'pending' },
      { id: 'd19', name: 'NOC from RWA', category: 'seller', status: 'missing' },
      { id: 'd20', name: 'Sale Deed', category: 'property', status: 'complete' },
      { id: 'd21', name: 'Encumbrance Certificate', category: 'property', status: 'pending' },
      { id: 'd22', name: 'Floor Plan Approval', category: 'property', status: 'missing' },
    ],
    reminders: [
      { id: 'r4', to: 'Ashok Verma', message: 'GST Certificate & Business Registration required for commercial property.', status: 'sent', sentAt: 'Today, 11:00 AM', channel: 'whatsapp' },
    ],
    activity: [
      { id: 'a6', action: 'AI Insight', detail: 'Commercial property — GST Certificate flagged as essential', timestamp: 'Today, 10:30 AM', user: 'AI Assistant', type: 'ai' },
      { id: 'a7', action: 'Reminder Sent', detail: 'WhatsApp reminder sent to Ashok Verma', timestamp: 'Today, 11:00 AM', user: 'Auto', type: 'reminder' },
    ],
    createdAt: '1 week ago',
  },
  {
    id: 'D-1022',
    title: 'Mumbai Rental Agreement',
    buyer: { name: 'Neha Patel', phone: '+91 98765 43212' },
    seller: { name: 'Rohan Desai', phone: '+91 87654 32107' },
    propertyType: 'Rental Agreement',
    location: 'Andheri West, Mumbai',
    dealValue: '₹ 3,60,000 (Annual)',
    registrationDate: '10 Jul 2026',
    status: 'urgent',
    completion: 45,
    documents: [
      { id: 'd23', name: 'Aadhaar Card', category: 'buyer', status: 'complete' },
      { id: 'd24', name: 'PAN Card', category: 'buyer', status: 'complete' },
      { id: 'd25', name: 'Rental Agreement Draft', category: 'buyer', status: 'pending' },
      { id: 'd26', name: 'Salary Slips (3 months)', category: 'buyer', status: 'missing' },
      { id: 'd27', name: 'Property Title Deed', category: 'seller', status: 'complete' },
      { id: 'd28', name: 'NOC from Owner', category: 'seller', status: 'pending' },
      { id: 'd29', name: 'Maintenance Receipts', category: 'property', status: 'missing' },
    ],
    reminders: [
      { id: 'r5', to: 'Neha Patel', message: 'Rental Agreement Draft & Salary Slips pending. Registration in 3 days.', status: 'sent', sentAt: 'Today, 8:00 AM', channel: 'whatsapp' },
      { id: 'r6', to: 'Rohan Desai', message: 'NOC from Owner is required. Please upload ASAP.', status: 'sent', sentAt: 'Today, 8:01 AM', channel: 'whatsapp' },
    ],
    activity: [
      { id: 'a8', action: 'Alert', detail: 'Registration in 3 days — documents only 45% complete', timestamp: 'Today, 8:00 AM', user: 'System', type: 'check' },
      { id: 'a9', action: 'Reminder Sent', detail: 'Auto-reminders sent to both parties', timestamp: 'Today, 8:00 AM', user: 'Auto', type: 'reminder' },
    ],
    createdAt: '2 weeks ago',
  },
  {
    id: 'D-1021',
    title: 'Pune Villa — 4BHK',
    buyer: { name: 'Arun Kumar', phone: '+91 98765 43213' },
    seller: { name: 'Deepa Joshi', phone: '+91 87654 32106' },
    propertyType: 'Independent Villa',
    location: 'Koregaon Park, Pune',
    dealValue: '₹ 3,20,00,000',
    registrationDate: '5 Aug 2026',
    status: 'active',
    completion: 30,
    documents: [
      { id: 'd30', name: 'Aadhaar Card', category: 'buyer', status: 'complete' },
      { id: 'd31', name: 'PAN Card', category: 'buyer', status: 'pending' },
      { id: 'd32', name: 'Bank Statement', category: 'buyer', status: 'missing' },
      { id: 'd33', name: 'Registry Copy', category: 'seller', status: 'pending' },
      { id: 'd34', name: 'Tax Receipt', category: 'seller', status: 'missing' },
      { id: 'd35', name: 'Encumbrance Certificate', category: 'property', status: 'missing' },
    ],
    reminders: [],
    activity: [
      { id: 'a10', action: 'Deal Created', detail: 'Deal initiated for Pune Villa', timestamp: '3 days ago', user: 'Vikram Singh', type: 'update' },
    ],
    createdAt: '3 days ago',
  },
  {
    id: 'D-1020',
    title: 'Bangalore Office Lease',
    buyer: { name: 'Meera Iyer', phone: '+91 98765 43214' },
    seller: { name: 'Vijay Constructions', phone: '+91 87654 32105' },
    propertyType: 'Commercial Lease',
    location: 'Whitefield, Bangalore',
    dealValue: '₹ 12,00,000 (Annual)',
    registrationDate: '20 Aug 2026',
    status: 'active',
    completion: 55,
    documents: [
      { id: 'd36', name: 'Company PAN', category: 'buyer', status: 'complete' },
      { id: 'd37', name: 'GST Certificate', category: 'buyer', status: 'complete' },
      { id: 'd38', name: 'Board Resolution', category: 'buyer', status: 'pending' },
      { id: 'd39', name: 'Property Tax Receipt', category: 'property', status: 'complete' },
      { id: 'd40', name: 'Lease Deed Draft', category: 'property', status: 'pending' },
    ],
    reminders: [],
    activity: [],
    createdAt: '2 weeks ago',
  },
  {
    id: 'D-1019',
    title: 'Delhi Plot Resale',
    buyer: { name: 'Suresh Yadav', phone: '+91 98765 43215' },
    seller: { name: 'Anita Agarwal', phone: '+91 87654 32104' },
    propertyType: 'Residential Plot',
    location: 'Dwarka, Delhi',
    dealValue: '₹ 1,50,00,000',
    registrationDate: '12 Jul 2026',
    status: 'completed',
    completion: 100,
    documents: [
      { id: 'd41', name: 'All Documents', category: 'buyer', status: 'complete' },
      { id: 'd42', name: 'All Documents', category: 'seller', status: 'complete' },
      { id: 'd43', name: 'Transfer Letter', category: 'property', status: 'complete' },
    ],
    reminders: [],
    activity: [
      { id: 'a11', action: 'Registration Complete', detail: 'Deal registered successfully at Dwarka Sub-Registrar', timestamp: '1 day ago', user: 'System', type: 'export' },
    ],
    createdAt: '1 month ago',
  },
  {
    id: 'D-1018',
    title: 'Noida Apartment — 2BHK',
    buyer: { name: 'Karan Mehta', phone: '+91 98765 43216' },
    seller: { name: 'Shikha Buildwell', phone: '+91 87654 32103' },
    propertyType: 'Residential Apartment',
    location: 'Sector 62, Noida',
    dealValue: '₹ 65,00,000',
    registrationDate: '28 Jul 2026',
    status: 'active',
    completion: 70,
    documents: [
      { id: 'd44', name: 'Aadhaar Card', category: 'buyer', status: 'complete' },
      { id: 'd45', name: 'PAN Card', category: 'buyer', status: 'complete' },
      { id: 'd46', name: 'Bank Statement', category: 'buyer', status: 'pending' },
      { id: 'd47', name: 'Registry Copy', category: 'seller', status: 'complete' },
      { id: 'd48', name: 'NOC from Builder', category: 'seller', status: 'pending' },
    ],
    reminders: [],
    activity: [],
    createdAt: '10 days ago',
  },
  {
    id: 'D-1017',
    title: 'Chennai Property Transfer',
    buyer: { name: 'Lakshmi Narayanan', phone: '+91 98765 43217' },
    seller: { name: 'R.K. Estates', phone: '+91 87654 32102' },
    propertyType: 'Commercial Land',
    location: 'OMR, Chennai',
    dealValue: '₹ 4,80,00,000',
    registrationDate: '8 Aug 2026',
    status: 'draft',
    completion: 15,
    documents: [
      { id: 'd49', name: 'Aadhaar Card', category: 'buyer', status: 'complete' },
      { id: 'd50', name: 'PAN Card', category: 'buyer', status: 'pending' },
    ],
    reminders: [],
    activity: [],
    createdAt: '2 days ago',
  },
];

export const aiInsights = [
  {
    id: 'insight-1',
    type: 'alert',
    title: 'Registration in 3 days',
    message: 'Deal D-1022 (Mumbai Rental) has only 45% documents ready. Auto-reminders sent.',
    time: 'Today, 8:00 AM',
    severity: 'high',
  },
  {
    id: 'insight-2',
    type: 'detection',
    title: 'Loan case identified',
    message: 'Deal D-1024 (Jaipur Apartment) — buyer Rajesh Sharma likely taking loan. ITR documents suggested.',
    time: 'Today, 10:15 AM',
    severity: 'medium',
  },
  {
    id: 'insight-3',
    type: 'action',
    title: 'Documents auto-verified',
    message: 'Aadhaar & PAN for Rajesh Sharma (D-1024) verified against government database.',
    time: '2 days ago',
    severity: 'info',
  },
  {
    id: 'insight-4',
    type: 'suggestion',
    title: 'Commercial GST flag',
    message: 'Deal D-1023 (Gurgaon Commercial) — GST Certificate not yet uploaded. 5 similar deals needed this.',
    time: 'Today, 10:30 AM',
    severity: 'medium',
  },
  {
    id: 'insight-5',
    type: 'milestone',
    title: 'Registration complete',
    message: 'Deal D-1019 (Delhi Plot) registered successfully. Package exported.',
    time: 'Yesterday, 4:00 PM',
    severity: 'info',
  },
  {
    id: 'insight-6',
    type: 'reminder',
    title: 'Weekly summary ready',
    message: '3 deals need attention. 23 pending documents across 8 active deals.',
    time: 'Today, 7:00 AM',
    severity: 'low',
  },
];

export const notifications = [
  { id: 'n1', title: 'Document Uploaded', message: 'Rajesh Sharma uploaded Property Tax Receipt', time: '9:45 AM', read: false, type: 'upload' },
  { id: 'n2', title: 'AI Insight Available', message: 'Loan case detected for D-1024', time: '10:15 AM', read: false, type: 'ai' },
  { id: 'n3', title: 'Reminder Sent', message: 'WhatsApp reminder sent to Priya Mehta', time: '6:15 PM', read: false, type: 'reminder' },
  { id: 'n4', title: 'Registration Alert', message: 'D-1022 registration in 3 days', time: '8:00 AM', read: true, type: 'alert' },
  { id: 'n5', title: 'Deal Completed', message: 'D-1019 registered successfully', time: 'Yesterday', read: true, type: 'complete' },
  { id: 'n6', title: 'Document Pending', message: 'NOC from Society still missing for D-1024', time: 'Yesterday', read: true, type: 'pending' },
  { id: 'n7', title: 'Weekly Report', message: '12 deals completed this month', time: '2 days ago', read: true, type: 'report' },
];

export const monthlyData = [
  { month: 'Jan', deals: 4, completed: 3, pending: 1 },
  { month: 'Feb', deals: 6, completed: 5, pending: 1 },
  { month: 'Mar', deals: 8, completed: 7, pending: 1 },
  { month: 'Apr', deals: 7, completed: 5, pending: 2 },
  { month: 'May', deals: 9, completed: 8, pending: 1 },
  { month: 'Jun', deals: 12, completed: 10, pending: 2 },
];

export const documentCategories = [
  { category: 'buyer', label: 'Buyer Documents', icon: 'User', count: 4 },
  { category: 'seller', label: 'Seller Documents', icon: 'Building2', count: 4 },
  { category: 'property', label: 'Property Documents', icon: 'Home', count: 4 },
];
