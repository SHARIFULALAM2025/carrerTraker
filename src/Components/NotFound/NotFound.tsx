import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="notfound-shell">
      <div className="notfound-blob notfound-blob--primary" />
      <div className="notfound-blob notfound-blob--accent" />

      <div className="notfound-content">
        <p className="notfound-code">404</p>

        <div className="notfound-divider">
          <span className="notfound-divider-line" />
          <span className="notfound-eyebrow">CareerTrack Lite</span>
          <span className="notfound-divider-line" />
        </div>

        <h1 className="notfound-heading">Page not found</h1>
        <p className="notfound-desc">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Head back to your dashboard or the homepage to keep tracking
          your job applications.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            Go to Homepage
          </Link>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
