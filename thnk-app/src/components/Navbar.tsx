import { History, LogIn, LogOut, House } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "../components/component-styles/styles-navbar.css";

function Navbar() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            aria-label="Navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">
                <House color="#ec4a7b" strokeWidth={1.5} size={20} />
                Homepage
              </a>
            </li>
            {user ? (
              <li>
                <button onClick={handleLogout} className="w-full text-left">
                  <LogOut color="#ec4a7b" strokeWidth={1.5} size={20} />
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <a href="/User-auth">
                  <LogIn color="#ec4a7b" strokeWidth={1.5} size={20} />
                  Log In
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost text-xl navbar-title">
          THNK.
        </a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" aria-label="View history">
          <History color="#ec4a7b" strokeWidth={1.5} size={28} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
