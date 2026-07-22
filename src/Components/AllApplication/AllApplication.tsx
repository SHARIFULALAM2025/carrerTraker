import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiClient } from '../../api/client'
import Loading from '../Loader/Loading'
import type { Application } from '../Type/Application'
import { getErrorMessage } from '../lib/getErrorMessage'


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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app) => (
        <Link
          to={`/applications/${app.id}`}
          key={app.id}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
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

      {applications.length === 0 && (
        <p className="text-center text-muted col-span-full py-10">
          No applications yet. Add your first one!
        </p>
      )}
    </div>
  )
}

export default ApplicationsList
