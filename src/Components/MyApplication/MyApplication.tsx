import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { apiClient } from '../../api/client'
import Loading from '../Loader/Loading'
import { getErrorMessage } from '../lib/getErrorMessage'
import Swal from 'sweetalert2'
import { swalDangerTheme, swalTheme } from '../lib/swal'
import NotFound from '../NotFound/NotFound'

interface Application {
  id: string
  companyName: string
  jobTitle: string
  jobUrl?: string | null
  source: string
  status: string
  applicationDate: string
  notes?: string | null
}

const statusOptions = [
  'Saved',
  'Applied',
  'Assessment',
  'Interview',
  'Rejected',
  'Offer',
]
const sourceOptions = [
  'LinkedIn',
  'Bdjobs',
  'Indeed',
  'Wellfound',
  'Facebook',
  'Referral',
  'Other',
]

const MyApplication = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [sortBy, setSortBy] = useState('applicationDate')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const fetchApplications = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apiClient.get('/applications', {
        params: {
          search: search || undefined,
          status: status || undefined,
          source: source || undefined,
          sortBy,
          order,
        },
      })
      setApplications(data.applications)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load applications.'))
    } finally {
      setIsLoading(false)
    }
  }, [search, status, source, sortBy, order])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications()
    }, 400)
    return () => clearTimeout(timer)
  }, [fetchApplications])



  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      ...swalDangerTheme,
    })

    if (!result.isConfirmed) return

    try {
      await apiClient.delete(`/applications/${id}`)
      setApplications((prev) => prev.filter((app) => app.id !== id))

      Swal.fire({
        title: 'Deleted!',
        text: 'Your application has been deleted.',
        icon: 'success',
        ...swalTheme,
      })
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to delete application')
      setError(message)
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        ...swalTheme,
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Applications
        </h1>
        <Link
          to="/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <FaPlus className="text-xs" />
          Add Application
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or job title..."
            className="w-full pl-9 pr-3 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">All sources</option>
          {sourceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={`${sortBy}:${order}`}
          onChange={(e) => {
            const [field, ord] = e.target.value.split(':')
            setSortBy(field)
            setOrder(ord as 'asc' | 'desc')
          }}
          className="px-3 py-2 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="applicationDate:desc">Newest first</option>
          <option value="applicationDate:asc">Oldest first</option>
          <option value="companyName:asc">Company (A-Z)</option>
          <option value="companyName:desc">Company (Z-A)</option>
        </select>
      </div>

      {/* States */}
      {isLoading && <Loading />}

      {!isLoading && error && (
        <div className="bg-danger-soft text-danger text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      {!isLoading && !error && applications.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <NotFound />
          <Link
            to="/applications/new"
            className="text-accent font-semibold hover:underline"
          >
            Add your first application
          </Link>
        </div>
      )}

      {/* List */}
      {!isLoading && !error && applications.length > 0 && (
        <div className="flex flex-col gap-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4"
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
                <p className="text-sm text-muted truncate">{app.jobTitle}</p>
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

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/applications/${app.id}/edit`}
                  className="h-9 w-9 flex items-center justify-center rounded-md border border-border text-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label="Edit"
                >
                  <FaEdit className="text-sm" />
                </Link>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="h-9 w-9 flex items-center justify-center rounded-md border border-border text-muted hover:text-danger hover:border-danger transition-colors"
                  aria-label="Delete"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyApplication
