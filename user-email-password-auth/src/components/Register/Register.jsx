import {
   createUserWithEmailAndPassword,
   sendEmailVerification,
   updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
   const [registerError, setRegisterError] = useState("");
   const [registerSuccess, setRegisterSuccess] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleRegister = (e) => {
      e.preventDefault();

      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const accepted = e.target.terms.checked;

      setRegisterError("");
      setRegisterSuccess("");

      if (password.length < 6) {
         setRegisterError("Password must be 6 characters");
         return;
      } else if (!/[A-Z]/.test(password)) {
         setRegisterError("Password must have an uppercase letter");
         return;
      } else if (!accepted) {
         setRegisterError("Please accept our terms and conditions");
         return;
      }

      createUserWithEmailAndPassword(auth, email, password)
         .then((result) => {
            // Signed up
            console.log(result.user);
            setRegisterSuccess("Registration Successful");

            // update profile
            updateProfile(result.user, {
               displayName: name,
               photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
               .then(() => {
                  console.log(`successfully updated profile`);
               })
               .catch((error) => {
                  console.log(error);
               });

            // send verification email
            sendEmailVerification(result.user).then(() => {
               alert("check email for verification");
            });
         })
         .catch((error) => {
            console.error(error);
            setRegisterError(error.message);
            // ..
         });
   };

   return (
      <div className="flex flex-col justify-center items-center min-h-[600px]">
         <h2 className="text-2xl font-bold text-secondary mb-6">
            Register Here
         </h2>
         <form
            onSubmit={handleRegister}
            className="mx-auto border space-y-4 p-6 w-1/2 *:w-full rounded-xl"
         >
            <input
               className="border block rounded-lg p-2"
               type="name"
               name="name"
               placeholder="Enter name"
               required
            />
            <input
               className="border block rounded-lg p-2"
               type="email"
               name="email"
               placeholder="Enter email"
               required
            />

            <input
               className="border block rounded-lg p-2"
               type={showPassword ? "text" : "password"}
               name="password"
               placeholder="Enter password"
               required
            />
            <span
               className="block cursor-pointer"
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? "Hide" : "Show"}
            </span>
            <div>
               <input type="checkbox" name="terms" id="terms" />
               <label htmlFor="terms">Accept our terms and conditions</label>
            </div>
            <input
               className="btn btn-secondary block"
               type="submit"
               value={"Register"}
            />
         </form>
         {registerError && <p className="text-red-600 pt-2">{registerError}</p>}
         {registerSuccess && (
            <p className="text-green-600 pt-2">{registerSuccess}</p>
         )}
         <div>
            <p>
               Already registered? <Link to={`/login`}>Please login</Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
