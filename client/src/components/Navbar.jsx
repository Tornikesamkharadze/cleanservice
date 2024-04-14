import React, { useState, useEffect, useRef } from "react";
import { Person, Menu } from "@mui/icons-material";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Function to handle clicking on service or contact link
  const handleSectionLinkClick = (sectionId) => {
    let offsetValue = 0;

    if (sectionId === "contact") {
      offsetValue = -190;
    } else if (sectionId === "services") {
      offsetValue = 50;
    }

    // Check if the user is on the homepage
    if (window.location.pathname !== "/") {
      // Navigate to the homepage
      navigate("/");
      // Wait for the navigation to complete
      setTimeout(() => {
        // Scroll to the desired section after navigation
        scroller.scrollTo(sectionId, {
          duration: 2500, // Adjust duration as needed
          smooth: "easeInOutQuart", // Adjust smoothness as needed
          offset: offsetValue, // Adjust offset as needed
        });
      }, 500); // Adjust delay as needed
    } else {
      // User is already on the homepage, scroll to the section
      scroller.scrollTo(sectionId, {
        duration: 2500, // Adjust duration as needed
        smooth: "easeInOutQuart", // Adjust smoothness as needed
      });
    }
  };

  return (
    <div className="navbar">
      <RouterLink to="/">
        <img src="../../public/assets/logo.png" alt="logo" />
      </RouterLink>
      <div className="navbar_right">
        {!user ? (
          <ScrollLink
            to="services"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={50}
            duration={2500}
            className="host"
            onClick={() => {
              handleSectionLinkClick("services");
              handleLinkClick();
            }}
          >
            სერვისები
          </ScrollLink>
        ) : null}
        <ScrollLink
          to="contact"
          spy={true}
          smooth={true}
          hashSpy={true}
          offset={-200} // Decrease the offset to scroll slightly higher
          duration={2500}
          className="host"
          onClick={() => {
            handleSectionLinkClick("contact");
            handleLinkClick();
          }}
        >
          კონტაქტი
        </ScrollLink>
        {user ? (
          <ScrollLink
            to="services"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={50}
            duration={2500}
            className="host"
            onClick={() => {
              handleSectionLinkClick("services");
              handleLinkClick();
            }}
          >
            სერვისები
          </ScrollLink>
        ) : (
          <RouterLink to="register" className="host">
            რეგისტრაცია
          </RouterLink>
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
              <ScrollLink
                onClick={() => {
                  handleSectionLinkClick("services");
                  handleLinkClick();
                }}
                to="services"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={2500}
                className="toast"
              >
                სერვისები
              </ScrollLink>
            ) : null}
            <ScrollLink
              onClick={() => {
                handleSectionLinkClick("contact");
                handleLinkClick();
              }}
              to="contact"
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={-80} // Decrease the offset to scroll slightly higher
              duration={2500}
              className="toast"
            >
              კონტაქტი
            </ScrollLink>
            {user ? (
              <ScrollLink
                onClick={() => {
                  handleSectionLinkClick("services");
                  handleLinkClick();
                }}
                to="services"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={2500}
                className="toast"
              >
                სერვისები
              </ScrollLink>
            ) : null}
          </div>

          {user ? (
            <>
              <RouterLink to="user_orders" onClick={handleLinkClick}>
                ჩემი შეკვეთები
              </RouterLink>
              <RouterLink
                to="/"
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                ანგარიშიდან გასვლა
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink to="/login" onClick={handleLinkClick}>
                შესვლა
              </RouterLink>
              <RouterLink to="/register" onClick={handleLinkClick}>
                რეგისტრაცია
              </RouterLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
