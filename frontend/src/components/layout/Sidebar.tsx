import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Zap, BarChart3, FileText,
  Bell, Key, Settings, Building2, ChevronLeft,
  ChevronRight, Plug, UserCircle, LogOut, Rocket,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Users,           label: 'Leads',      path: '/dashboard/leads' },
      { icon: Zap,             label: 'Automations',path: '/dashboard/automations' },
      { icon: Plug,            label: 'Integrations',path: '/dashboard/integrations' },
    ],
  },
  {
    label: 'CRM',
    items: [
      { icon: UserCircle,  label: 'Contacts',  path: '/dashboard/contacts' },
      { icon: Building2,   label: 'Companies', path: '/dashboard/companies' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: BarChart3,  label: 'Analytics',     path: '/dashboard/analytics' },
      { icon: FileText,   label: 'Reports',        path: '/dashboard/reports' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Bell,     label: 'Notifications', path: '/dashboard/notifications' },
      { icon: Key,      label: 'API Keys',       path: '/dashboard/api-keys' },
      { icon: Settings, label: 'Settings',       path: '/dashboard/settings' },
    ],
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 232 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col flex-shrink-0 h-screen border-r border-border bg-card z-20 overflow-hidden"
    >
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 mt-0.5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <Rocket className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="text-sm font-bold text-foreground leading-none">Lead-to-CRM</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium tracking-wide uppercase">Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-1.5"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-0.5">
              {group.items.map(({ icon: Icon, label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/dashboard'}
                    title={collapsed ? label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative
                      ${isActive
                        ? 'bg-primary/10 text-primary dark:text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                        )}
                        <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                        <AnimatePresence initial={false}>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden whitespace-nowrap"
                            >
                              {label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-border px-2 py-3">
        <div className={`flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0 ring-2 ring-border">
            <span className="text-[10px] font-bold text-white">JS</span>
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-semibold text-foreground truncate leading-none">John Smith</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleLogout}
                className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-30"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-muted-foreground" />
          : <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        }
      </button>
    </motion.aside>
  )
}
