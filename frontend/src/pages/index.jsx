import Sidebar from "../components/Sidebar"; 


// icons (importing them ensures bundling works in React)
import bellIcon from "../materials/bell.svg";
import calendarIcon from "../materials/calender.svg";
import search from "../materials/search icon.svg";

export default function index() {
  return (
    <div className="board">
      {/* Sidebar */}
      <Sidebar />

      <div className="main-content">
        {/* Top search/user bar */}
        <div className="search">
          <div className="pfp"></div>

          <div className="userinfo">
            <div className="welcome">Welcome **user**</div>
            <div className="role">**my role**</div>
          </div>

          <div className="utility">
            <div className="searcharea">
              <button className="search-button" title="Search">
                <img src={search} alt="search" />
              </button>
              <input placeholder="Search..." />
            </div>
            <button className="uti">
              <img src={bellIcon} alt="notification" />
            </button>
            <button className="uti">
              <img src={calendarIcon} alt="calendar" />
            </button>
          </div>
        </div>  

        {/* Dashboard layout */}
        <div className="dashboard">
          {/* Main content */}
          <main className="dashboard-main">
            {/* Top stats row */}
            <section className="dashboard-top-stats">
              <div 
                className="dashboard-stat-box" 
                onClick={() => (window.location.href = "manage-events.html")}
              >
                Events
              </div>
              <div className="dashboard-stat-box">Bookings</div>
              <div className="dashboard-stat-box">Revenue</div>
            </section>

            {/* Middle row */}
            <section className="dashboard-charts">
              <div className="dashboard-card dashboard-net-sales" style={{ height: "200px" }}>
                Net Sales Chart
              </div>
              <div className="dashboard-card dashboard-engagement" style={{ height: "200px" }}>
                Customer Engagement
              </div>
            </section>

            {/* Bottom row */}
            <section className="dashboard-latest">
              <div className="dashboard-card dashboard-latest-event">
                Latest Event
              </div>
            </section>
          </main>

          {/* Sidebar on the right */}
          <aside className="dashboard-sidebar">
            <div 
              className="dashboard-card dashboard-upcoming-events" 
              onClick={() => (window.location.href = "manage-events.html")}
            >
              Upcoming Events
            </div>
            <div className="dashboard-card dashboard-notifications">
              Notifications
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
