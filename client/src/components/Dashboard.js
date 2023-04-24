import './Dashboard.css';
export const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <h1>Dashboard</h1>
      <div className="dashboardContainer">
        <div className="dashboardContainer_one">
          <div className="dashboardContainer_one--analytics">
            <div className="sectionHeaders">
              <div className="sectionBox orange"></div>
              <h3 className="sectionTitle">Analytics</h3>
            </div>
          </div>
          <div className="dashboardContainer_one--streams">
            <div className="sectionHeaders">
              <div className="sectionBox green"></div>
              <h3 className="sectionTitle">Stream</h3>
            </div>
          </div>
        </div>
        <div className="dashboardContainer_two">
          <div className="dashboardContainer_two--notifications">
            <div className="sectionHeaders">
              <div className="sectionBox purple"></div>
              <h3 className="sectionTitle">Notifications</h3>
            </div>
          </div>
          <div className="dashboardContainer_two--schedule">
            <div className="sectionHeaders">
              <div className="sectionBox diamond"></div>
              <h3 className="sectionTitle">Schedule</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
