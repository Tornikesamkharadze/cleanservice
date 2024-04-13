import React, { useState, useEffect, useRef } from "react";
import { Person, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";

const Navbar = () => {
  // State for controlling the dropdown menu
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Redux hooks for accessing user state and dispatching actions
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Ref for detecting clicks outside the dropdown menu
  const dropdownRef = useRef(null);

  // Effect for closing dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to close dropdown when link inside it is clicked
  const handleLinkClick = () => {
    setDropdownMenu(false);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src="../../public/assets/logo.png" alt="logo" />
      </Link>
      <div className="navbar_right">
        {/* Conditional rendering based on user authentication */}
        {!user ? (
          <Link to="/create-listing" className="host">
            სერვისები
          </Link>
        ) : null}
        <Link to="/contact" className="host">
          კონტაქტი
        </Link>
        {user ? (
          <Link to="/create-listing" className="host">
            სერვისები
          </Link>
        ) : (
          <Link to="register" className="host">
            რეგისტრაცია
          </Link>
        )}
      </div>
      {/* Button to toggle dropdown menu */}
      <button
        className="navbar_right_account"
        onClick={() => setDropdownMenu(!dropdownMenu)}
      >
        <Menu />
        {!user ? (
          <Person />
        ) : (
          <img
            src={`http://localhost:3001/${user.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile photo"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        )}
      </button>
      {/* Dropdown menu */}
      {dropdownMenu && (
        <div className="navbar_right_accountmenu" ref={dropdownRef}>
          <div className="dropdown">
            {/* Conditional rendering based on user authentication */}
            {!user ? (
              <button to="/create-listing" className="toast">
                სერვისები
              </button>
            ) : null}
            <button to="/contact" className="toast">
              კონტაქტი
            </button>
            {user ? (
              <button to="/create-listing" className="toast">
                სერვისები
              </button>
            ) : null}
          </div>
          {/* Links inside the dropdown menu */}
          {user ? (
            <>
              <Link
                to={`/${user._id}/trips`}
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                Trip List
              </Link>
              <Link
                to={`/${user._id}/wishList`}
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                Wish List
              </Link>
              <Link
                to={`/${user._id}/properties`}
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                Property List
              </Link>
              <Link
                to={`/${user._id}/reservations`}
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                Reservation List
              </Link>
              <Link
                to="/"
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                შესვლა
              </Link>
              <Link
                to="/register"
                className="dropdown-link"
                onClick={handleLinkClick}
              >
                რეგისტრაცია
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
