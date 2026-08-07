import { useState, useEffect } from 'react'
import { Search, Bell, Moon, Sun, Command } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function initDark(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function Header() {
  const [dark, setDark] = useState<boolean>(initDark)
  const [notifications] = useState(12)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <header className="bg-card border-b border-border px-6 py-3 flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 max-w-lg relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
          <Input
            type="text"
            placeholder="Search leads, automations, contacts…"
            className="h-9 pl-10 pr-16 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-colors"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-background rounded border border-border">
            <Command className="w-2.5 h-2.5" /><span>K</span>
          </kbd>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Dark mode */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setDark(d => !d)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark
              ? <Sun className="w-4 h-4 text-amber-400" />
              : <Moon className="w-4 h-4" />
            }
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9" title="Notifications">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
