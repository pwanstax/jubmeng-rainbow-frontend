import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {checkLogin} from "../utils/auth";
import useOutsideClick from "../hooks/useOutsideCllick";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useOutsideClick(() => setOpenDropdown(false));

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    await axios.post(
      `${process.env.REACT_APP_SERVICE_DOMAIN}/auth/logout`,
      {
        cookie_name: "auth",
      },
      {
        withCredentials: true,
      }
    );
    window.location.assign("/");
  };

  const handleRegisterSeller = async () => {
    const user_id = sessionStorage.getItem("user_id");
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVICE_DOMAIN}/user/setseller/${user_id}`,
        {
          cookie_name: "auth",
        },
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNavbar = async () => {
      const result = await checkLogin();
      if (result) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVICE_DOMAIN}/user/navbar`,
            {
              headers: {
                user_id: sessionStorage.getItem("user_id"),
              },
              withCredentials: true,
            }
          ); // change path to backend service
          setNavbarInfo(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchNavbar();
  }, []);

  return (
    <div className="navbar-container">
      <img
        src={require("../assets/images/logo2.png")}
        alt="logo"
        className="logo"
      />

      <div className="content-container">
        <nav>
          <Link to="/" className="content">
            Home
          </Link>
          <Link to="/mapView" className="content">
            Find On Map
          </Link>
          <Link to="/addProduct" className="content">
            Add New Merchant
          </Link>
          <Link to="/about" className="content">
            About Us
          </Link>
          {navbarInfo ? (
            <>
              <div className="profile" ref={ref}>
                <img
                  src={navbarInfo.image}
                  alt=""
                  style={openDropdown ? {opacity: 0.5} : {}}
                  onClick={toggleDropdown}
                />
                {openDropdown && (
                  <div className="dropdown">
                    <ul role="menu" className="menu">
                      <li className="menu-item">
                        <Link
                          to="/profile"
                          className="link"
                          onClick={toggleDropdown}
                        >
                          My profile
                        </Link>
                      </li>
                      {navbarInfo.isLessor ? (
                        <></>
                      ) : (
                        <li
                          onClick={handleRegisterSeller}
                          className="menu-item"
                        >
                          Be a seller
                        </li>
                      )}
                      <li className="menu-item" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="content">
                Sign in
              </Link>
              <Link to="/signup" className="signup content">
                Create Account
              </Link>
            </>
          )}
          <i className="fa-regular fa-bell"></i>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
