import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALDavT0q7-Ji8kEZshsFOOVcbdQYvV_zA",
  authDomain: "flexipouchid.firebaseapp.com",
  projectId: "flexipouchid",
 storageBucket: "flexipouchid.appspot.com",
  messagingSenderId: "609343921174",
  appId: "1:609343921174:web:4e89031db6bb8c65c56937"
};

const app = initializeApp(firebaseConfig);

export default app;