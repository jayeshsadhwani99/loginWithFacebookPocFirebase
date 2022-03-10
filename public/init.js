import {
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

let token = null;
auth.languageCode = "it";

const loginWithFacebook = () => {
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
