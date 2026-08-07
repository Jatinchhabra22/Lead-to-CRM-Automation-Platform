import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Download, Building2, Globe, Users, TrendingUp, MapPin } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { companies } from '../data/mockData'

const statusStyle: Record<string, string> = {
  active:    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  prospect:  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  inactive:  'bg-muted text-muted-foreground',
}

const industryColors = [
  'from-indigo-500 to-purple-500', 'from-blue-500 to-cyan-500', 'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500', 'from-emerald-500 to-teal-500', 'from-violet-500 to-fuchsia-500',
]

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = companies.filter(c =>
    !searchQuery ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{filtered.length} companies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-4 h-4" />Export</Button>
          <Button size="sm" className="gap-1.5"><Plus className="w-4 h-4" />Add Company</Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search companies…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.slice(0, 40).map((company, i) => (
          <motion.div key={company.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Card className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${industryColors[i % industryColors.length]} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">{company.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{company.industry}</p>
                  </div>
                  <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[company.status] || 'bg-muted text-muted-foreground'}`}>
                    {company.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{company.employees.toLocaleString()} emp</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="truncate">{company.revenue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{company.country}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{company.contacts} contacts</span>
                  <div className="flex items-center gap-1 text-primary font-medium">
                    <Globe className="w-3 h-3" />
                    <span>{company.deals} deals</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
