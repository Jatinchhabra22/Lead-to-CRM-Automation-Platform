import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Play, Pause, Copy, Trash2, Edit2, CheckCircle2, XCircle, Clock, BarChart3, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { automations } from '../data/mockData'
import { toast } from 'sonner'

type AutoStatus = 'active' | 'paused' | 'draft' | 'error'

const statusConfig: Record<AutoStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  active: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Active' },
  paused: { icon: Clock,        color: 'text-amber-500',   bg: 'bg-amber-500/10',   label: 'Paused' },
  draft:  { icon: Edit2,        color: 'text-muted-foreground', bg: 'bg-muted', label: 'Draft' },
  error:  { icon: XCircle,      color: 'text-red-500',     bg: 'bg-red-500/10',     label: 'Error' },
}

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState(automations)

  const toggleStatus = (id: string) => {
    setWorkflows(prev => prev.map(a => {
      if (a.id !== id) return a
      const newStatus = a.status === 'active' ? 'paused' : 'active'
      toast.success(`Automation ${newStatus === 'active' ? 'resumed' : 'paused'}`)
      return { ...a, status: newStatus as AutoStatus }
    }))
  }

  const deleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(a => a.id !== id))
    toast.success('Automation deleted')
  }

  const cloneWorkflow = (id: string) => {
    const original = workflows.find(a => a.id === id)
    if (original) {
      setWorkflows(prev => [...prev, { ...original, id: `auto-${Date.now()}`, name: `${original.name} (Copy)`, status: 'draft' as AutoStatus, runsTotal: 0 }])
      toast.success('Automation cloned')
    }
  }

  const stats = {
    active: workflows.filter(a => a.status === 'active').length,
    paused: workflows.filter(a => a.status === 'paused').length,
    errors: workflows.filter(a => a.status === 'error').length,
    totalRuns: workflows.reduce((s, a) => s + a.runsTotal, 0),
  }

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Automations</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage and monitor your automation workflows</p>
        </div>
        <Link to="/dashboard/automations/builder">
          <Button className="gap-1.5"><Plus className="w-4 h-4" />New Automation</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active', value: stats.active, gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Paused', value: stats.paused, gradient: 'from-amber-500 to-orange-500' },
          { label: 'Errors', value: stats.errors, gradient: 'from-red-500 to-rose-500' },
          { label: 'Total Runs', value: stats.totalRuns.toLocaleString(), gradient: 'from-indigo-500 to-purple-500' },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-2xl font-bold metric-number bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        {workflows.map((auto, i) => {
          const cfg = statusConfig[auto.status as AutoStatus]
          const StatusIcon = cfg.icon
          return (
            <motion.div key={auto.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }}>
              <Card className="hover:shadow-md transition-shadow group">
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    {/* Status icon */}
                    <div className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className={`w-5 h-5 ${cfg.color}`} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{auto.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{auto.description}</p>
                        </div>
                        <span className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      </div>

                      {/* Workflow steps */}
                      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
                        <span className="text-xs text-muted-foreground flex-shrink-0 font-medium">{auto.trigger}</span>
                        {auto.actions.map((action, j) => (
                          <span key={j} className="flex items-center gap-1">
                            <ArrowRight className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded whitespace-nowrap">{action}</span>
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" />{auto.runsTotal.toLocaleString()} runs</div>
                        <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{auto.successRate}% success</div>
                        {auto.lastRun && <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Last: {new Date(auto.lastRun).toLocaleDateString()}</div>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1"
                        onClick={() => toggleStatus(auto.id)}
                        disabled={auto.status === 'draft' || auto.status === 'error'}>
                        {auto.status === 'active' ? <><Pause className="w-3 h-3" />Pause</> : <><Play className="w-3 h-3" />Resume</>}
                      </Button>
                      <Link to={`/dashboard/automations/builder/${auto.id}`}>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0"><Edit2 className="w-3.5 h-3.5" /></Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => cloneWorkflow(auto.id)}><Copy className="w-3.5 h-3.5" /></Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:border-destructive/50" onClick={() => deleteWorkflow(auto.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
