import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuLogIn, LuLogOut, LuMenu, LuX } from 'react-icons/lu'
import { navItem } from './data'
import DarkMode from '../DarkMode/DarkMode'
import { useAuth } from '../lib/useAuth'

const Navbar = () => {
  const location = useLocation()
  const pathname = location.pathname
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={closeMenu}
        >
          <figure className="m-0">
            <img
              src="/navLogo.png"
              alt="Site logo"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            />
          </figure>
          <span className="font-display font-bold text-sm sm:text-base lg:text-lg text-foreground tracking-tight">
            CareerTrack<span className="text-accent">Lite</span>
          </span>
        </Link>

        {/* ---------- Desktop nav links ---------- */}
        <div className="hidden md:flex items-center gap-1">
          {navItem.map((item) => {
            const isActive = pathname === item.path
            const destination =
              item.protected && !user ? '/auth/register' : item.path
            return (
              <Link
                key={item.id}
                to={destination}
                className={`px-2.5 xl:px-3 py-2 flex items-center gap-1 text-sm xl:text-base font-semibold transition-colors rounded-sm ${
                  isActive ? 'text-foreground' : 'text-muted hover:text-accent'
                }`}
              >
                {item.Name}
              </Link>
            )
          })}
        </div>

        {/* ---------- Desktop right side (auth + dark mode) ---------- */}
        <div className="hidden sm:flex items-center gap-3">
          <DarkMode />

          {user ? (
            <>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-soft flex items-center justify-center text-primary text-sm font-semibold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 bg-background text-foreground border border-border text-xs lg:text-sm font-semibold rounded-sm shadow-sm hover:bg-danger-soft hover:border-danger hover:text-danger transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
              >
                <span>Log out</span>
                <LuLogOut className="text-base stroke-[2.5]" />
              </button>
            </>
          ) : (
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 bg-background text-foreground border border-border text-xs lg:text-sm font-semibold rounded-sm shadow-sm hover:bg-primary-soft hover:border-primary transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
            >
              <span>Sign in</span>
              <LuLogIn className="text-base stroke-[2.5]" />
            </Link>
          )}
        </div>

        {/* ---------- Mobile: dark mode + hamburger toggle ---------- */}
        <div className="flex sm:hidden items-center gap-2">
          <DarkMode />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="h-9 w-9 flex items-center justify-center rounded-sm border border-border text-foreground"
          >
            {isMenuOpen ? (
              <LuX className="text-lg" />
            ) : (
              <LuMenu className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* ---------- Mobile dropdown panel ---------- */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-1">
          {navItem.map((item) => {
            const isActive = pathname === item.path
            const destination =
              item.protected && !user ? '/auth/register' : item.path
            return (
              <Link
                key={item.id}
                to={destination}
                onClick={closeMenu}
                className={`px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-foreground bg-primary-soft'
                    : 'text-muted hover:text-accent'
                }`}
              >
                {item.Name}
              </Link>
            )
          })}

          <div className="border-t border-border mt-2 pt-3">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-soft flex items-center justify-center text-primary text-sm font-semibold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border text-danger text-xs font-semibold rounded-sm"
                >
                  Log out
                  <LuLogOut className="text-sm" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth/register"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm"
              >
                Sign in
                <LuLogIn className="text-sm" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
