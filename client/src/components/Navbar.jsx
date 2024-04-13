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
        {!user ? <button className="host">სერვისები</button> : null}
        <button className="host">კონტაქტი</button>
        {user ? (
          <button className="host">სერვისები</button>
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
          <div className="dropdown">
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
              <Link
                to="/"
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                ანგარიშიდან გასვლა
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick}>
                შესვლა
              </Link>
              <Link to="/register" onClick={handleLinkClick}>
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
