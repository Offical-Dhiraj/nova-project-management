import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            OVERVIEW
          </span>

          <h1>
            Good morning, {user?.name?.split(" ")[0]}
          </h1>

          <p>
            Here's what's happening with your
            workspace today.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Projects</span>
          <strong>0</strong>
          <small>Active workspace projects</small>
        </div>

        <div className="stat-card">
          <span>Tasks</span>
          <strong>0</strong>
          <small>Tasks across your projects</small>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>0%</strong>
          <small>Overall completion</small>
        </div>

        <div className="stat-card">
          <span>Members</span>
          <strong>1</strong>
          <small>Workspace members</small>
        </div>
      </div>

      <div className="dashboard-placeholder">
        <h2>Workspace overview</h2>

        <p>
          Your project activity will appear here.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;