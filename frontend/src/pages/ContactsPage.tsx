import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Download, Building2, MapPin, Briefcase } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { contacts } from '../data/mockData'
import { getInitials } from '../lib/utils'

const avatarGradients = [
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-fuchsia-500',
]

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = contacts.filter(c =>
    !searchQuery ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{filteredContacts.length.toLocaleString()} contacts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-4 h-4" />Export</Button>
          <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />Add Contact</Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search contacts by name, email, or company…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Name', 'Company', 'Role', 'Country', 'Deals', 'Status', 'Last Contact'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredContacts.slice(0, 40).map((contact, i) => (
                  <motion.tr key={contact.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                    className="hover:bg-muted/40 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-[10px] font-bold text-white">{getInitials(contact.name)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-none">{contact.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                        {contact.company}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5" />
                        {contact.role}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {contact.country}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-foreground metric-number">{contact.deals}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${contact.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(contact.lastContact).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
