import {Link} from "react-router-dom";

const Navbar = () => {
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
          <Link to="/" className="content">
            Add New Merchant
          </Link>
          <Link to="/about" className="content">
            About Us
          </Link>
          <Link to="/signin" className="content">
            Sign in
          </Link>
          <Link to="/signup" className="profile content">
            Create Account
          </Link>
          <i className="fa-regular fa-bell"></i>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
