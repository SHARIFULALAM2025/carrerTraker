import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-indigo-700 to-accent text-primary-foreground relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:40px_40px] opacity-40"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight mb-6 tracking-tight">
          Track Your Career.
          <br />
          <span className="text-accent">Achieve Your Dreams.</span>
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          The smartest way to organize, track, and land your dream job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth/register"
            className="px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 active:scale-95 transition text-lg shadow-md"
          >
            Get Started Free
          </Link>
          <Link
            to="#features"
            className="px-10 py-4 border-2 border-white font-semibold rounded-xl hover:bg-white/10 transition text-lg"
          >
            Learn More
          </Link>
        </div>

        <p className="mt-10 text-sm text-primary-foreground/70 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Trusted by 500+ job seekers
        </p>
      </div>
    </section>
  )
}

export default Hero
