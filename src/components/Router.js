import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "components/Nav";

import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";

const Routers = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Nav userObj={userObj} />}
      <Routes>
        {/* isLoggedIn true 일때 home, profile 링크, 아닐때 인증 컴포넌트 */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
