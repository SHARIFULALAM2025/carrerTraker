import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaExternalLinkAlt } from 'react-icons/fa'

import { useAuth } from '../lib/useAuth'
import { apiClient } from '../../api/client'
import Loading from '../Loader/Loading'
import { getErrorMessage } from '../lib/getErrorMessage'
import NotFound from '../NotFound/NotFound'

interface Application {
  id: string
  companyName: string
  jobTitle: string
  jobUrl?: string | null
  source: string
  status: string
  applicationDate: string
}

interface DashboardData {
  total: number
  statusCounts: Record<string, number>
  recent: Application[]
}

const statCardOrder: { key: string; label: string }[] = [
  { key: 'total', label: 'Total' },
  { key: 'Saved', label: 'Saved' },
  { key: 'Applied', label: 'Applied' },
  { key: 'Assessment', label: 'Assessment' },
  { key: 'Interview', label: 'Interview' },
  { key: 'Rejected', label: 'Rejected' },
  { key: 'Offer', label: 'Offer' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await apiClient.get<DashboardData>('/dashboard/stats')
        setData(data)
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load dashboard.'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-muted text-sm mt-1">
            Here's how your job search is going.
          </p>
        </div>
        <Link
          to="/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <FaPlus className="text-xs" />
          Add Application
        </Link>
      </div>

      {isLoading && <Loading />}

      {!isLoading && error && (
        <div className="bg-danger-soft text-danger text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {statCardOrder.map(({ key, label }) => (
              <div key={key} className="card text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {key === 'total' ? data.total : (data.statusCounts[key] ?? 0)}
                </p>
                <p className="text-xs text-muted mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Recent applications */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-lg text-foreground">
              Recent Applications
            </h2>
            <Link
              to="/applications"
              className="text-sm text-accent font-semibold hover:underline"
            >
              View all
            </Link>
          </div>

          {data.recent.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-lg">
              <NotFound />
              <Link
                to="/applications/new"
                className="text-accent font-semibold hover:underline"
              >
                Add your first application
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.recent.map((app) => (
                <div
                  key={app.id}
                  className="card flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {app.companyName}
                      </h3>
                      <span className="badge" data-status={app.status}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted truncate">
                      {app.jobTitle}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                      <span>
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{app.source}</span>
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-accent hover:underline"
                        >
                          <FaExternalLinkAlt className="text-[10px]" /> Job post
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}