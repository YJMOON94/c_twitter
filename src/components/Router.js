import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "components/Nav";

import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";

const Routers = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
