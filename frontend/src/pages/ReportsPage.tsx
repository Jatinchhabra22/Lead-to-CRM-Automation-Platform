import { BarChart3, Download, FileText, TrendingUp, Users, Zap, Calendar } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { toast } from 'sonner'

const reports = [
  { title: 'Daily Lead Report', description: 'All leads captured today with status breakdown', type: 'Daily', format: 'PDF', icon: Users, gradient: 'from-blue-500 to-cyan-500', size: '2.4 MB' },
  { title: 'Weekly Performance', description: 'Conversion rates and team performance metrics', type: 'Weekly', format: 'Excel', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500', size: '4.1 MB' },
  { title: 'Monthly Analytics', description: 'Full monthly overview with trends and insights', type: 'Monthly', format: 'PDF', icon: BarChart3, gradient: 'from-violet-500 to-purple-500', size: '6.8 MB' },
  { title: 'CRM Sync Report', description: 'Status of all CRM synchronization activities', type: 'Daily', format: 'CSV', icon: Zap, gradient: 'from-amber-500 to-orange-500', size: '1.2 MB' },
  { title: 'Source Attribution', description: 'Lead source breakdown with ROI analysis', type: 'Monthly', format: 'Excel', icon: FileText, gradient: 'from-pink-500 to-rose-500', size: '3.6 MB' },
  { title: 'Automation Audit', description: 'All automation runs with success/failure details', type: 'Weekly', format: 'CSV', icon: Zap, gradient: 'from-indigo-500 to-blue-500', size: '2.9 MB' },
]

const quickStats = [
  { label: 'Reports Generated', value: '48', sublabel: 'this month' },
  { label: 'Total Downloads', value: '127', sublabel: 'this month' },
  { label: 'Scheduled Reports', value: '6', sublabel: 'active' },
  { label: 'Data Coverage', value: '90d', sublabel: 'rolling window' },
]

export default function ReportsPage() {
  return (
    <div className="space-y-5 page-enter">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Generate, schedule, and export data reports</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickStats.map((s, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4">
              <p className="text-2xl font-bold text-foreground metric-number">{s.value}</p>
              <p className="text-xs font-medium text-foreground mt-0.5">{s.label}</p>
              <p className="text-[10px] text-muted-foreground">{s.sublabel}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <Card key={i} className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
            <CardContent className="pt-5">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <report.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{report.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  <Calendar className="w-3 h-3" />{report.type}
                </span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">{report.format}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{report.size}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5"
                  onClick={() => toast.info(`Scheduling ${report.title}…`)}>
                  <Calendar className="w-3.5 h-3.5" />Schedule
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs gap-1.5"
                  onClick={() => toast.success(`Generating ${report.title}…`)}>
                  <Download className="w-3.5 h-3.5" />Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
