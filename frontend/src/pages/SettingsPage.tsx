import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { User, Building2, Bell, Shield, Palette, Globe, Mail, Trash2, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    newLeads: true, failures: true, crmSync: false, weeklyReport: true, marketing: false,
  })

  return (
    <div className="page-enter max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {sections.map(section => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                  activeSection === section.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}>
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Profile */}
          {activeSection === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl font-bold text-white">JS</div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG, GIF up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Last Name</label>
                    <Input defaultValue="Smith" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" defaultValue="john@example.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Role</label>
                  <Input defaultValue="Sales Manager" />
                </div>
                <Button onClick={() => toast.success('Profile saved!')} className="gap-1.5">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Company */}
          {activeSection === 'company' && (
            <Card>
              <CardHeader><CardTitle className="text-base">Company Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Company Name</label>
                  <Input defaultValue="Acme Inc." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue="https://acme.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Industry</label>
                  <select className="w-full h-10 px-3 bg-background border border-input rounded-md text-sm text-foreground outline-none focus:border-primary">
                    <option>Technology</option>
                    <option>SaaS</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Timezone</label>
                  <select className="w-full h-10 px-3 bg-background border border-input rounded-md text-sm text-foreground outline-none focus:border-primary">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+5:30 (IST)</option>
                  </select>
                </div>
                <Button onClick={() => toast.success('Company settings saved!')} className="gap-1.5">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <Card>
              <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: 'newLeads',     label: 'New Leads',           desc: 'Get notified when a new lead is captured' },
                  { key: 'failures',     label: 'Automation Failures',  desc: 'Alert when an automation fails or errors out' },
                  { key: 'crmSync',      label: 'CRM Sync Status',      desc: 'Updates on CRM sync completions' },
                  { key: 'weeklyReport', label: 'Weekly Reports',       desc: 'Receive weekly performance summaries' },
                  { key: 'marketing',    label: 'Product Updates',      desc: 'News about new features and updates' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                <div className="pt-3">
                  <Button onClick={() => toast.success('Preferences saved!')} className="gap-1.5">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <Card>
              <CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">New Password</label>
                  <Input type="password" placeholder="Min 8 characters" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Confirm New Password</label>
                  <Input type="password" placeholder="Re-enter password" />
                </div>
                <Button onClick={() => toast.success('Password updated!')}>Update Password</Button>
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Authenticator App</p>
                      <p className="text-xs text-muted-foreground">Use an app like Google Authenticator</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.info('2FA setup guide coming soon')}>
                      Enable <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-destructive mb-3">Danger Zone</h4>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5"
                    onClick={() => toast.error('Account deletion requires support confirmation')}>
                    <Trash2 className="w-3.5 h-3.5" />Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <Card>
              <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', bg: 'bg-white', border: 'border-gray-200' },
                      { id: 'dark',  label: 'Dark',  bg: 'bg-gray-950', border: 'border-gray-700' },
                      { id: 'sys',   label: 'System', bg: 'bg-gradient-to-br from-white to-gray-950', border: 'border-gray-400' },
                    ].map(t => (
                      <button key={t.id}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-border hover:border-primary transition-colors"
                        onClick={() => toast.info(`Switching to ${t.label} mode`)}>
                        <div className={`w-full h-12 rounded-lg ${t.bg} border ${t.border}`} />
                        <span className="text-xs font-medium text-foreground">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-3">Accent Color</label>
                  <div className="flex gap-2">
                    {['bg-indigo-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'].map(color => (
                      <button key={color} className={`w-8 h-8 rounded-full ${color} hover:ring-2 ring-offset-2 ring-offset-background ring-current transition-all`}
                        onClick={() => toast.info('Color picker coming soon')} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
