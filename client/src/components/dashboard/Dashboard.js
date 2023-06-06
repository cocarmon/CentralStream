import LineChart from './LineChart';
import { Schedule } from './Calendar';
import 'chart.js/auto';

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <h1 className="text-move-left text-white">Dashboard</h1>
      <div className="row">
        <div className="card border-0 col-3 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Total Views</p>
              <h3 className="card-text">394,132</h3>
            </div>
            <i
              className="bi bi-bar-chart-fill align-self-end "
              style={{ fontSize: '46px', color: '#03A9F4' }}
            ></i>
          </div>
        </div>
        <div className="card border-0 col-3 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Total Hours</p>
              <h3 className="card-text">168</h3>
            </div>
            <i
              className="bi bi-clock-history align-self-end "
              style={{ fontSize: '46px', color: '#03A9F4' }}
            ></i>
          </div>
        </div>
        <div className="card border-0 col-3 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Stream Count</p>
              <h3 className="card-text">132</h3>
            </div>
            <i
              className="bi bi-check-square align-self-end "
              style={{ fontSize: '46px', color: '#03A9F4' }}
            ></i>
          </div>
        </div>
        <div className="card border-0 col-3 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Total Country</p>
              <h3 className="card-text">USA</h3>
            </div>
            <i
              className="bi bi-globe-americas align-self-end "
              style={{ fontSize: '46px', color: '#03A9F4' }}
            ></i>
          </div>
        </div>
      </div>
      <div className="row my-4 d-flex">
        <div className="card border-0 col-8 custom-min-height custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Recorded Streams</p>
            </div>
          </div>
        </div>
        <div className="card border-0 col-4 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Notifications</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="card border-0 col-8 custom-min-height custom-card ">
          <div className="card-body text-white card-background-color rounded-3 d-flex">
            <p className="card-title ">Viewership</p>
            <div className="col-8">
              <LineChart />
            </div>
          </div>
        </div>
        <div className="card border-0 col-4 custom-card">
          <div className="card-body text-white card-background-color rounded-3 d-flex justify-content-between">
            <div className="text-move-left ">
              <p className="card-title">Schedule</p>
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
