import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiClient } from '../../api/client'
import {
  FaBuilding,
  FaBriefcase,
  FaLink,
  FaCalendarAlt,
  FaStickyNote,
  FaGlobe,
} from 'react-icons/fa'
import { getErrorMessage } from '../lib/getErrorMessage'
import { fireSuccessToast } from '../lib/swal'
import Loading from '../Loader/Loading'

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

const ApplicationEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApplicationFormData>()

  // Load existing data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await apiClient.get(`/applications/${id}`)
        const app = res.data.application

        setValue('companyName', app.companyName)
        setValue('jobTitle', app.jobTitle)
        setValue('jobUrl', app.jobUrl || '')
        setValue('source', app.source)
        setValue('status', app.status)
        setValue('applicationDate', app.applicationDate.split('T')[0])
        setValue('notes', app.notes || '')
      } catch (err) {
        setServerError(getErrorMessage(err, 'Failed to load application data'))
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchApplication()
  }, [id, setValue])

  const onSubmit = async (data: ApplicationFormData) => {
    setServerError(null)
    setIsSubmitting(true)

    try {
      await apiClient.put(`/applications/${id}`, data)

      fireSuccessToast('Application updated successfully!')
      navigate(`/applications/${id}`)
    } catch (err) {
      setServerError(getErrorMessage(err, 'Failed to update application'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <Loading/>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <FaBriefcase /> Edit Application
      </h2>

      {serverError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register('companyName', {
                required: 'Company name is required',
              })}
              type="text"
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register('jobTitle', { required: 'Job title is required' })}
              type="text"
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.jobTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jobTitle.message}
            </p>
          )}
        </div>

        {/* Job URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Post URL</label>
          <div className="relative">
            <FaLink className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register('jobUrl')}
              type="url"
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Application Source <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3 text-gray-400" />
            <select
              {...register('source', { required: 'Source is required' })}
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sourceOptions.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Application Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Application Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register('applicationDate', { required: 'Date is required' })}
              type="date"
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="w-full py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <div className="relative">
            <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
            <textarea
              {...register('notes')}
              rows={4}
              className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
          >
            {isSubmitting ? 'Updating...' : 'Update Application'}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ApplicationEdit
