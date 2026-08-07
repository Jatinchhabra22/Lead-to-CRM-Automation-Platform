# Lead-to-CRM Automation Platform

An enterprise-grade SaaS platform for automated lead capture, qualification, enrichment, and CRM synchronization. Leads arrive via webhooks, get scored and routed automatically, and are pushed to HubSpot, Salesforce, Zoho, or Pipedrive — with Slack, email, and SMS notifications at every step.

> **Demo Notice:** This is a demo project. All leads, contacts, companies, analytics, workflow data, and CRM sync logs shown in the UI are fictional demo entries seeded for demonstration purposes. The platform is production-ready — connect real webhook sources, configure CRM API credentials, and it operates as a fully functional lead automation system.

---

## What It Does

- **Lead Capture** — Receive and parse inbound leads from any source via webhook endpoints
- **Spam & Duplicate Detection** — Validate incoming leads before they enter the pipeline
- **AI Lead Scoring** — Score and qualify leads automatically based on configurable criteria
- **Round-Robin Routing** — Assign leads to sales reps using fair round-robin distribution
- **Visual Workflow Builder** — Drag-and-drop automation designer for building multi-step lead processing flows without code
- **Multi-CRM Sync** — Push qualified leads to HubSpot, Salesforce, Zoho CRM, and Pipedrive in real time
- **Notification Hub** — Alert your team via Slack, Discord, Microsoft Teams, email (Mailchimp, Brevo, Resend), and SMS
- **Contact & Company Management** — Maintain a structured contact and company database enriched from inbound lead data
- **Analytics & Reporting** — Conversion funnels, lead source attribution, CRM sync success rates, email open and click tracking, and a custom report builder
- **Role-Based Access Control** — Admin, Manager, Sales, and Viewer roles with granular permissions
- **Audit Logging** — Complete activity trail for all platform operations
- **API Key Management** — Generate and manage keys for external webhook integrations

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| API Framework | FastAPI |
| Server | Uvicorn (ASGI) |
| ORM | SQLAlchemy 2.0 |
| Database | PostgreSQL |
| Migrations | Alembic |
| Auth | JWT |
| Background Tasks | Celery + Redis |
| HTTP Client | httpx |
| Cloud Storage | AWS S3 (boto3) |
| Payments | Stripe |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui + Radix UI (full suite) |
| Auth | Clerk |
| Data Fetching | TanStack React Query |
| Tables | TanStack Table |
| Animations | Framer Motion |
| Charts | Recharts |
| State Management | Zustand |
| Forms | React Hook Form |
| Toasts | sonner |
| Command Palette | cmdk |
| Icons | Lucide React |

---

## Project Structure

```
Lead-to-CRM Automation Platform/
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── pages/
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── Dashboard.tsx
│       │   ├── Leads.tsx
│       │   ├── Automations.tsx
│       │   ├── AutomationBuilder.tsx   # Drag-and-drop workflow designer
│       │   ├── Integrations.tsx
│       │   ├── Analytics.tsx
│       │   ├── Contacts.tsx
│       │   ├── Companies.tsx
│       │   ├── Reports.tsx
│       │   ├── Notifications.tsx
│       │   ├── ApiKeys.tsx
│       │   └── Settings.tsx
│       └── components/
│           ├── layout/               # Sidebar, header
│           └── ui/                   # shadcn/ui component library
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── app/
│       ├── api/                      # Route handlers
│       ├── models/                   # SQLAlchemy models
│       ├── schemas/                  # Pydantic schemas
│       ├── services/                 # Lead scoring, CRM sync, notifications
│       └── workers/                  # Celery task definitions
├── docker/
└── docs/
    ├── ARCHITECTURE.md
    ├── API.md
    ├── WORKFLOWS.md
    └── INTEGRATIONS.md
```

---

## Pages & Routes

| Route | Page |
|---|---|
| `/login` | Login (root redirects here) |
| `/register` | Registration |
| `/dashboard` | Overview — KPIs, recent activity |
| `/dashboard/leads` | Lead management table |
| `/dashboard/automations` | Automation list |
| `/dashboard/automations/builder/:id?` | Visual drag-and-drop workflow builder |
| `/dashboard/integrations` | CRM & tool integrations |
| `/dashboard/analytics` | Analytics dashboard |
| `/dashboard/contacts` | Contact records |
| `/dashboard/companies` | Company records |
| `/dashboard/reports` | Reports |
| `/dashboard/notifications` | Notification hub |
| `/dashboard/api-keys` | API key management |
| `/dashboard/settings` | Account settings |

---

## Lead Automation Workflow

```
1. Lead Capture    → Webhook receives inbound lead data
2. Validation      → Spam detection & duplicate check
3. Scoring         → AI-powered lead qualification score
4. Routing         → Assign to sales rep (round-robin)
5. CRM Sync        → Push to HubSpot / Salesforce / Zoho / Pipedrive
6. Notifications   → Alert team via Slack / Email / SMS
7. Analytics       → Track conversion metrics and attribution
```

---

## Integrations Supported

| Category | Platforms |
|---|---|
| CRM | HubSpot, Salesforce, Zoho CRM, Pipedrive |
| Productivity | Google Sheets, Airtable, Notion |
| Messaging | Slack, Discord, Microsoft Teams |
| Email | Mailchimp, Brevo, Resend |

---

## Setup & Running

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Docker

```bash
docker-compose up -d
```

### Environment Configuration

**Frontend `.env`**
```env
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

**Backend `.env`**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/leadcrm
REDIS_URL=redis://localhost:6379
SECRET_KEY=your_secret_key
```

---

## Security

- JWT-based stateless authentication
- Role-based access control (Admin, Manager, Sales, Viewer)
- Webhook signature verification on inbound lead payloads
- API rate limiting
- Full audit logging for compliance and debugging

---

## Production Readiness

The platform is architected for production deployment:

- PostgreSQL with Alembic migrations for schema version control
- Celery + Redis handles all asynchronous CRM sync and notification tasks
- Clerk is integrated for auth — production-ready out of the box
- Stripe billing integration is wired for SaaS subscription management
- Docker Compose is included for containerized deployment
- RBAC is fully implemented — multiple user roles with scoped permissions

---

## Author

**Ujjwal Verma**
Enterprise Lead Automation Platform — FastAPI + React + PostgreSQL + Redis + Celery
