import firebase from "firebase/app"; // we import firebase app
import "firebase/firestore"; // we attach to the firebase app the database
import "firebase/auth"; // we attach to the firebase app the auth system

const config = {
  // we create the config object we copied from firebase web when we created the app
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // this is the function we are going to use to crete the users profiles in the db
  if (!userAuth) return; // if there is not user we quit the function

  const userRef = firestore.doc(`users/${userAuth.uid}`); // we create the documentRef
  const snapShot = await userRef.get(); // we create the documentSnapshot

  if (!snapShot.exists) {
    // we check in the snapshot if the user already exists, if it doesn't we create one
    const { displayName, email } = userAuth; // we get the name and email from the google user obejct
    const createdAt = new Date(); // we create the date of registering
    try {
      await userRef.set({
        // we use the documentRef to create the new document in the collection with its properties
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; // we may want to use this user reference after
};

firebase.initializeApp(config); // we initialize the App using the config object

export const auth = firebase.auth(); // we start to config the auth process
export const firestore = firebase.firestore(); // we start the config of the db

// start with google auth
const provider = new firebase.auth.GoogleAuthProvider(); // this give us acceess to google auth provider
provider.setCustomParameters({ prompt: "select_account" }); // here we set custom parameters of the google auth | prompt: "select_account" we want to always trigger the google pop up for auth and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider); // this sets that we want to signin with the google pop up

export default firebase;
