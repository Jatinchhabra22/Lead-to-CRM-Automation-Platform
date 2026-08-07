import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Rocket, Mail, Lock, Github, Eye, EyeOff,
  ArrowRight, Zap, Database, BarChart3, Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

const features = [
  {
    icon: Zap,
    title: 'Instant Automation',
    desc: 'Workflows trigger the moment a lead arrives — no delays.',
  },
  {
    icon: Database,
    title: 'Multi-CRM Sync',
    desc: 'Push to HubSpot, Salesforce, Zoho, and Sheets simultaneously.',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    desc: 'Real-time dashboards for conversion rates and pipeline health.',
  },
]

// ─── Demo credentials shown to user ────────────────────────────────
const DEMO_EMAIL    = 'demo@leadtocrm.io'
const DEMO_PASSWORD = 'demo1234'

export default function LoginPage() {
  const navigate   = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [demoFill, setDemoFill] = useState(false)   // highlight on autofill

  // ── Normal sign in ──────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('authToken', 'demo-token-12345')
      localStorage.setItem('userName', 'John Smith')
      toast.success('Signed in successfully!')
      navigate('/dashboard')
    }, 900)
  }

  // ── Demo login — fills fields visually then signs in ───────────
  const handleDemoLogin = async () => {
    setDemoLoading(true)
    setDemoFill(true)

    // Animate credential fill one char at a time
    let e = ''
    for (const ch of DEMO_EMAIL) {
      e += ch
      setEmail(e)
      await new Promise(r => setTimeout(r, 28))
    }
    let p = ''
    for (const ch of DEMO_PASSWORD) {
      p += ch
      setPassword(p)
      await new Promise(r => setTimeout(r, 38))
    }

    await new Promise(r => setTimeout(r, 400))
    localStorage.setItem('authToken', 'demo-token-12345')
    localStorage.setItem('userName', 'Demo User')
    toast.success('🎉 Welcome! You are viewing the demo workspace.')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">

      {/* ───────────────── Left Panel ───────────────────── */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden">

        {/* Grid backdrop */}
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

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-500/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">Lead-to-CRM</span>
          </div>

          {/* Hero */}
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/60 font-medium">All systems operational</span>
            </div>
            <h1 className="text-[2.6rem] font-bold text-white leading-[1.15] tracking-tight mb-5">
              The CRM automation<br />platform built for scale.
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              Capture, qualify, and route leads to every tool your team relies on — automatically, in real time.
            </p>
          </div>

          {/* Features */}
          <div className="mt-10 space-y-3.5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{f.title}</p>
                  <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            <p className="text-sm text-white/70 leading-relaxed italic">
              "Saved our team 10+ hours a week. Leads hit our CRM before we even notice."
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">JS</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/80">John Smith</p>
                <p className="text-[10px] text-white/40">VP Sales · TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── Right Panel ──────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#0f0f17] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-[380px]"
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
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h2>
            <p className="text-sm text-white/45">Sign in to your workspace</p>
          </div>

          {/* ── DEMO LOGIN BANNER ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
            className="mb-6 relative overflow-hidden rounded-xl border border-blue-500/25 bg-blue-600/8 p-4"
          >
            {/* subtle shimmer line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Try the live demo</p>
                <p className="text-xs text-white/45 mt-0.5">
                  Explore all features with 500 pre-loaded leads, automations, and CRM data.
                </p>
              </div>
            </div>

            {/* Credential preview */}
            <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-white/35 w-16">Email</span>
                  <code className="text-blue-300/80 font-mono text-[11px]">{DEMO_EMAIL}</code>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-white/35 w-16">Password</span>
                  <code className="text-blue-300/80 font-mono text-[11px]">{DEMO_PASSWORD}</code>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={demoLoading}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-200 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {demoLoading ? (
                <span className="flex items-center gap-2 text-blue-300">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Loading demo…
                </span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Enter Demo — No sign up needed
                </>
              )}
            </button>
          </motion.div>

          {/* Social OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-5">
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
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#0f0f17] text-xs text-white/30 font-medium">or sign in with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className={`w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white placeholder:text-white/25 outline-none transition-all border ${
                    demoFill && email
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-200'
                      : 'bg-white/[0.06] border-white/10 focus:border-blue-500/60 focus:bg-white/[0.08]'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className={`w-full h-11 pl-10 pr-11 rounded-lg text-sm text-white placeholder:text-white/25 outline-none transition-all border ${
                    demoFill && password
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-200'
                      : 'bg-white/[0.06] border-white/10 focus:border-blue-500/60 focus:bg-white/[0.08]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || demoLoading}
              className="w-full h-11 mt-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,130,246,0.25)]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Footer links */}
          <p className="text-center text-sm text-white/30 mt-6">
            No account?{' '}
            <Link to="/register" className="text-white/65 hover:text-white font-medium transition-colors">
              Create one free →
            </Link>
          </p>

          <p className="text-center text-[11px] text-white/20 mt-6">
            By signing in you agree to our{' '}
            <a href="#" className="underline underline-offset-2 hover:text-white/40">Terms</a> &amp;{' '}
            <a href="#" className="underline underline-offset-2 hover:text-white/40">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
