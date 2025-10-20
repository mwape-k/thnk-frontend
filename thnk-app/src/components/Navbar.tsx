import React from "react";
import { History, LogIn, LogOut, House } from "lucide-react";

import "../components/component-styles/styles-navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>
                <House color="#ec4a7b" strokeWidth={1.5} size={20} /> Homepage
              </a>
            </li>
            <li>
              <a>
                <LogIn color="#ec4a7b" strokeWidth={1.5} size={20} /> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl navbar-title">THNK.</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <History color="#ec4a7b" strokeWidth={1.5} size={28} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
