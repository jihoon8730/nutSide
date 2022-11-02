import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.scss";
import "normalize.css";

function App() {
  const [loadingInit, setLoadingInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //user login true & false
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoadingInit(true);
    });
  }, []);

  return (
    <>
      {loadingInit ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </>
  );
}

export default App;
