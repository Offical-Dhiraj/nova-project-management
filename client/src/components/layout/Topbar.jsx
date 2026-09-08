import useAuth from "../../hooks/useAuth";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="app-topbar">
      <div className="topbar-title">
        <span>Workspace</span>
      </div>

      <div className="topbar-actions">
        <button className="notification-button" type="button">
          ♢
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="topbar-user-info">
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;