import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import {
  FaBuilding,
  FaBriefcase,
  FaLink,
  FaCalendarAlt,
  FaStickyNote,
  FaGlobe,
  FaArrowLeft,
} from 'react-icons/fa'
import { apiClient } from '../../api/client'
import { getErrorMessage } from '../lib/getErrorMessage'
import { fireSuccessToast } from '../lib/swal'

interface ApplicationFormData {
  companyName: string
  jobTitle: string
  jobUrl?: string
  source: string
  applicationDate: string
  status: string
  notes?: string
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

const AddApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    defaultValues: { status: 'Saved' },
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      await apiClient.post('/applications', data)
      fireSuccessToast('Application added successfully!')
      reset()
      navigate('/myApplication')
    } catch (err) {
      setServerError(getErrorMessage(err, 'Failed to add application'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        to="/myApplication"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-4 transition-colors"
      >
        <FaArrowLeft className="text-xs" /> Back to applications
      </Link>

      <div className="bg-card border border-border rounded-lg shadow-md p-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <FaBriefcase /> Add New Application
        </h2>

        {serverError && (
          <div className="bg-danger-soft text-danger text-sm rounded-md px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Company Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('companyName', {
                  required: 'Company name is required',
                })}
                type="text"
                className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g. Google"
              />
            </div>
            {errors.companyName && (
              <p className="text-danger text-xs mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Job Title <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('jobTitle', { required: 'Job title is required' })}
                type="text"
                className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g. Software Engineer"
              />
            </div>
            {errors.jobTitle && (
              <p className="text-danger text-xs mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Job Post URL
            </label>
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('jobUrl')}
                type="url"
                className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Source + Status side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Application Source <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <select
                  {...register('source', { required: 'Source is required' })}
                  className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select source
                  </option>
                  {sourceOptions.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>
              {errors.source && (
                <p className="text-danger text-xs mt-1">
                  {errors.source.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Status <span className="text-danger">*</span>
              </label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full border border-border bg-transparent text-foreground px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Application Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Application Date <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('applicationDate', {
                  required: 'Date is required',
                })}
                type="date"
                className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            {errors.applicationDate && (
              <p className="text-danger text-xs mt-1">
                {errors.applicationDate.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Notes
            </label>
            <div className="relative">
              <FaStickyNote className="absolute left-3 top-3 text-muted" />
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full border border-border bg-transparent text-foreground pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Additional notes..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Application...' : 'Add Application'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddApplication
