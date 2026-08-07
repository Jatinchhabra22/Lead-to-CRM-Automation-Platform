from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from enum import Enum
import random
import string

app = FastAPI(
    title="Lead-to-CRM Automation API",
    description="Enterprise-grade lead capture and CRM automation platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== MODELS ====================

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    WON = "won"
    LOST = "lost"

class AutomationStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    DRAFT = "draft"
    ERROR = "error"

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: str
    website: Optional[str] = None
    country: Optional[str] = "United States"
    industry: Optional[str] = None
    source: str = "API"
    notes: Optional[str] = None

class Lead(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    company: str
    website: Optional[str]
    country: str
    industry: str
    leadScore: int
    status: LeadStatus
    assignedUser: str
    source: str
    date: datetime
    notes: Optional[str]

class WebhookPayload(BaseModel):
    event: str
    data: Dict[str, Any]
    timestamp: Optional[datetime] = None

class Automation(BaseModel):
    id: str
    name: str
    description: str
    status: AutomationStatus
    trigger: str
    actions: List[str]
    runsTotal: int
    successRate: float
    lastRun: Optional[datetime]
    createdAt: datetime

class DashboardStats(BaseModel):
    todayLeads: int
    conversionRate: float
    activeAutomations: int
    successRate: float
    totalLeads: int
    qualifiedLeads: int
    wonLeads: int

# ==================== MOCK DATABASE ====================

MOCK_LEADS_DB: List[Lead] = []
MOCK_AUTOMATIONS_DB: List[Automation] = []

def generate_mock_lead(index: int = 0) -> Lead:
    first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]
    companies = ["TechCorp", "DataFlow", "CloudSync", "SalesMax", "AutoHub"]
    industries = ["Technology", "Healthcare", "Finance", "E-commerce", "Education"]
    countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany"]
    statuses = [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.QUALIFIED, LeadStatus.PROPOSAL]
    sources = ["Website Form", "Landing Page", "API", "LinkedIn", "Referral"]
    
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    company = random.choice(companies)
    
    return Lead(
        id=f"lead-{index + 1}",
        name=name,
        email=f"{name.lower().replace(' ', '.')}@{company.lower()}.com",
        phone=f"+1 {random.randint(200,999)}-{random.randint(200,999)}-{random.randint(1000,9999)}",
        company=company,
        website=f"https://www.{company.lower()}.com",
        country=random.choice(countries),
        industry=random.choice(industries),
        leadScore=random.randint(10, 100),
        status=random.choice(statuses),
        assignedUser="John Smith",
        source=random.choice(sources),
        date=datetime.now() - timedelta(days=random.randint(0, 90)),
        notes=f"Lead from {random.choice(sources)}"
    )

# Initialize with some mock data
for i in range(20):
    MOCK_LEADS_DB.append(generate_mock_lead(i))

# ==================== ROUTES ====================

@app.get("/")
async def root():
    return {
        "message": "Lead-to-CRM Automation API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "database": "connected",
        "redis": "connected"
    }

# ==================== LEADS ENDPOINTS ====================

@app.get("/api/leads", response_model=List[Lead])
async def get_leads(
    skip: int = 0,
    limit: int = 100,
    status: Optional[LeadStatus] = None,
    source: Optional[str] = None
):
    """Get all leads with optional filtering"""
    leads = MOCK_LEADS_DB
    
    if status:
        leads = [lead for lead in leads if lead.status == status]
    if source:
        leads = [lead for lead in leads if lead.source == source]
    
    return leads[skip:skip + limit]

@app.post("/api/leads", response_model=Lead, status_code=201)
async def create_lead(lead_data: LeadCreate):
    """Create a new lead"""
    new_lead = Lead(
        id=f"lead-{len(MOCK_LEADS_DB) + 1}",
        name=lead_data.name,
        email=lead_data.email,
        phone=lead_data.phone,
        company=lead_data.company,
        website=lead_data.website,
        country=lead_data.country or "United States",
        industry=lead_data.industry or "Technology",
        leadScore=random.randint(50, 100),
        status=LeadStatus.NEW,
        assignedUser="Auto-assigned",
        source=lead_data.source,
        date=datetime.now(),
        notes=lead_data.notes
    )
    
    MOCK_LEADS_DB.append(new_lead)
    return new_lead

@app.get("/api/leads/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str):
    """Get a specific lead by ID"""
    for lead in MOCK_LEADS_DB:
        if lead.id == lead_id:
            return lead
    raise HTTPException(status_code=404, detail="Lead not found")

@app.patch("/api/leads/{lead_id}", response_model=Lead)
async def update_lead(lead_id: str, updates: Dict[str, Any]):
    """Update a lead"""
    for i, lead in enumerate(MOCK_LEADS_DB):
        if lead.id == lead_id:
            lead_dict = lead.dict()
            lead_dict.update(updates)
            MOCK_LEADS_DB[i] = Lead(**lead_dict)
            return MOCK_LEADS_DB[i]
    raise HTTPException(status_code=404, detail="Lead not found")

@app.delete("/api/leads/{lead_id}")
async def delete_lead(lead_id: str):
    """Delete a lead"""
    for i, lead in enumerate(MOCK_LEADS_DB):
        if lead.id == lead_id:
            MOCK_LEADS_DB.pop(i)
            return {"message": "Lead deleted successfully"}
    raise HTTPException(status_code=404, detail="Lead not found")

# ==================== WEBHOOK ENDPOINTS ====================

@app.post("/api/webhook/receive")
async def receive_webhook(payload: WebhookPayload):
    """Receive webhook from external sources"""
    
    # Process webhook and create lead if applicable
    if payload.event == "form_submission":
        data = payload.data
        lead_data = LeadCreate(
            name=data.get("name", "Unknown"),
            email=data.get("email", "unknown@example.com"),
            phone=data.get("phone"),
            company=data.get("company", "Unknown Company"),
            website=data.get("website"),
            source="Webhook",
            notes=f"Webhook submission: {payload.event}"
        )
        
        new_lead = await create_lead(lead_data)
        
        return {
            "status": "success",
            "message": "Webhook processed successfully",
            "lead_id": new_lead.id
        }
    
    return {
        "status": "received",
        "event": payload.event,
        "timestamp": datetime.now().isoformat()
    }

# ==================== AUTOMATION ENDPOINTS ====================

@app.get("/api/automations", response_model=List[Automation])
async def get_automations():
    """Get all automation workflows"""
    if not MOCK_AUTOMATIONS_DB:
        # Return mock automations
        return [
            Automation(
                id="auto-1",
                name="Website Contact Form → CRM",
                description="Capture website leads and sync to HubSpot with Slack notification",
                status=AutomationStatus.ACTIVE,
                trigger="Website Form",
                actions=["Validate", "Duplicate Check", "HubSpot", "Slack", "Email"],
                runsTotal=1847,
                successRate=98.2,
                lastRun=datetime.now() - timedelta(hours=2),
                createdAt=datetime.now() - timedelta(days=60)
            ),
            Automation(
                id="auto-2",
                name="Demo Request → Sales Pipeline",
                description="Route demo requests to qualified sales reps automatically",
                status=AutomationStatus.ACTIVE,
                trigger="Typeform",
                actions=["Score", "Route", "Salesforce", "Slack"],
                runsTotal=523,
                successRate=97.5,
                lastRun=datetime.now() - timedelta(hours=1),
                createdAt=datetime.now() - timedelta(days=45)
            )
        ]
    return MOCK_AUTOMATIONS_DB

@app.post("/api/automations/{automation_id}/run")
async def run_automation(automation_id: str):
    """Manually trigger an automation"""
    return {
        "status": "running",
        "automation_id": automation_id,
        "run_id": f"run-{''.join(random.choices(string.ascii_letters + string.digits, k=10))}",
        "timestamp": datetime.now().isoformat()
    }

# ==================== DASHBOARD ENDPOINTS ====================

@app.get("/api/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """Get dashboard statistics"""
    total = len(MOCK_LEADS_DB)
    qualified = len([l for l in MOCK_LEADS_DB if l.status == LeadStatus.QUALIFIED])
    won = len([l for l in MOCK_LEADS_DB if l.status == LeadStatus.WON])
    today = len([l for l in MOCK_LEADS_DB if l.date.date() == datetime.now().date()])
    
    return DashboardStats(
        todayLeads=today,
        conversionRate=7.8,
        activeAutomations=8,
        successRate=97.3,
        totalLeads=total,
        qualifiedLeads=qualified,
        wonLeads=won
    )

@app.get("/api/analytics/daily")
async def get_daily_analytics():
    """Get daily lead analytics for the last 30 days"""
    data = []
    for i in range(30):
        date = datetime.now() - timedelta(days=30-i)
        data.append({
            "date": date.strftime("%b %d"),
            "leads": random.randint(15, 85),
            "qualified": random.randint(5, 35),
            "converted": random.randint(2, 15)
        })
    return data

@app.get("/api/analytics/sources")
async def get_source_analytics():
    """Get lead source breakdown"""
    return [
        {"source": "Website Form", "leads": 1247, "percentage": 28},
        {"source": "Landing Page", "leads": 892, "percentage": 20},
        {"source": "Google Ads", "leads": 756, "percentage": 17},
        {"source": "Referral", "leads": 534, "percentage": 12},
        {"source": "LinkedIn", "leads": 445, "percentage": 10},
        {"source": "Other", "leads": 579, "percentage": 13}
    ]

# ==================== INTEGRATION ENDPOINTS ====================

@app.post("/api/integrations/hubspot/sync")
async def sync_to_hubspot(lead_id: str):
    """Sync a lead to HubSpot"""
    # Simulate HubSpot sync
    return {
        "status": "success",
        "platform": "HubSpot",
        "lead_id": lead_id,
        "synced_at": datetime.now().isoformat()
    }

@app.post("/api/integrations/salesforce/sync")
async def sync_to_salesforce(lead_id: str):
    """Sync a lead to Salesforce"""
    # Simulate Salesforce sync
    return {
        "status": "success",
        "platform": "Salesforce",
        "lead_id": lead_id,
        "synced_at": datetime.now().isoformat()
    }

@app.post("/api/integrations/slack/notify")
async def send_slack_notification(channel: str, message: str):
    """Send a Slack notification"""
    # Simulate Slack notification
    return {
        "status": "sent",
        "platform": "Slack",
        "channel": channel,
        "timestamp": datetime.now().isoformat()
    }

# ==================== ERROR HANDLERS ====================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
