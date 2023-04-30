import Pie from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import './Dashboard.css';
import 'chart.js/auto';

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
            <div className="dashboardContainer_one--charts">
              <div className="analytics-piechart">
                <Pie />
              </div>
              <div className="analytics-barchart">
                <BarChart />
              </div>
              <div className="analytics-linechart">
                <LineChart />
              </div>
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

            <ul className="notification-events">
              <li className="deletable">
                Your live stream has started successfully.
              </li>
              <li className="deletable">
                The recording is now available on your account for future
                viewing.
              </li>
              <li className="deletable">
                Your live stream has been flagged for inappropriate content.
              </li>
              <li className="deletable">
                Congratulations! Your live stream has reached over 10,000
                viewers.
              </li>
              <li className="deletable">
                Your live stream was interrupted due to network connectivity
                issues.
              </li>
              <li className="deletable">
                Your live stream has been scheduled for next week.
              </li>
              <li className="deletable">
                Your live stream has been shared on social media and is now
                trending.
              </li>
              <li className="deletable">
                Please confirm the details and make any necessary changes before
                going live.
              </li>
              <li className="deletable">
                Your live stream has been flagged for inappropriate content.
              </li>
              <li className="deletable">
                Please review our community guidelines to avoid further
                violations.
              </li>
            </ul>
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
