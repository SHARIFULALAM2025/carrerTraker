import { useForm } from 'react-hook-form'
import { FaEnvelope, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../lib/useAuth'
import { fireSuccessToast } from '../lib/swal'

interface LoginFormData {
  email: string
  password: string
}

const Login = () => {
  const [eye, openEye] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handelEye = () => openEye(!eye)

  const handleLogin = async (data: LoginFormData) => {
    setServerError(null)
    setIsSubmitting(true)

    try {
      await login(data.email, data.password)
      navigate('/dashboard')
      fireSuccessToast("Login successfully!")
    } catch (err: unknown) {
      let errorMessage = 'Login failed. Please try again.'

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'object' && err !== null) {
        const apiError = err as { response?: { data?: { error?: string } } }
        errorMessage = apiError.response?.data?.error || errorMessage
      }

      setServerError(errorMessage)
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
          Sign in to your account
        </h2>
      </div>

      <div className="relative w-full max-w-xl mx-auto shadow-2xl transition-all duration-300 bg-card/95 p-8 border border-border backdrop-blur-md rounded-lg">
        {serverError && (
          <div className="bg-danger-soft text-danger text-sm rounded-md px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 md:space-y-6"
        >
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

          {/* Password Field */}
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
                placeholder="Enter your password"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-primary hover:opacity-90 active:opacity-80 text-primary-foreground text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-foreground mt-6">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-accent font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
