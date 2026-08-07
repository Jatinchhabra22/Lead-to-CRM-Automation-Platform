import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { dailyLeadsData, sourceData, industryData, leads, automations } from '../data/mockData'

const statCards = [
  { title: "Today's Leads", value: '47', change: '+12%', positive: true, icon: Users, gradient: 'from-blue-500 to-cyan-500' },
  { title: 'Conversion Rate', value: '7.8%', change: '+2.1%', positive: true, icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
  { title: 'Active Automations', value: '8', change: '+3', positive: true, icon: Zap, gradient: 'from-violet-500 to-purple-500' },
  { title: 'Success Rate', value: '97.3%', change: '-0.4%', positive: false, icon: Activity, gradient: 'from-amber-500 to-orange-500' },
]

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']

export default function Dashboard() {
  const recentLeads = leads.slice(0, 7)
  const activeAutomations = automations.filter(a => a.status === 'active').slice(0, 5)

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, John. Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
              <CardContent className="pt-5 pb-4 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground metric-number">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.positive ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className={`text-xs font-semibold ${stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Lead Activity (14 Days)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={dailyLeadsData.slice(-14)}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} stroke="currentColor" opacity={0.3} />
                <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="leads" name="Total" stroke="#6366f1" fill="url(#colorLeads)" strokeWidth={2} />
                <Area type="monotone" dataKey="qualified" name="Qualified" stroke="#8b5cf6" fill="url(#colorQualified)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Pie Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">By Industry</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                >
                  {industryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {industryData.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-foreground truncate">{item.industry}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Leads</CardTitle>
            <a href="/dashboard/leads" className="text-xs text-primary hover:underline font-medium">View all →</a>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group">
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">
                      {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      lead.leadScore >= 80 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      lead.leadScore >= 50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {lead.leadScore}
                    </div>
                    <Badge variant={lead.status === 'won' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Automations */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Active Automations</CardTitle>
            <a href="/dashboard/automations" className="text-xs text-primary hover:underline font-medium">Manage →</a>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {activeAutomations.map((auto) => (
                <div key={auto.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 status-dot-active flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{auto.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {auto.runsTotal.toLocaleString()} runs · {auto.successRate}% success
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sources Mini Chart */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-foreground mb-3">Top Lead Sources</p>
              <div className="space-y-2">
                {sourceData.slice(0, 4).map((source, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-xs text-foreground w-24 truncate">{source.source}</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right font-medium">{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
