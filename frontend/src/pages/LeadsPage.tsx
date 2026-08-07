import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Download, Mail, Phone, Globe, MapPin, MoreVertical, TrendingUp } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { leads } from '../data/mockData'

const statusStyle: Record<string, string> = {
  new:       'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  contacted: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  qualified: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  proposal:  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  won:       'bg-green-500/10 text-green-600 dark:text-green-400',
  lost:      'bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const statuses = ['all', 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{filteredLeads.length.toLocaleString()} leads total</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-4 h-4" />Export</Button>
          <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />Add Lead</Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'New', count: leads.filter(l => l.status === 'new').length, color: 'text-blue-500' },
          { label: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: 'text-emerald-500' },
          { label: 'Won', count: leads.filter(l => l.status === 'won').length, color: 'text-green-500' },
          { label: 'Avg Score', count: Math.round(leads.reduce((s, l) => s + l.leadScore, 0) / leads.length), color: 'text-indigo-500' },
        ].map((s, i) => (
          <Card key={i} className="py-3 px-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold metric-number ${s.color}`}>{s.count}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search name, email, company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setSelectedStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${selectedStatus === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.slice(0, 30).map((lead, index) => (
          <motion.div key={lead.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.02 }}>
            <Card className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <CardContent className="pt-5">
                {/* Head */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                      {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{lead.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        {/* Score pill */}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${lead.leadScore >= 80 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : lead.leadScore >= 50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                          {lead.leadScore}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[lead.status] || 'bg-muted text-muted-foreground'}`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-all">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate hover:text-foreground transition-colors">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate text-foreground font-medium">{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{lead.country}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{new Date(lead.date).toLocaleDateString()}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />{lead.source}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">View</Button>
                  <Button size="sm" className="flex-1 h-8 text-xs">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
