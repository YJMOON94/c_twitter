import React from "react";
import { Link } from "react-router-dom";
const Nav = ({ userObj }) => {
  if (userObj.displayName == null) {
    const name = userObj.email.split("@")[0];
    userObj.displayName = name;
  }
  return (
    <nav>
      <h2>nav section</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName} PROFILE</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
