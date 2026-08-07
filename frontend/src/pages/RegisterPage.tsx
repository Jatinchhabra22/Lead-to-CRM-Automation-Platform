import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Mail, Lock, User, Building2, Github, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const perks = [
  '500+ leads processed automatically per month',
  'Connects to HubSpot, Salesforce, Google Sheets',
  'Visual workflow builder — no code required',
  '14-day free trial, cancel any time',
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('authToken', 'demo-token-12345')
      toast.success('Account created! Welcome aboard.')
      navigate('/dashboard')
    }, 900)
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">

      {/* ── Left Panel ───────────────────────────── */}
      <div className="hidden lg:flex flex-col w-[48%] relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-600/8 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-indigo-500/6 rounded-full blur-[70px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-auto">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight">Lead-to-CRM</span>
          </div>

          {/* Hero */}
          <div className="mb-auto mt-16">
            <h1 className="text-[2.4rem] font-bold text-white leading-[1.15] tracking-tight mb-5">
              Start automating<br />your lead pipeline.
            </h1>
            <p className="text-white/45 text-base leading-relaxed max-w-xs">
              Free for 14 days. No credit card. Cancel any time.
            </p>
          </div>

          {/* Perks */}
          <div className="mt-12 space-y-3.5 mb-auto">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-white/60">{perk}</span>
              </motion.div>
            ))}
          </div>

          {/* Stat cards */}
          <div className="mt-12 grid grid-cols-2 gap-3">
            {[
              { value: '10k+', label: 'Leads processed daily' },
              { value: '98%',  label: 'CRM sync success' },
              { value: '8h',   label: 'Saved per team/week' },
              { value: '50+',  label: 'Workflow templates' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <p className="text-xl font-bold text-white tracking-tight">{s.value}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ───────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#0f0f17] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-[380px] py-6"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight">Lead-to-CRM</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Create your account</h2>
            <p className="text-sm text-white/40">Free 14-day trial — no credit card needed</p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" className="flex items-center justify-center gap-2 h-10 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 h-10 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
              <Github className="w-4 h-4 shrink-0" />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#0f0f17] text-xs text-white/30">or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input type="text" placeholder="John Smith" value={form.name} onChange={set('name')} required
                  className="w-full h-11 pl-10 pr-4 bg-white/[0.06] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-white/[0.08] transition-all" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} required
                  className="w-full h-11 pl-10 pr-4 bg-white/[0.06] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-white/[0.08] transition-all" />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Company</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input type="text" placeholder="Acme Inc." value={form.company} onChange={set('company')} required
                  className="w-full h-11 pl-10 pr-4 bg-white/[0.06] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-white/[0.08] transition-all" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input type={showPass ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password} onChange={set('password')} required
                  className="w-full h-11 pl-10 pr-11 bg-white/[0.06] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/60 focus:bg-white/[0.08] transition-all" />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-sm cursor-pointer group">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/10 accent-blue-500" />
              <span className="text-white/40 text-xs leading-relaxed">
                I agree to the <a href="#" className="text-white/65 underline underline-offset-2 hover:text-white">Terms of Service</a> and <a href="#" className="text-white/65 underline underline-offset-2 hover:text-white">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,130,246,0.22)] mt-1">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white/65 hover:text-white font-medium transition-colors">Sign in →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
