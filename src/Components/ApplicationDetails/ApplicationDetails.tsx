import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa'
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
  jobUrl?: string
  source: string
  status: string
  applicationDate: string
  notes?: string
}

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await apiClient.get(`/applications/${id}`)
        setApplication(res.data.application)
      } catch (err) {
        setError(
          getErrorMessage(
            err,
            'Application not found or you are not authorized.'
          )
        )
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchApplication()
  }, [id])

  const handleDelete = async (applicationId: string) => {
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
      await apiClient.delete(`/applications/${applicationId}`)

      await Swal.fire({
        title: 'Deleted!',
        text: 'Your application has been deleted.',
        icon: 'success',
        ...swalTheme,
      })
      navigate('/')
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

  if (loading) return <Loading />
  if (error) return <div className="text-danger text-center py-10">{error}</div>
  if (!application)
    return <NotFound/>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary mb-6 hover:underline"
      >
        <FaArrowLeft /> Back to Applications
      </button>

      <div className="bg-card rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {application.jobTitle}
            </h1>
            <p className="text-xl text-muted mt-1">{application.companyName}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/applications/${id}/edit`}
              className="p-3 bg-primary-soft text-primary rounded-lg hover:opacity-80 transition-opacity"
            >
              <FaEdit />
            </Link>
            <button
              onClick={() => handleDelete(application.id)}
              className="p-3 bg-danger-soft text-danger rounded-lg hover:opacity-80 transition-opacity"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted">Status</p>
            <p className="font-semibold text-lg text-foreground">
              {application.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Application Date</p>
            <p className="font-semibold text-foreground">
              {new Date(application.applicationDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Source</p>
            <p className="font-semibold text-foreground">
              {application.source}
            </p>
          </div>
          {application.jobUrl && (
            <div>
              <p className="text-sm text-muted">Job Post</p>
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Job Post →
              </a>
            </div>
          )}
        </div>

        {application.notes && (
          <div className="mt-8">
            <p className="text-sm text-muted">Notes</p>
            <p className="mt-2 whitespace-pre-wrap bg-background p-4 text-foreground rounded-lg">
              {application.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationDetails
