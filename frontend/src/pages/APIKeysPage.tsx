import { useState } from 'react'
import { Copy, Plus, Trash2, Key, Eye, EyeOff, Shield, Activity } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { toast } from 'sonner'

const keys = [
  { id: 1, name: 'Production API Key',  prefix: 'lcrm_live_', key: 'lcrm_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4',   created: '2026-01-15', lastUsed: '2 hours ago',  requests: 4521, status: 'active' },
  { id: 2, name: 'Development API Key', prefix: 'lcrm_test_', key: 'lcrm_test_x9y8z7w6v5u4t3s2r1q0p9o8n7m6', created: '2026-02-20', lastUsed: '1 day ago',    requests: 312,  status: 'active' },
  { id: 3, name: 'Webhook Secret',      prefix: 'whsec_',   key: 'whsec_1234567890abcdef1234567890ab',     created: '2026-03-01', lastUsed: '5 mins ago',   requests: 9842, status: 'active' },
]

export default function APIKeysPage() {
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({})

  const toggleShow = (id: number) => setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  const copyKey = (key: string) => { navigator.clipboard.writeText(key); toast.success('Copied to clipboard') }

  return (
    <div className="space-y-5 page-enter max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your API keys and webhook secrets</p>
        </div>
        <Button className="gap-1.5" onClick={() => toast.info('Key generation dialog coming soon')}>
          <Plus className="w-4 h-4" />Create Key
        </Button>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Keep your API keys secure</p>
          <p className="text-xs text-muted-foreground mt-0.5">Never share your API keys or expose them in client-side code. Rotate them regularly.</p>
        </div>
      </div>

      {/* Keys */}
      <div className="space-y-3">
        {keys.map(key => (
          <Card key={key.id}>
            <CardContent className="py-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{key.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-3 py-2 rounded-lg font-mono text-foreground flex-1">
                      {showKeys[key.id] ? key.key : `${key.prefix}${'•'.repeat(24)}`}
                    </code>
                    <button onClick={() => toggleShow(key.id)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      {showKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => copyKey(key.key)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-2.5 text-xs text-muted-foreground">
                    <span>Created {key.created}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{key.requests.toLocaleString()} requests</span>
                    <span>Last used {key.lastUsed}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:border-destructive/50 flex-shrink-0"
                  onClick={() => toast.error('Key deletion requires confirmation')}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Stats */}
      <Card>
        <CardContent className="pt-5">
          <h3 className="font-semibold text-foreground mb-4">This Month's Usage</h3>
          <div className="space-y-3">
            {[
              { label: 'API Requests', used: 14675, limit: 50000 },
              { label: 'Webhooks Received', used: 3240, limit: 10000 },
              { label: 'Automations Triggered', used: 892, limit: 5000 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{item.label}</span>
                  <span className="text-muted-foreground metric-number">{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
                </div>
                <div className="bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${(item.used / item.limit) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
