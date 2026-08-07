import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Trash2, Users, Zap, Webhook, Mail, MessageSquare, AlertCircle, Bell } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { notifications } from '../data/mockData'

const typeConfig: Record<string, { icon: typeof Users; color: string; bg: string }> = {
  lead:    { icon: Users,          color: 'text-blue-500',    bg: 'bg-blue-500/10' },
  sync:    { icon: Zap,            color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  webhook: { icon: Webhook,        color: 'text-purple-500',  bg: 'bg-purple-500/10' },
  email:   { icon: Mail,           color: 'text-indigo-500',  bg: 'bg-indigo-500/10' },
  slack:   { icon: MessageSquare,  color: 'text-yellow-600',  bg: 'bg-yellow-500/10' },
  error:   { icon: AlertCircle,    color: 'text-red-500',     bg: 'bg-red-500/10' },
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications)
  const unread = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id: string) => setNotifs(prev => prev.filter(n => n.id !== id))

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {unread > 0 ? <><span className="text-primary font-semibold">{unread}</span> unread</> : 'All caught up!'}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
            <Check className="w-4 h-4" />Mark all read
          </Button>
        )}
      </div>

      {/* Unread banner */}
      {unread > 0 && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">You have {unread} unread notifications</p>
            <p className="text-xs text-muted-foreground">Click to mark individual notifications as read</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {notifs.slice(0, 60).map((notif, i) => {
          const cfg = typeConfig[notif.type] || typeConfig.error
          const Icon = cfg.icon
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.015 }}>
              <Card className={`transition-all ${!notif.read ? 'border-primary/20 bg-primary/[0.02]' : ''}`}>
                <CardContent className="py-3.5">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                            {!notif.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.message}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {new Date(notif.timestamp).toLocaleDateString()}
                          </span>
                          {!notif.read && (
                            <button onClick={() => markRead(notif.id)} className="p-1 rounded hover:bg-muted transition-colors" title="Mark read">
                              <Check className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                          <button onClick={() => deleteNotif(notif.id)} className="p-1 rounded hover:bg-destructive/10 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </div>
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
