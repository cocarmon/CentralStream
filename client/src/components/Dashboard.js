import Pie from './PieChart';
import BarChart from './BarChart';
import {
  BarChartIcon,
  AbstractIcon,
  LineIcon,
  ProgressIcon,
} from '../assets/icons/icon';
import LineChart from './LineChart';
import './Dashboard.css';
import 'chart.js/auto';

export const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <h1>Dashboard</h1>
      <div className="dashboardContainer">
        <div className="boxContainer">
          <div className="dashboard_box total_views">
            <p className="box_title">Total Views</p>
            <div className="boxChild--grouping">
              <h1 className="box_data">394,132</h1>
              <img className="box_icon" src={BarChartIcon}></img>
            </div>
          </div>
          <div className="dashboard_box total_hours">
            <p className="box_title">Total Hours Streamed</p>
            <div className="boxChild--grouping">
              <h1 className="box_data">132</h1>
              <img className="box_icon" src={AbstractIcon}></img>
            </div>
          </div>
          <div className="dashboard_box total_streams">
            <p className="box_title">Number of Streams</p>
            <div className="boxChild--grouping">
              <h1 className="box_data">32</h1>
              <img className="box_icon" src={LineIcon}></img>
            </div>
          </div>
          <div className="dashboard_box total_subscribers">
            <p className="box_title">Top Country</p>
            <div className="boxChild--grouping">
              <h1 className="box_data">1,100</h1>
              <img className="box_icon" src={ProgressIcon}></img>
            </div>
          </div>
        </div>
        <div className="dashboardContainer_two--notifications">
          <p className="box_title">Notifications</p>

          <ul className="notification-events">
            <li className="deletable">
              Your live stream has started successfully.
            </li>
            <li className="deletable">
              The recording is now available on your account for future viewing.
            </li>
          </ul>
        </div>
        <div className="dashboardContainer--recordedStreams">
          <div className="recordedStreams--attributes">
            <p className="box_title">Recorded Streams</p>
            <input type="search" placeholder="Search" />
          </div>
        </div>

        <div className="dashboardContainer_two--schedule">
          <p className="box_title">Schedule</p>
        </div>
        <div className="dashboardContainer_two--data">
          <p className="box_title">Data</p>
        </div>
      </div>
    </div>
  );
};
