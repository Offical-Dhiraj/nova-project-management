import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <Link to="/" className="nova-logo">
            <span className="nova-logo-mark">N</span>
            NOVA
          </Link>

          <div className="brand-message">
            <span className="eyebrow">TEAM PRODUCTIVITY</span>

            <h2>
              Plan better.
              <br />
              Collaborate smarter.
              <br />
              <span>Deliver faster.</span>
            </h2>

            <p>
              Bring your projects, tasks, and team collaboration
              together in one focused workspace.
            </p>
          </div>

          <div className="brand-footer">
            <span>Plan. Collaborate. Deliver.</span>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="mobile-logo">
            <Link to="/" className="nova-logo">
              <span className="nova-logo-mark">N</span>
              NOVA
            </Link>
          </div>

          <div className="auth-heading">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;