import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

// Pages
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard    from './pages/Dashboard'
import LeadsPage    from './pages/LeadsPage'
import AutomationsPage  from './pages/AutomationsPage'
import WorkflowBuilder  from './pages/WorkflowBuilder'
import IntegrationsPage from './pages/IntegrationsPage'
import AnalyticsPage    from './pages/AnalyticsPage'
import SettingsPage     from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
import APIKeysPage   from './pages/APIKeysPage'
import ContactsPage  from './pages/ContactsPage'
import CompaniesPage from './pages/CompaniesPage'
import ReportsPage   from './pages/ReportsPage'

// Layout
import DashboardLayout from './components/layout/DashboardLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
})

const isAuthenticated = () => localStorage.getItem('authToken') !== null

const ProtectedRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* ── Public ───────────────────────────────── */}
          {/* Root always goes to login */}
          <Route path="/"          element={<Navigate to="/login" replace />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />

          {/* ── Protected Dashboard ──────────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index                         element={<Dashboard />} />
            <Route path="leads"                  element={<LeadsPage />} />
            <Route path="automations"            element={<AutomationsPage />} />
            <Route path="automations/builder/:id?" element={<WorkflowBuilder />} />
            <Route path="integrations"           element={<IntegrationsPage />} />
            <Route path="analytics"              element={<AnalyticsPage />} />
            <Route path="contacts"               element={<ContactsPage />} />
            <Route path="companies"              element={<CompaniesPage />} />
            <Route path="reports"                element={<ReportsPage />} />
            <Route path="notifications"          element={<NotificationsPage />} />
            <Route path="api-keys"               element={<APIKeysPage />} />
            <Route path="settings"               element={<SettingsPage />} />
          </Route>

          {/* ── Catch-all ────────────────────────────── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            background: '#1a1a2e',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
