import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC58rnwX7Zas-GdxfettF49Qjh6J6vSPAY",
  authDomain: "bold-96a92.firebaseapp.com",
  projectId: "bold-96a92",
  storageBucket: "bold-96a92.appspot.com",
  messagingSenderId: "1033134164289",
  appId: "1:1033134164289:web:19324e4de34f1e885879c0",
  measurementId: "G-Z7KPBLYW28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

const fbProvider = new FacebookAuthProvider();
const fbScopeProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

console.log(auth);

// getIdToken()
//   .then((idToken) => {
//     console.log("TOKEN wohooooo", idToken);
//   })
//   .catch((e) => {
//     console.log("There was an error: ", e);
//   });

auth.languageCode = "it";

fbScopeProvider.addScope(
  "catalog_management, instagram_basic, instagram_content_publish, instagram_manage_insights, pages_manage_metadata, pages_messaging, pages_show_list, pages_user_gender, pages_user_locale, user_birthday, user_gender, instagram_graph_user_media, instagram_graph_user_profile"
);

var btn = document.getElementById("btn-login");
var fbBtn = document.getElementById("btn-login-fb");
var fbScopeBtn = document.getElementById("btn-login-fb-scope");
var logoutBtn = document.getElementById("btn-logout");

var email = document.getElementsByName("email")[0];
var password = document.getElementsByName("password")[0];
var signupBtn = document.getElementById("btn-signup");
var loginBtn = document.getElementById("btn-login-email");

btn.addEventListener(
  "click",
  function () {
    login();
  },
  false
);

fbBtn.addEventListener(
  "click",
  function () {
    loginWithFacebook();
  },
  false
);

fbScopeBtn.addEventListener(
  "click",
  function () {
    loginWithScope();
  },
  false
);

signupBtn.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    signupUser();
  },
  false
);

loginBtn.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    emailLogin();
  },
  false
);

logoutBtn.addEventListener(
  "click",
  function () {
    logout();
  },
  false
);

const logout = () => {
  console.log("logout");
  auth.signOut();
};

async function signupUser() {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.getIdToken());
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
}

async function emailLogin() {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      const token = await user.getIdToken();
      console.log(token);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
}

function loginWithFacebook() {
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("User>>>>>", user);
      console.log("AccessToken>>>>>", accessToken);

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log(error);

      // ...
    });
}

const loginWithScope = () => {
  signInWithPopup(auth, fbScopeProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("User>>>>>", user);
      console.log("AccessToken>>>>>", accessToken);

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log(error);

      // ...
    });
};

const login = () => {
  signInWithRedirect(auth, googleProvider);
};

const status = async () => {
  getRedirectResult(auth)
    .then((result) => {
      // console.log(result);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // token = credential.accessToken;
      // console.log(token);

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      user.getIdToken().then((idToken) => {
        token = idToken;
        console.log("authToken: ", idToken);
      });
      // console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

window.onload = async () => {
  status();
  // console.log("loaded");
};
