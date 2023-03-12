import React, { useEffect, useState } from "react";
import Routers from "components/Router";
import { authService } from "myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // displayName 실시간 업데이트
  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <Routers
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing now..."
      )}
      <footer>&copy; {new Date().getFullYear()} copy twitter</footer>
    </>
  );
}

export default App;
