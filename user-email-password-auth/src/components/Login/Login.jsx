import {
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
   const [registerError, setRegisterError] = useState("");
   const [registerSuccess, setRegisterSuccess] = useState("");

   const emailRef = useRef(null);

   const handleLogin = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      console.log(email, password);

      setRegisterError("");
      setRegisterSuccess("");

      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            if (user.emailVerified) {
               setRegisterSuccess("Successfully Logged In");
            } else {
               alert("please verify your email address");
            }

            // ...
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setRegisterError(error.message);
         });
   };

   const handleResetPassword = (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      if (!email) {
         console.log(`please provide an email`);
         return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         console.log(`please enter a valid email address`);
         return;
      }
      console.log(`Reset Password Email Sent`, emailRef.current.value);

      // send validation email

      sendPasswordResetEmail(auth, email)
         .then(() => {
            alert("check your email");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Login now!</h1>
               <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
               </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <form onSubmit={handleLogin} className="card-body">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input
                        ref={emailRef}
                        type="email"
                        placeholder="email"
                        name="email"
                        className="input input-bordered"
                        required
                     />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="input input-bordered"
                        required
                     />
                     <label className="label">
                        <a
                           onClick={handleResetPassword}
                           href="#"
                           className="label-text-alt link link-hover"
                        >
                           Forgot password?
                        </a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary">Login</button>
                  </div>
                  <div>
                     {registerError && (
                        <p className="text-red-600 pt-2">{registerError}</p>
                     )}
                     {registerSuccess && (
                        <p className="text-green-600 pt-2">{registerSuccess}</p>
                     )}
                  </div>
                  <p>
                     New to this website?{" "}
                     <Link to={"/register"}>Please register</Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
