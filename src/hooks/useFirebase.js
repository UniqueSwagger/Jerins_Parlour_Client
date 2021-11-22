import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../firebase/firebase.init.js";
initializeAuthentication();
const useFirebase = () => {
  const auth = getAuth();
  //all state
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  //all provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  //getting admin
  const adminStatus = JSON.parse(localStorage.getItem("admin"));
  const admin = adminStatus?.admin;

  // handle sign up
  const handleSignup = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const newUser = { email, displayName: name };
        setCurrentUser(newUser);
        //save user to the database
        saveUser(email, name, "post");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            //profile updated successfully
          })
          .catch((error) => {
            //an error occurred
            console.log(error.message);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle sign in
  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  //handle google sign in
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle github sign in
  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //admin check
  useEffect(() => {
    setLoading(true);
    return axios
      .get(
        `https://vast-plains-88495.herokuapp.com/users/${currentUser?.email}`
      )
      .then((res) => localStorage.setItem("admin", JSON.stringify(res.data)))
      .finally(() => setLoading(false));
  }, [currentUser?.email, admin]);

  // observing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getIdToken(user).then((idToken) => setToken(idToken));
      } else {
        setCurrentUser({});
      }

      setLoading(false);
    });
    return unsubscribe;
  }, [auth, token]);
  //save user to the database
  const saveUser = (email, displayName, httpMethod) => {
    const user = { email, displayName };
    axios({
      method: httpMethod,
      url: "https://vast-plains-88495.herokuapp.com/users",
      data: user,
    });
  };

  return {
    handleSignup,
    currentUser,
    loading,
    token,
    admin,
    setCurrentUser,
    handleGoogleSignIn,
    handleGithubSignIn,
    handleLogout,
    handleSignIn,
    resetPassword,
  };
};

export default useFirebase;
