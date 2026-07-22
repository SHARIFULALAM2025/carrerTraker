import { Link, useNavigate } from 'react-router-dom'

interface NotFoundProps {
  title?: string
  description?: string
  showGoBack?: boolean
}

const NotFound = ({
  title = 'Data not found',
  description = "We couldn't find what you were looking for. It may have been removed, or you might not have access to it.",
  showGoBack = true,
}: NotFoundProps) => {
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

        <h1 className="notfound-heading">{title}</h1>
        <p className="notfound-desc">{description}</p>

        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            Go to Homepage
          </Link>
          {showGoBack && (
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotFound
