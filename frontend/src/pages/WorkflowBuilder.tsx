import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Save, Play, Plus, X, RefreshCw,
  Webhook, Mail, MessageSquare, Database, Shield, Target,
  GitBranch, Clock, Zap, CheckCircle, Globe, Users, FileText
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'

interface WorkflowNode {
  id: string
  type: string
  label: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  status?: 'idle' | 'running' | 'success' | 'error'
}

const NODE_PALETTE = {
  triggers: [
    { type: 'webhook', label: 'Webhook', description: 'HTTP webhook trigger', icon: Webhook, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { type: 'form', label: 'Website Form', description: 'Contact form submission', icon: Globe, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
    { type: 'typeform', label: 'Typeform', description: 'Typeform submission', icon: FileText, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
    { type: 'api', label: 'API Call', description: 'Direct API call', icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { type: 'manual', label: 'Manual', description: 'Manually triggered', icon: Play, color: 'text-muted-foreground', bgColor: 'bg-muted' },
  ],
  conditions: [
    { type: 'validate', label: 'Validate', description: 'Check required fields', icon: CheckCircle, color: 'text-teal-500', bgColor: 'bg-teal-500/10' },
    { type: 'spam_check', label: 'Spam Check', description: 'Detect spam', icon: Shield, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { type: 'duplicate', label: 'Dedup Check', description: 'Find duplicate leads', icon: RefreshCw, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
    { type: 'score', label: 'Lead Score', description: 'AI lead scoring', icon: Target, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { type: 'condition', label: 'Condition', description: 'IF/ELSE branching', icon: GitBranch, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  ],
  actions: [
    { type: 'hubspot', label: 'HubSpot', description: 'Create/update contact', icon: Database, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { type: 'salesforce', label: 'Salesforce', description: 'Create lead record', icon: Database, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { type: 'gsheets', label: 'Google Sheets', description: 'Append to spreadsheet', icon: FileText, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { type: 'slack', label: 'Slack', description: 'Send channel alert', icon: MessageSquare, color: 'text-yellow-600', bgColor: 'bg-yellow-500/10' },
    { type: 'email', label: 'Email', description: 'Send welcome email', icon: Mail, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { type: 'assign', label: 'Assign Rep', description: 'Round-robin assignment', icon: Users, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
    { type: 'delay', label: 'Delay', description: 'Wait before next step', icon: Clock, color: 'text-muted-foreground', bgColor: 'bg-muted' },
  ],
}

const DEFAULT_WORKFLOW: WorkflowNode[] = [
  { id: 'n1', type: 'webhook',   label: 'Website Form',    description: 'Webhook from contact form',  icon: Webhook,     color: 'text-blue-500',    bgColor: 'bg-blue-500/10',    status: 'idle' },
  { id: 'n2', type: 'validate',  label: 'Validate Fields', description: 'Check required fields',      icon: CheckCircle, color: 'text-teal-500',    bgColor: 'bg-teal-500/10',    status: 'idle' },
  { id: 'n3', type: 'spam_check',label: 'Spam Detection',  description: 'Filter spam submissions',    icon: Shield,      color: 'text-orange-500',  bgColor: 'bg-orange-500/10',  status: 'idle' },
  { id: 'n4', type: 'duplicate', label: 'Dedup Check',     description: 'Check for existing lead',    icon: RefreshCw,   color: 'text-pink-500',    bgColor: 'bg-pink-500/10',    status: 'idle' },
  { id: 'n5', type: 'score',     label: 'Lead Scoring',    description: 'AI-powered scoring',         icon: Target,      color: 'text-purple-500',  bgColor: 'bg-purple-500/10',  status: 'idle' },
  { id: 'n6', type: 'hubspot',   label: 'HubSpot CRM',     description: 'Create contact record',      icon: Database,    color: 'text-orange-500',  bgColor: 'bg-orange-500/10',  status: 'idle' },
  { id: 'n7', type: 'gsheets',   label: 'Google Sheets',   description: 'Append to dashboard',        icon: FileText,    color: 'text-green-500',   bgColor: 'bg-green-500/10',   status: 'idle' },
  { id: 'n8', type: 'slack',     label: 'Slack Alert',     description: 'Notify #sales-alerts',       icon: MessageSquare,color: 'text-yellow-600', bgColor: 'bg-yellow-500/10',  status: 'idle' },
  { id: 'n9', type: 'email',     label: 'Welcome Email',   description: 'Send welcome sequence',      icon: Mail,        color: 'text-blue-500',    bgColor: 'bg-blue-500/10',    status: 'idle' },
]

export default function WorkflowBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nodes, setNodes] = useState<WorkflowNode[]>(DEFAULT_WORKFLOW)
  const [name, setName] = useState(id ? 'Website Contact Form → CRM' : 'New Automation')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'triggers' | 'conditions' | 'actions'>('triggers')

  const addNode = (template: Omit<WorkflowNode, 'id' | 'status'>) => {
    setNodes(prev => [...prev, { ...template, id: `n${Date.now()}`, status: 'idle' }])
    toast.success(`${template.label} added`)
  }

  const removeNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId))
    if (selectedNodeId === nodeId) setSelectedNodeId(null)
  }

  const simulateRun = useCallback(async () => {
    setIsRunning(true)
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })))
    for (let i = 0; i < nodes.length; i++) {
      await new Promise(r => setTimeout(r, 480))
      setNodes(prev => prev.map((n, idx) => idx === i ? { ...n, status: 'running' } : idx < i ? { ...n, status: Math.random() > 0.08 ? 'success' : 'error' } : n))
    }
    await new Promise(r => setTimeout(r, 480))
    setNodes(prev => prev.map(n => n.status === 'running' ? { ...n, status: Math.random() > 0.08 ? 'success' : 'error' } : n))
    setIsRunning(false)
    toast.success('Test run complete!')
  }, [nodes])

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col -m-6">
      {/* Top Bar */}
      <div className="bg-card border-b border-border px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/automations')} className="gap-1.5 h-8">
            <ArrowLeft className="w-3.5 h-3.5" />Back
          </Button>
          <div className="w-px h-4 bg-border" />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-sm font-semibold bg-transparent border-none outline-none text-foreground hover:bg-muted px-2 py-1 rounded-md min-w-0 w-64"
          />
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{nodes.length} steps</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5"
            onClick={() => setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })))}
          >
            <RefreshCw className="w-3.5 h-3.5" />Reset
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={simulateRun} disabled={isRunning}>
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-pulse' : ''}`} />
            {isRunning ? 'Running…' : 'Test Run'}
          </Button>
          <Button size="sm" className="h-8 gap-1.5" onClick={() => toast.success('Workflow saved!')}>
            <Save className="w-3.5 h-3.5" />Save
          </Button>
        </div>
      </div>

      {/* Main body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left palette */}
        <div className="w-60 flex-shrink-0 bg-card border-r border-border flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Add Step</p>
            <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
              {(['triggers', 'conditions', 'actions'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1 text-[10px] font-semibold rounded-md capitalize transition-all ${activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {NODE_PALETTE[activeTab].map(node => (
              <button key={node.type} onClick={() => addNode(node)}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all text-left group">
                <div className={`w-8 h-8 ${node.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <node.icon className={`w-4 h-4 ${node.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground leading-none">{node.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{node.description}</p>
                </div>
                <Plus className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-muted/20" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <div className="max-w-lg mx-auto">
            <AnimatePresence>
              {nodes.map((node, index) => (
                <motion.div key={node.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }}>
                  {/* Node Card */}
                  <div
                    onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)}
                    className={`relative bg-card rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedNodeId === node.id ? 'border-primary shadow-lg shadow-primary/10' :
                      node.status === 'running' ? 'border-amber-400 shadow-lg shadow-amber-400/20' :
                      node.status === 'success' ? 'border-emerald-400/60' :
                      node.status === 'error'   ? 'border-red-400/60' :
                      'border-border hover:border-border/80 hover:shadow-md'
                    }`}
                  >
                    {/* Running shimmer */}
                    {node.status === 'running' && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-shimmer" style={{ animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%' }} />
                      </div>
                    )}

                    <div className="flex items-center p-4 gap-3 relative">
                      <div className={`w-10 h-10 ${node.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <node.icon className={`w-5 h-5 ${node.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                          <h3 className="text-sm font-semibold text-foreground">{node.label}</h3>
                          {node.status === 'running' && <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-full">Running…</span>}
                          {node.status === 'success' && <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full">✓ Done</span>}
                          {node.status === 'error'   && <span className="px-1.5 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full">✗ Error</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{node.description}</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); removeNode(node.id) }}
                        className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Expanded config */}
                    <AnimatePresence>
                      {selectedNodeId === node.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30 rounded-b-2xl">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Configuration</p>
                            {node.type === 'webhook' && (
                              <div>
                                <label className="text-xs text-muted-foreground block mb-1">Webhook URL</label>
                                <code className="text-xs bg-background border border-border px-3 py-2 rounded-lg block text-primary font-mono break-all">https://api.leadtocrm.com/webhook/abc123</code>
                              </div>
                            )}
                            {node.type === 'slack' && (
                              <div className="space-y-2.5">
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Channel</label>
                                  <input defaultValue="#sales-alerts" className="w-full text-xs bg-background border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary" />
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Message</label>
                                  <textarea defaultValue="🎉 New Lead: {{name}} from {{company}} — Score: {{leadScore}}" className="w-full text-xs bg-background border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary h-16 resize-none" />
                                </div>
                              </div>
                            )}
                            {node.type === 'email' && (
                              <div>
                                <label className="text-xs text-muted-foreground block mb-1">Template</label>
                                <select className="w-full text-xs bg-background border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary">
                                  <option>Welcome Email</option>
                                  <option>Follow-up Sequence</option>
                                  <option>Demo Confirmation</option>
                                </select>
                              </div>
                            )}
                            {(node.type === 'hubspot' || node.type === 'salesforce') && (
                              <div className="space-y-2.5">
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Pipeline</label>
                                  <select className="w-full text-xs bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                                    <option>Sales Pipeline</option>
                                    <option>Enterprise Pipeline</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Stage</label>
                                  <select className="w-full text-xs bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                                    <option>New Lead</option>
                                    <option>Contacted</option>
                                    <option>Qualified</option>
                                  </select>
                                </div>
                              </div>
                            )}
                            {node.type === 'score' && (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">Scoring factors:</p>
                                {['Company size', 'Industry match', 'Email domain', 'Country'].map(f => (
                                  <div key={f} className="flex justify-between text-xs">
                                    <span className="text-foreground">{f}</span>
                                    <span className="text-primary font-semibold">+{Math.floor(Math.random() * 20 + 5)} pts</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {!['webhook','slack','email','hubspot','salesforce','score'].includes(node.type) && (
                              <p className="text-xs text-muted-foreground italic">No additional configuration needed.</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Connector */}
                  {index < nodes.length - 1 && (
                    <div className="flex flex-col items-center py-1.5">
                      <div className={`w-px h-5 transition-colors ${node.status === 'success' ? 'bg-emerald-400' : node.status === 'error' ? 'bg-red-400' : 'bg-border'}`} />
                      <div className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${node.status === 'success' ? 'border-t-emerald-400' : node.status === 'error' ? 'border-t-red-400' : 'border-t-border'}`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add step button */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-4">
              <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right panel — logs */}
        <div className="w-56 flex-shrink-0 bg-card border-l border-border flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <p className="text-xs font-semibold text-foreground">Execution Log</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {nodes.filter(n => n.status && n.status !== 'idle').map(node => (
              <div key={`log-${node.id}`} className="flex items-start gap-2 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  node.status === 'running' ? 'bg-amber-400 animate-pulse' :
                  node.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="font-semibold text-foreground">{node.label}</p>
                  <p className={`text-[10px] ${
                    node.status === 'running' ? 'text-amber-500' :
                    node.status === 'success' ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {node.status === 'running' ? 'Processing…' : node.status === 'success' ? 'Completed' : 'Failed'}
                  </p>
                </div>
              </div>
            ))}
            {nodes.every(n => n.status === 'idle') && (
              <p className="text-[11px] text-muted-foreground text-center py-6">Hit "Test Run" to see logs</p>
            )}
          </div>
          <div className="border-t border-border p-3 space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Summary</p>
            {[
              { label: 'Total Steps', value: nodes.length },
              { label: 'Triggers', value: nodes.filter(n => ['webhook','form','typeform','api','manual'].includes(n.type)).length },
              { label: 'Integrations', value: nodes.filter(n => ['hubspot','salesforce','gsheets','slack','email'].includes(n.type)).length },
            ].map((s, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
