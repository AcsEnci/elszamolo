import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Tanulók és egyenlegeik</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Új Tanuló</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
