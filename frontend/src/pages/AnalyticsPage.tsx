import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { dailyLeadsData, sourceData, industryData, conversionData } from '../data/mockData'
import { TrendingUp, Users, Target, Zap, ArrowUpRight } from 'lucide-react'

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 page-enter">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Comprehensive insights into your lead pipeline</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: '4,453', change: '+18%', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
          { label: 'Conversion Rate', value: '7.8%', change: '+2.1%', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Avg Lead Score', value: '68.3', change: '+4.2', icon: Target, gradient: 'from-violet-500 to-purple-500' },
          { label: 'Automation Runs', value: '11,403', change: '+31%', icon: Zap, gradient: 'from-amber-500 to-orange-500' },
        ].map((kpi, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity`} />
            <CardContent className="pt-5 pb-4 relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground metric-number">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{kpi.change}</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-md`}>
                  <kpi.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Volume Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Lead Volume (30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyLeadsData}>
              <defs>
                <linearGradient id="aLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aQual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} stroke="currentColor" opacity={0.2} />
              <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '10px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="leads"     name="Total"     stroke="#6366f1" fill="url(#aLeads)" strokeWidth={2} />
              <Area type="monotone" dataKey="qualified" name="Qualified"  stroke="#8b5cf6" fill="url(#aQual)"  strokeWidth={2} />
              <Area type="monotone" dataKey="converted" name="Converted"  stroke="#10b981" fill="url(#aConv)"  strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Bar */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Lead Sources</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <YAxis dataKey="source" type="category" tick={{ fontSize: 11, fill: 'currentColor' }} width={90} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '10px' }} />
                <Bar dataKey="leads" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Pie */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Industry Distribution</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={industryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {industryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {industryData.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-foreground truncate">{item.industry}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle></CardHeader>
        <CardContent className="pt-0 space-y-3">
          {conversionData.map((stage, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-24 font-medium">{stage.stage}</span>
              <div className="flex-1 bg-muted rounded-full h-7 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                  style={{ width: `${(stage.value / conversionData[0].value) * 100}%` }}
                >
                  <span className="text-xs text-white font-semibold metric-number">{stage.value.toLocaleString()}</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right font-medium metric-number">
                {Math.round((stage.value / conversionData[0].value) * 100)}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
