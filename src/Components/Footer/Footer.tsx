import { Link } from 'react-router-dom'
import { LuGithub, LuLinkedin, LuMail, LuMapPin } from 'react-icons/lu'
import { navItem } from '../Navbar/data'

const Footer = () => {
  const year = new Date().getFullYear()

    return (
      <div>
        <footer className="bg-background border-t border-border">
          <div className=" md:px-4 lg:px-6 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {/* Brand */}
              <div className="sm:col-span-2 md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-3">
                  <img
                    src="/navLogo.png"
                    alt="Site logo"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-display font-bold text-base text-foreground">
                    CareerTrack<span className="text-accent">Lite</span>
                  </span>
                </Link>
                <p className="text-sm text-muted leading-relaxed max-w-xs">
                  Save every application, track its status, and see your job
                  search progress at a glance.
                </p>
              </div>

              {/* Quick links */}
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                  Navigate
                </h3>
                <ul className="flex flex-col gap-2">
                  {navItem.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className="text-sm text-muted hover:text-accent transition-colors"
                      >
                        {item.Name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                  Account
                </h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      to="/login"
                      className="text-sm text-muted hover:text-accent transition-colors"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-sm text-muted hover:text-accent transition-colors"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact / social */}
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">
                  Contact
                </h3>
                <ul className="flex flex-col gap-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-muted">
                    <LuMail className="text-base shrink-0" />
                    <span>hello@careertracklite.app</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted">
                    <LuMapPin className="text-base shrink-0" />
                    <span>Dhaka, Bangladesh</span>
                  </li>
                </ul>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="h-9 w-9 flex items-center justify-center rounded-sm border border-border text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    <LuGithub className="text-base" />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="h-9 w-9 flex items-center justify-center rounded-sm border border-border text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    <LuLinkedin className="text-base" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted">
                © {year} CareerTrack Lite. All rights reserved.
              </p>
              {/* TODO: জমা দেওয়ার আগে আপনার নাম আর স্টুডেন্ট আইডি বসান */}
              <p className="text-xs text-muted">
                Your full name · Student ID: XXXXXXX
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
}

export default Footer
