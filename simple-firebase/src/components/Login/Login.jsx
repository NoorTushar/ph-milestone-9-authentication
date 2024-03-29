import {
   GoogleAuthProvider,
   getAuth,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
   const [user, setUser] = useState(null);

   const auth = getAuth(app);

   const provider = new GoogleAuthProvider();

   const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
         })
         .catch((error) => {
            console.log(`error -> `, error);
         });
   };

   const handleSignOut = () => {
      signOut(auth)
         .then((result) => {
            console.log(result);
            setUser(null);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div>
         {user ? (
            <button onClick={handleSignOut}>Sign out</button>
         ) : (
            <button onClick={handleGoogleSignIn}>Google Login</button>
         )}

         {user && (
            <div>
               <h3>User: {user.displayName}</h3>
               <p>Email: {user.email}</p>
            </div>
         )}
      </div>
   );
};

export default Login;
