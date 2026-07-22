import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { apiClient } from '../../api/client'
import Loading from '../Loader/Loading'
import type { Application } from '../Type/Application'
import { getErrorMessage } from '../lib/getErrorMessage'
import NotFound from '../NotFound/NotFound'

const ApplicationsList = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiClient.get('/applications')
        setApplications(res.data.applications)
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load applications.'))
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) return <Loading />
  if (error) return <div className="text-danger text-center py-10">{error}</div>


  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <NotFound />
        <Link
          to="/applications/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Add your first application
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app) => (
        <Link
          to={`/applications/${app.id}`}
          key={app.id}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="font-semibold text-lg text-foreground">
            {app.jobTitle}
          </h3>
          <p className="text-muted mt-1">{app.companyName}</p>

          <div className="mt-4 flex justify-between items-center">
            <span className="badge" data-status={app.status}>
              {app.status}
            </span>
            <span className="text-sm text-muted">
              {new Date(app.applicationDate).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ApplicationsList
