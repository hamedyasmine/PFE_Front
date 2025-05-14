import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="menu-sidebar d-none d-lg-block">
      <div className="menu-sidebar__content js-scrollbar1">
        <nav className="navbar-sidebar">
          <ul className="list-unstyled navbar__list">
            <li className="active has-sub">
              <a className="js-arrow" href="/Dashboard">
                <i className="fas fa-tachometer-alt" /> Dashboard
              </a>
            </li>
            <li>
              <Link to="/number">
                <i className="fas fa-chart-bar" /> Number
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <i className="fas fa-table" /> Categories
              </Link>
            </li>
            <li>
              <Link to="/candidaturesimplifier">
                <i className="fas fa-table" /> Spontaneous Application
              </Link>
            </li>
            <li>
              <Link to="/message">
                <i className="fas fa-calendar-alt" /> Message
              </Link>
            </li>
            <li>
              <Link to="/map">
                <i className="fas fa-map-marker-alt" /> Information
              </Link>
            </li>
            <li>
              <Link to="/gerer-locations">
                <i className="fas fa-map-pin" /> Manage Locations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
