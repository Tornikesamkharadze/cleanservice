import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state"

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <Link to="/">
                <img src="../../public/assets/logo.png" alt="logo" />
            </Link>
            <div className="navbar_search">
                <input type="text" placeholder="Search ..." />
                <IconButton>
                    <Search style={{ color: "rgb(69,142,240)" }} />
                </IconButton>
            </div>
            <div className="navbar_right">
                {/*    <Link to="/contact" className='host'>მთავარი</Link> */}
               
                {!user ? <Link to="/create-listing" className="host">
                    სერვისები
                </Link> : null}
                <Link to="/contact" className="host">
                    კონტაქტი
                </Link>
                {user ? (
                    <Link to="/create-listing" className="host">
                        სერვისები
                    </Link>
                ) : (
                    <Link to="register" className="host">რეგისტრაცია</Link>
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
            {dropdownMenu && !user && (
                <div className="navbar_right_accountmenu">
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Sign Up</Link>
                </div>
            )}

            {dropdownMenu && user && (
                <div className="navbar_right_accountmenu">
                    <Link to={`/${user._id}/trips`}>Trip List</Link>
                    <Link to={`/${user._id}/wishList`}>Wish List</Link>
                    <Link to={`/${user._id}/properties`}>Property List</Link>
                    <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                    <Link to="/create-listing">Become A Host</Link>
                    <Link to="/" onClick={() => {
                        dispatch(setLogout())
                    }}>Log Out</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
