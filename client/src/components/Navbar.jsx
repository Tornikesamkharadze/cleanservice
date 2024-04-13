import React, { useState, useEffect, useRef } from "react";
import { Person, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Close dropdown when link inside it is clicked
  const handleLinkClick = () => {
    setDropdownMenu(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="../../public/assets/logo.png" alt="logo" />
      </Link>
      <div className="navbar_right">
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
      {dropdownMenu && (
        <div className="navbar_right_accountmenu" ref={dropdownRef}>
          {user ? (
            <>
              <Link to={`/${user._id}/trips`} onClick={handleLinkClick}>
                Trip List
              </Link>
              <Link to={`/${user._id}/wishList`} onClick={handleLinkClick}>
                Wish List
              </Link>
              <Link to={`/${user._id}/properties`} onClick={handleLinkClick}>
                Property List
              </Link>
              <Link to={`/${user._id}/reservations`} onClick={handleLinkClick}>
                Reservation List
              </Link>
              <Link to="/create-listing" onClick={handleLinkClick}>
                Become A Host
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
              <Link to="/login" onClick={handleLinkClick}>
                Log In
              </Link>
              <Link to="/register" onClick={handleLinkClick}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
