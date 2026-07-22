import { useForm } from 'react-hook-form'
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../lib/useAuth'
import { CgProfile } from 'react-icons/cg'
import { uploadImage } from '../lib/UploadIamge'
import { getErrorMessage } from '../lib/getErrorMessage'
import { fireSuccessToast } from '../lib/swal'

interface RegisterFormData {
  name: string
  email: string
  password: string
  image: FileList
  confirmPassword: string
}

const Register = () => {
  const [eye, openEye] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const handelEye = () => openEye(!eye)

  const handleSignup = async (data: RegisterFormData) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      const imageUrl = data.image[0]
      const image = await uploadImage(imageUrl)

      await registerUser(data.name, data.email, data.password, image)
      fireSuccessToast('Register successfully')
      navigate('/dashboard')
    } catch (err) {
      setServerError(
        getErrorMessage(err, 'Registration failed. Please try again.')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-background min-h-screen px-4 py-10">
      {/* Logo Header */}
      <div className="grid justify-center space-y-2 mb-6">
        <Link to="/" className="flex items-center gap-2 justify-center">
          <figure className="w-8 h-8 md:w-10 md:h-10 relative">
            <img
              src="/navLogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </figure>
          <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            CareerTrack<span className="text-accent">Lite</span>
          </h1>
        </Link>
        <h2 className="font-display text-xl md:text-2xl text-center lg:text-3xl font-bold text-foreground">
          Create your account
        </h2>
      </div>

      <div className="relative w-full max-w-xl mx-auto shadow-2xl transition-all duration-300 bg-card/95 p-8 border border-border backdrop-blur-md rounded-lg">
        {serverError && (
          <div className="bg-danger-soft text-danger text-sm rounded-md px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-4 md:space-y-6"
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Enter Name"
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            {errors.name && (
              <span className="text-danger text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Email <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('email', {
                  required: 'Email is required!',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            {errors.email && (
              <span className="text-danger text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Password <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  {...register('password', {
                    required: 'Password is required!',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={eye ? 'text' : 'password'}
                  placeholder="Password..."
                  className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
                <div
                  onClick={handelEye}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.password && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required!',
                    validate: (value) =>
                      value === getValues('password') ||
                      'Passwords do not match',
                  })}
                  type={eye ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
                <div
                  onClick={handelEye}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.confirmPassword && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Profile <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <CgProfile className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('image', {
                  required: 'Profile image is required!',
                })}
                type="file"
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:opacity-90"
              />
            </div>
            {errors.image && (
              <span className="text-danger text-xs mt-1 block">
                {errors.image.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-primary hover:opacity-90 active:opacity-80 text-primary-foreground text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-foreground mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-accent font-bold cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
