// Mock data generator for the Lead-to-CRM Platform

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  website: string
  country: string
  industry: string
  leadScore: number
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
  assignedUser: string
  source: string
  date: string
  notes: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  role: string
  country: string
  status: 'active' | 'inactive'
  lastContact: string
  deals: number
}

export interface Company {
  id: string
  name: string
  industry: string
  revenue: string
  employees: number
  country: string
  status: 'active' | 'prospect' | 'inactive'
  website: string
  contacts: number
  deals: number
}

export interface Automation {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft' | 'error'
  trigger: string
  actions: string[]
  runsTotal: number
  successRate: number
  lastRun: string
  createdAt: string
}

export interface Notification {
  id: string
  type: 'lead' | 'sync' | 'webhook' | 'email' | 'slack' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
  'Manufacturing', 'Real Estate', 'Consulting', 'Marketing', 'SaaS',
  'Fintech', 'Retail', 'Media', 'Legal', 'Logistics'
]

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'India', 'Singapore', 'Netherlands', 'Sweden', 'Japan',
  'Brazil', 'Spain', 'Italy', 'Mexico'
]

const sources = [
  'Website Form', 'Landing Page', 'Typeform', 'API', 'Manual Import',
  'Google Ads', 'LinkedIn', 'Referral', 'Webinar', 'Email Campaign',
  'Blog Post', 'Cold Outreach', 'Twitter', 'Trade Show', 'Inbound'
]

const users = [
  'Sarah Johnson', 'Michael Davis', 'Emily Chen', 'James Wilson',
  'Olivia Martinez', 'Daniel Brown', 'Sophia Lee', 'Ryan Taylor',
  'Emma Anderson', 'Noah Garcia'
]

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael',
  'Linda', 'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan',
  'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher',
  'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret',
  'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly',
  'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol',
  'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah', 'Ronald', 'Stephanie',
  'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia'
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Turner', 'Phillips', 'Evans', 'Collins', 'Parker'
]

const companyNames = [
  'TechCorp Solutions', 'DataFlow Systems', 'CloudSync Pro', 'SalesMax Inc',
  'AutoHub Technology', 'LeadGen Pro', 'CRM Solutions Ltd', 'FastTrack Sales',
  'WebFlow Inc', 'Digital Edge Corp', 'SyncPro Systems', 'DataMaster LLC',
  'CloudVault Technologies', 'TeamSync Solutions', 'Analytics Hub',
  'WorkStream Inc', 'NetGrowth Systems', 'ProActive CRM', 'InnovateCo',
  'CoreLogic Solutions', 'TechVision Ltd', 'SmartLead Inc', 'AutoCRM Pro',
  'LeadMax Solutions', 'ConnectHub Technologies', 'SalesForce Pro',
  'DataDrive Inc', 'CloudBase Systems', 'TechNova Solutions', 'LeadPulse',
  'RevenueMax Corp', 'SalesTrack Ltd', 'LeadVault Inc', 'CRMaster Pro',
  'DataSync Systems', 'WorkFlow Pro', 'SalesHub Inc', 'TechBridge Corp',
  'LeadFlow Solutions', 'CRMSync Pro', 'DataPulse Inc', 'CloudTrack Ltd',
  'SalesPro Systems', 'LeadDrive Corp', 'TechFlow Inc', 'DataVault Pro',
  'CRMBase Solutions', 'SalesSync Ltd', 'LeadCore Inc', 'TechSync Systems'
]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(daysAgo: number = 90): string {
  const now = new Date()
  const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime())
  return new Date(randomTime).toISOString()
}

// Generate 500 leads
export const generateLeads = (count: number = 500): Lead[] => {
  const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = randomItem(firstNames)
    const lastName = randomItem(lastNames)
    const company = randomItem(companyNames)
    const domain = company.toLowerCase().replace(/[^a-z]/g, '') + '.com'
    
    return {
      id: `lead-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      company,
      website: `https://www.${domain}`,
      country: randomItem(countries),
      industry: randomItem(industries),
      leadScore: randomInt(10, 100),
      status: randomItem(statuses),
      assignedUser: randomItem(users),
      source: randomItem(sources),
      date: randomDate(90),
      notes: `Lead from ${randomItem(sources)} campaign. Interested in ${randomItem(['Premium Plan', 'Enterprise Plan', 'Pro Plan', 'Basic Plan'])}.`,
    }
  })
}

// Generate 500 contacts
export const generateContacts = (count: number = 500): Contact[] => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = randomItem(firstNames)
    const lastName = randomItem(lastNames)
    const company = randomItem(companyNames)
    const domain = company.toLowerCase().replace(/[^a-z]/g, '') + '.com'
    
    const roles = ['CEO', 'CTO', 'VP Sales', 'Sales Manager', 'Marketing Director', 
                   'Product Manager', 'Operations Lead', 'Founder', 'COO', 'CFO']
    
    return {
      id: `contact-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      company,
      role: randomItem(roles),
      country: randomItem(countries),
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      lastContact: randomDate(30),
      deals: randomInt(0, 10),
    }
  })
}

// Generate 200 companies
export const generateCompanies = (count: number = 200): Company[] => {
  const revenues = ['$1M-$5M', '$5M-$10M', '$10M-$50M', '$50M-$100M', '$100M+', '$500K-$1M']
  
  return Array.from({ length: count }, (_, i) => {
    const name = companyNames[i % companyNames.length] + (i >= companyNames.length ? ` ${Math.floor(i / companyNames.length) + 1}` : '')
    const domain = name.toLowerCase().replace(/[^a-z]/g, '') + '.com'
    
    return {
      id: `company-${i + 1}`,
      name,
      industry: randomItem(industries),
      revenue: randomItem(revenues),
      employees: randomInt(10, 5000),
      country: randomItem(countries),
      status: randomItem(['active', 'prospect', 'inactive'] as Company['status'][]),
      website: `https://www.${domain}`,
      contacts: randomInt(1, 50),
      deals: randomInt(0, 20),
    }
  })
}

// Generate automation workflows
export const generateAutomations = (): Automation[] => {
  return [
    {
      id: 'auto-1',
      name: 'Website Contact Form → CRM',
      description: 'Capture website leads and sync to HubSpot with Slack notification',
      status: 'active',
      trigger: 'Website Form',
      actions: ['Validate', 'Duplicate Check', 'Lead Score', 'HubSpot', 'Slack', 'Email'],
      runsTotal: 1847,
      successRate: 98.2,
      lastRun: randomDate(1),
      createdAt: randomDate(60),
    },
    {
      id: 'auto-2',
      name: 'Demo Request → Sales Pipeline',
      description: 'Route demo requests to qualified sales reps automatically',
      status: 'active',
      trigger: 'Typeform',
      actions: ['Score', 'Route', 'Salesforce', 'Slack', 'Calendar'],
      runsTotal: 523,
      successRate: 97.5,
      lastRun: randomDate(1),
      createdAt: randomDate(45),
    },
    {
      id: 'auto-3',
      name: 'Newsletter Signup Workflow',
      description: 'Welcome email sequence for newsletter subscribers',
      status: 'active',
      trigger: 'API Webhook',
      actions: ['Validate', 'Email', 'Google Sheets', 'Mailchimp'],
      runsTotal: 2341,
      successRate: 99.1,
      lastRun: randomDate(1),
      createdAt: randomDate(90),
    },
    {
      id: 'auto-4',
      name: 'Enterprise Lead Scoring',
      description: 'Advanced scoring with industry and revenue-based routing',
      status: 'active',
      trigger: 'Multiple',
      actions: ['AI Score', 'Industry Check', 'Route to AE', 'Salesforce', 'Notify'],
      runsTotal: 312,
      successRate: 95.8,
      lastRun: randomDate(2),
      createdAt: randomDate(30),
    },
    {
      id: 'auto-5',
      name: 'Webinar Attendee Follow-up',
      description: 'Post-webinar automation sequence with personalized email',
      status: 'active',
      trigger: 'Webinar Platform',
      actions: ['Tag', 'Score', 'Email Sequence', 'CRM', 'Assign'],
      runsTotal: 689,
      successRate: 96.3,
      lastRun: randomDate(7),
      createdAt: randomDate(20),
    },
    {
      id: 'auto-6',
      name: 'Spam Detection & Filter',
      description: 'Automatically filter and quarantine spam leads',
      status: 'paused',
      trigger: 'All Sources',
      actions: ['Spam Check', 'Quarantine', 'Notify Admin'],
      runsTotal: 456,
      successRate: 89.2,
      lastRun: randomDate(3),
      createdAt: randomDate(45),
    },
    {
      id: 'auto-7',
      name: 'Re-engagement Campaign',
      description: 'Re-engage cold leads with targeted email sequence',
      status: 'draft',
      trigger: 'CRM Condition',
      actions: ['Filter Cold', 'Email Sequence', 'Track Open', 'Score'],
      runsTotal: 0,
      successRate: 0,
      lastRun: '',
      createdAt: randomDate(5),
    },
    {
      id: 'auto-8',
      name: 'Round Robin Assignment',
      description: 'Evenly distribute leads across sales team',
      status: 'active',
      trigger: 'All New Leads',
      actions: ['Round Robin', 'Assign', 'Notify Rep', 'Log'],
      runsTotal: 3421,
      successRate: 100,
      lastRun: randomDate(1),
      createdAt: randomDate(120),
    },
    {
      id: 'auto-9',
      name: 'G-Sheet Sync Master',
      description: 'Sync all leads to master Google Sheets dashboard',
      status: 'active',
      trigger: 'New Lead',
      actions: ['Format', 'Append Row', 'Update Dashboard', 'Notify'],
      runsTotal: 1923,
      successRate: 97.8,
      lastRun: randomDate(1),
      createdAt: randomDate(75),
    },
    {
      id: 'auto-10',
      name: 'Inbound Webhook Processor',
      description: 'Process and route all incoming webhook payloads',
      status: 'error',
      trigger: 'Webhook',
      actions: ['Parse', 'Validate', 'Route', 'Store', 'Log'],
      runsTotal: 892,
      successRate: 78.3,
      lastRun: randomDate(1),
      createdAt: randomDate(50),
    },
  ]
}

// Generate notifications
export const generateNotifications = (count: number = 100): Notification[] => {
  const types: Notification['type'][] = ['lead', 'sync', 'webhook', 'email', 'slack', 'error']
  
  const messages = {
    lead: [
      { title: 'New Lead Received', msg: 'John Smith from TechCorp submitted a contact form' },
      { title: 'High-Value Lead', msg: 'Sarah Johnson from DataFlow scored 95 - immediate attention required' },
      { title: 'Enterprise Lead', msg: 'New enterprise lead from CloudSync Pro requesting demo' },
    ],
    sync: [
      { title: 'CRM Sync Complete', msg: '15 leads successfully synced to HubSpot' },
      { title: 'Salesforce Updated', msg: 'Contact records updated in Salesforce' },
      { title: 'Airtable Synced', msg: 'New leads appended to Airtable database' },
    ],
    webhook: [
      { title: 'Webhook Received', msg: 'New payload from website contact form processed' },
      { title: 'API Request', msg: 'Lead submitted via API endpoint' },
    ],
    email: [
      { title: 'Welcome Email Sent', msg: 'Welcome email sent to john@techcorp.com' },
      { title: 'Email Campaign', msg: 'Follow-up sequence started for 25 contacts' },
    ],
    slack: [
      { title: 'Slack Notification Sent', msg: '#sales-alerts notified of new enterprise lead' },
    ],
    error: [
      { title: 'Sync Failed', msg: 'Failed to sync lead to Salesforce - retry scheduled' },
      { title: 'Webhook Error', msg: 'Invalid payload format received from external source' },
      { title: 'Rate Limit Reached', msg: 'HubSpot API rate limit reached - queued for retry' },
    ],
  }
  
  return Array.from({ length: count }, (_, i) => {
    const type = randomItem(types)
    const msgList = messages[type]
    const msg = randomItem(msgList)
    
    return {
      id: `notif-${i + 1}`,
      type,
      title: msg.title,
      message: msg.msg,
      timestamp: randomDate(7),
      read: Math.random() > 0.4,
    }
  })
}

// Analytics data
export const generateDailyLeadsData = () => {
  const data = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leads: randomInt(15, 85),
      qualified: randomInt(5, 35),
      converted: randomInt(2, 15),
    })
  }
  
  return data
}

export const generateSourceData = () => [
  { source: 'Website Form', leads: 1247, percentage: 28 },
  { source: 'Landing Page', leads: 892, percentage: 20 },
  { source: 'Google Ads', leads: 756, percentage: 17 },
  { source: 'Referral', leads: 534, percentage: 12 },
  { source: 'LinkedIn', leads: 445, percentage: 10 },
  { source: 'Email Campaign', leads: 312, percentage: 7 },
  { source: 'Other', leads: 267, percentage: 6 },
]

export const generateIndustryData = () => [
  { industry: 'Technology', value: 35, color: '#3B82F6' },
  { industry: 'SaaS', value: 22, color: '#8B5CF6' },
  { industry: 'Finance', value: 15, color: '#10B981' },
  { industry: 'Healthcare', value: 12, color: '#F59E0B' },
  { industry: 'E-commerce', value: 10, color: '#EF4444' },
  { industry: 'Other', value: 6, color: '#6B7280' },
]

export const generateConversionData = () => [
  { stage: 'Captured', value: 4453 },
  { stage: 'Validated', value: 4121 },
  { stage: 'Qualified', value: 2234 },
  { stage: 'Contacted', value: 1678 },
  { stage: 'Proposal', value: 892 },
  { stage: 'Won', value: 345 },
]

// Pre-generated data exports
export const leads = generateLeads(500)
export const contacts = generateContacts(500)
export const companies = generateCompanies(200)
export const automations = generateAutomations()
export const notifications = generateNotifications(100)
export const dailyLeadsData = generateDailyLeadsData()
export const sourceData = generateSourceData()
export const industryData = generateIndustryData()
export const conversionData = generateConversionData()
