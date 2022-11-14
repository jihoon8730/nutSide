import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import "./googlesignin.scss";

const GoogleSignin = () => {
  const onSocialLoginClick = (e) => {
    const {
      target: { name },
    } = e;
    const auth = getAuth();
    if (name === "google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div>
      <button className="google-btn" name="google" onClick={onSocialLoginClick}>
        G
      </button>
    </div>
  );
};

export default GoogleSignin;
