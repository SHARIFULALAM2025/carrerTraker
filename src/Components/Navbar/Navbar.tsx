import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { navItem } from './data'
import DarkMode from '../DarkMode/DarkMode'
import { useAuth } from '../lib/useAuth'


const Navbar = () => {
  const location = useLocation()
  const pathname = location.pathname
  const { user, logout } = useAuth()
  console.log(user)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className=" px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <figure className="m-0">
            <img
              src="/navLogo.png"
              alt="Site logo"
              className="h-8 w-8 object-contain"
            />
          </figure>
          <span className="font-display font-bold text-base lg:text-lg text-foreground tracking-tight">
            CareerTrack<span className="text-accent">Lite</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItem.map((item) => {
            const isActive = pathname === item.path

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`px-2.5 xl:px-3 py-2 flex items-center gap-1 text-sm xl:text-base font-semibold transition-colors rounded-sm ${
                  isActive ? 'text-foreground' : 'text-muted hover:text-accent'
                }`}
              >
                {item.Name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <DarkMode />

          {user ? (
            <>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="hidden sm:block h-8 w-8 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="hidden sm:flex h-8 w-8 rounded-full bg-primary-soft items-center justify-center text-primary text-sm font-semibold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 bg-bg text-foreground border border-border text-xs lg:text-sm font-semibold rounded-sm shadow-sm hover:bg-danger-soft hover:border-danger hover:text-danger transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
              >
                <span>Log out</span>
                <LuLogOut className="text-base stroke-[2.5]" />
              </button>
            </>
          ) : (
            <Link
              to="/auth/register"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 bg-bg text-foreground border border-border text-xs lg:text-sm font-semibold rounded-sm shadow-sm hover:bg-primary-soft hover:border-primary transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
            >
              <span>Sign in</span>
              <LuLogIn className="text-base stroke-[2.5]" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
