import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";
import Spinner from "./Spinner";
import "./App.scss";
import "normalize.css";

function App() {
  const [loadingInit, setLoadingInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //user login true & false
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setLoadingInit(true);
    });
  }, []);

  return (
    <>
      {loadingInit ? (
        <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} />
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
