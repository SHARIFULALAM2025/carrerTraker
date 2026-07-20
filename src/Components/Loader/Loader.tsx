import { useEffect, useState } from 'react'

interface LoaderProps {
  children: React.ReactNode
}

const Loader = ({ children }: LoaderProps) => {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(time)
  }, [])

  useEffect(() => {
    if (!loading) {
      const removeTime = setTimeout(() => {
        setShow(false)
      }, 700)
      return () => clearTimeout(removeTime)
    }
  }, [loading])

  return (
    <>
      {show && (
        <div
          className={`fixed inset-0 z-[999] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4 bg-primary transition-opacity duration-700 ${
            loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative flex items-center justify-center h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full animate-spin"
              style={{ animationDuration: '1.2s' }}
            >
              {/* ট্র্যাক — হালকা, স্বচ্ছ শেড */}
              <circle
                cx={50}
                cy={50}
                r={45}
                fill="none"
                stroke="color-mix(in oklab, var(--color-primary-foreground) 25%, transparent)"
                strokeWidth={6}
              />
              {/* প্রগ্রেস আর্ক — থিমের accent রঙ */}
              <circle
                cx={50}
                cy={50}
                r={45}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={6}
                strokeDasharray="70 212"
                strokeLinecap="round"
              />
            </svg>
            <div className="relative h-9 w-9 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden flex items-center justify-center bg-primary">
              <img
                src="/navLogo.png"
                width={56}
                height={56}
                className="object-contain w-full h-full"
                alt="CareerTrack Lite logo"
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs xs:text-sm sm:text-base tracking-wide font-display text-primary-foreground/80">
            <span>Loading</span>
            <span className="flex gap-0.5">
              <span className="animate-bounce [animation-delay:-0.3s]">.</span>
              <span className="animate-bounce [animation-delay:-0.15s]">.</span>
              <span className="animate-bounce">.</span>
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  )
}

export default Loader
