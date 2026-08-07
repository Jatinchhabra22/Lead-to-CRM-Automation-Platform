import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Plug } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { toast } from 'sonner'

const integrations = [
  {
    name: 'HubSpot', category: 'CRM', status: 'connected',
    description: 'Sync contacts, deals, and company data bidirectionally',
    syncedRecords: 1247, lastSync: '2 mins ago',
    gradient: 'from-orange-500 to-amber-500',
    logo: '🟠',
  },
  {
    name: 'Salesforce', category: 'CRM', status: 'connected',
    description: 'Push leads and update opportunity stages automatically',
    syncedRecords: 892, lastSync: '15 mins ago',
    gradient: 'from-blue-500 to-cyan-500',
    logo: '🔵',
  },
  {
    name: 'Google Sheets', category: 'Spreadsheet', status: 'connected',
    description: 'Append lead data to any Google Sheet in real-time',
    syncedRecords: 2341, lastSync: '1 min ago',
    gradient: 'from-green-500 to-emerald-500',
    logo: '🟢',
  },
  {
    name: 'Slack', category: 'Notifications', status: 'connected',
    description: 'Send instant alerts to channels when a lead arrives',
    syncedRecords: 534, lastSync: '3 mins ago',
    gradient: 'from-violet-500 to-purple-500',
    logo: '🟣',
  },
  {
    name: 'Zoho CRM', category: 'CRM', status: 'disconnected',
    description: 'Automate lead creation and module updates in Zoho',
    syncedRecords: 0, lastSync: 'Never',
    gradient: 'from-red-500 to-rose-500',
    logo: '🔴',
  },
  {
    name: 'Mailchimp', category: 'Email', status: 'disconnected',
    description: 'Add leads to audiences and trigger email sequences',
    syncedRecords: 0, lastSync: 'Never',
    gradient: 'from-yellow-500 to-amber-500',
    logo: '🟡',
  },
  {
    name: 'Airtable', category: 'Database', status: 'error',
    description: 'Mirror all lead data into your Airtable base',
    syncedRecords: 445, lastSync: 'Failed 2h ago',
    gradient: 'from-pink-500 to-rose-500',
    logo: '🩷',
  },
  {
    name: 'Notion', category: 'Database', status: 'disconnected',
    description: 'Auto-create pages in a Notion database for each lead',
    syncedRecords: 0, lastSync: 'Never',
    gradient: 'from-gray-600 to-gray-800',
    logo: '⬛',
  },
]

const statusBadge: Record<string, string> = {
  connected:    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  disconnected: 'bg-muted text-muted-foreground',
  error:        'bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function IntegrationsPage() {
  return (
    <div className="space-y-5 page-enter">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Connect your tools and sync data automatically</p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 p-4 bg-card border border-border rounded-xl">
        {[
          { label: 'Connected', value: integrations.filter(i => i.status === 'connected').length, color: 'text-emerald-500' },
          { label: 'Available', value: integrations.length, color: 'text-foreground' },
          { label: 'Errors', value: integrations.filter(i => i.status === 'error').length, color: 'text-red-500' },
          { label: 'Records Synced', value: integrations.reduce((s, i) => s + i.syncedRecords, 0).toLocaleString(), color: 'text-primary' },
        ].map((s, i) => (
          <div key={i} className={i > 0 ? 'border-l border-border pl-6' : ''}>
            <p className={`text-2xl font-bold metric-number ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {integrations.map((integration, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.05 }}>
            <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
              <CardContent className="pt-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center text-xl shadow-md`}>
                      {integration.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{integration.name}</h3>
                      <span className="text-[10px] text-muted-foreground">{integration.category}</span>
                    </div>
                  </div>
                  {integration.status === 'connected' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />}
                  {integration.status === 'error'     && <AlertCircle   className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />}
                </div>

                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{integration.description}</p>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${statusBadge[integration.status]}`}>
                    {integration.status}
                  </span>
                  {integration.syncedRecords > 0 && (
                    <span className="text-[10px] text-muted-foreground">{integration.syncedRecords.toLocaleString()} records</span>
                  )}
                </div>

                {integration.lastSync !== 'Never' && (
                  <p className="text-[10px] text-muted-foreground mb-3 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />{integration.lastSync}
                  </p>
                )}

                {/* Action */}
                <Button
                  size="sm"
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  className="w-full h-8 text-xs gap-1.5"
                  onClick={() => toast.info(integration.status === 'connected' ? `Managing ${integration.name}` : `Connecting ${integration.name}…`)}
                >
                  {integration.status === 'connected' ? (
                    <><ExternalLink className="w-3 h-3" />Manage</>
                  ) : integration.status === 'error' ? (
                    <><RefreshCw className="w-3 h-3" />Reconnect</>
                  ) : (
                    <><Plug className="w-3 h-3" />Connect</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
