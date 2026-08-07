import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, CheckCircle, Zap, Database, Mail, MessageSquare,
  BarChart3, Shield, Target, Webhook, Rocket, Star
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const features = [
  { icon: Webhook, title: 'Lead Capture', description: 'Automatically capture leads from forms, websites, APIs, and webhooks in real-time' },
  { icon: Database, title: 'CRM Sync', description: 'Instantly sync to HubSpot, Salesforce, Zoho, Pipedrive, and more' },
  { icon: Mail, title: 'Email Automation', description: 'Send personalized welcome emails and follow-ups automatically' },
  { icon: MessageSquare, title: 'Slack Alerts', description: 'Notify your team instantly on Slack, Discord, or Microsoft Teams' },
  { icon: Zap, title: 'Workflow Engine', description: 'Build custom automation workflows with our visual builder' },
  { icon: BarChart3, title: 'Analytics', description: 'Track conversions, lead sources, and team performance' },
  { icon: Target, title: 'Lead Scoring', description: 'AI-powered lead qualification and scoring' },
  { icon: Shield, title: 'Spam Detection', description: 'Automatically filter out spam and invalid leads' },
]



const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams',
    features: ['500 leads/month', '2 team members', 'Basic integrations', 'Email support', '5 automations'],
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For growing businesses',
    features: ['5,000 leads/month', '10 team members', 'All integrations', 'Priority support', 'Unlimited automations', 'Advanced analytics', 'API access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For large organizations',
    features: ['Unlimited leads', 'Unlimited team members', 'Custom integrations', '24/7 dedicated support', 'Unlimited automations', 'Custom analytics', 'Full API access', 'SLA guarantee'],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Lead-to-CRM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/register"><Button>Start Free</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold mb-6">
              <Star className="w-3 h-3 fill-current" />
              <span>Trusted by 25+ companies</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Capture Every Lead.
              <br />
              <span className="gradient-text">Never Miss an Opportunity.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Automatically collect, qualify, sync and notify your entire team the moment a lead arrives.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2 shadow-xl shadow-indigo-500/30">
                  Start Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">Book Demo</Button>
            </div>
          </motion.div>

          {/* Workflow Visualization */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16">
            <Card className="glass max-w-4xl mx-auto p-8 border-gray-200 dark:border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                {[
                  { icon: Webhook, label: 'Form', color: 'blue' },
                  { icon: Shield, label: 'Validate', color: 'purple' },
                  { icon: Database, label: 'CRM', color: 'green' },
                  { icon: MessageSquare, label: 'Slack', color: 'orange' },
                  { icon: Mail, label: 'Email', color: 'pink' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 bg-${step.color}-100 dark:bg-${step.color}-950 rounded-full flex items-center justify-center shadow-md`}>
                        <step.icon className={`w-6 h-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{step.label}</span>
                    </div>
                    {i < 4 && <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 rotate-90 md:rotate-0" />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Everything You Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Powerful automation features to grow your business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Choose the plan that fits your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-indigo-500 border-2 shadow-2xl shadow-indigo-500/20 scale-105' : 'border-gray-200 dark:border-gray-800'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">{plan.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6" variant={plan.popular ? 'default' : 'outline'}>Get Started</Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Lead-to-CRM</span>
              </div>
              <p className="text-sm text-gray-400">Automate your lead capture and CRM workflow.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 Lead-to-CRM Automation Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
