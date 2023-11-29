import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [user, setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  let [mainLoader, setmainLoader] = useState("");

  const trackEmail = (e) => {
    setEmail(e.target.value);
  };
  const trackPassword = (e) => {
    setPassword(e.target.value);
  };
  const printDetails = async function () {
    // alert(email + " " + password);
    try {
      setLoader(true);
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred.user);
      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
      // After some time -> error message remove
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setLoader(false);
  };
  const signout = async function () {
    await signOut(auth);
    setUser(null);
  };
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          // const uid = user.uid;
          setUser(user);
          // ...
        } else {
          // User is signed out
          // ...
          setUser(null);
        }
        setmainLoader(false);
      },
      []
    );
  });
  return (
    <>
      {mainLoader == true ? (
        <h1>Page Loading...</h1>
      ) : error != "" ? (
        <h1>Error is {error}</h1>
      ) : loader == true ? (
        <h1>... Loading</h1>
      ) : user != null ? (
        <>
          <button onClick={signout}>Signout</button>
          <h1>user is {user.uid}</h1>
        </>
      ) : (
        <>
          <input
            type="email"
            onChange={trackEmail}
            value={email}
            placeholder="email"
          ></input>
          <br></br>
          <input
            type="password"
            onChange={trackPassword}
            value={password}
            placeholder="password"
          ></input>
          <br></br>
          <button onClick={printDetails}>Login</button>
        </>
      )}
    </>
  );
}

export default Login;
