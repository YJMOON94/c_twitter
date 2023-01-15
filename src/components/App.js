import React, { useEffect, useState } from "react";
import Routers from "components/Router";
import { authService } from "myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Routers isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing now..."
      )}
      <footer>&copy; {new Date().getFullYear()} copy twitter</footer>
    </>
  );
}

export default App;
