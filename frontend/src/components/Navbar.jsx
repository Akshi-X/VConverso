import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookLogo } from '../components/Logo';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Hide global navbar on onboarding and auth routes
  const hiddenRoutes = ['/', '/login', '/register', '/select-language', '/dashboard', '/languages'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top py-3">
      <div className="container">
        {/* Brand logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to={user ? "/dashboard" : "/login"}>
          <BookLogo className="tw-w-14 tw-h-14 me-2" />
          <span className="fw-bold" style={{ color: 'var(--color-brown-dark)' }}>VConverso</span>
        </Link>

        {/* Hamburger Toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/languages">
                    <i className="bi bi-journal-bookmark me-1"></i> Languages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/profile">
                    <i className="bi bi-person me-1"></i> Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User Session Interface */}
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="d-none d-md-inline-block" style={{ color: 'var(--text-prim)' }}>
                  <i className="bi bi-person-circle me-2" style={{ color: 'var(--color-brown-med)' }}></i>
                  Hi, <span className="fw-semibold">{user.name}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm border-0 d-flex align-items-center gap-1 py-2 px-3 rounded-3"
                  style={{ background: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-link text-white text-decoration-none px-3">Login</Link>
                <Link to="/register" className="btn btn-premium-primary py-2 px-3">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
