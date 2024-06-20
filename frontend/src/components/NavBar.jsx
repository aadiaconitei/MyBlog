import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function NavBar() {
  const { authenticated, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <a className="navbar-brand" href="/">
          React Blog RNEM
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item"> 
                        <Link to="/" className='nav-link active'>Home</Link> 
                    </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <Link to="/posts" className='nav-link'>Posts</Link> */}
              <NavLink
                to="/posts"
                activeclassname="active"
                className="nav-link"
              >
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <Link to="/contact" className='nav-link'>Contact Us</Link> */}
              <NavLink
                to="/contact"
                activeclassname="active"
                className="nav-link"
              >
                Contact Us
              </NavLink>
            </li>
            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/mylogin"
                  activeclassname="active"
                  className="nav-link"
                >
                  Login
                </NavLink>
              </li>
            )}
            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/myregister"
                  activeclassname="active"
                  className="nav-link"
                >
                  Register
                </NavLink>
              </li>
            )}

            {authenticated && (
              <li className="nav-item dropdown">
                <button className="dropbtn">Admin</button>
                <div className="dropdown-content">
                  <NavLink
                    to="/add-post"
                    activeclassname="active"
                    className="nav-link"
                  >
                    Add post
                  </NavLink>
                  <NavLink
                    to="/view-posts"
                    activeclassname="active"
                    className="nav-link"
                  >
                    View Posts
                  </NavLink>
                  <NavLink
                    to="/view-users"
                    activeclassname="active"
                    className="nav-link"
                  >
                    View Users
                  </NavLink>
                </div>
              </li>
            )}
            {authenticated && (
              <li className="nav-item">
                <NavLink
                  activeclassname="aaa"
                  onClick={logout}
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
