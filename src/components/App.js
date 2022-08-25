import React from "react";
import AppRouter from "./Router";
import { useState, useEffect } from "react";
import { authService } from "../fbase";
import { updateProfile } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(false);
      }

      setInit(true);
    })
  }, []);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    })
  };

  return (
    <React.Fragment>
      { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}  /> : 'Initializing...' }
      {/* <footer>&copy; {new Date().getFullYear()} Twitter-2022</footer> */}
    </React.Fragment>
  );
}

export default App;
