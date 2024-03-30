import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Register = () => {
   const handleRegister = (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      createUserWithEmailAndPassword(auth, email, password)
         .then((result) => {
            // Signed up
            console.log(result.user);
            // ...
         })
         .catch((error) => {
            console.error(error);
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
               type="email"
               name="email"
               placeholder="Enter email"
            />

            <input
               className="border block rounded-lg p-2"
               type="password"
               name="password"
               placeholder="Enter password"
            />

            <input
               className="btn btn-secondary block"
               type="submit"
               value={"Register"}
            />
         </form>
      </div>
   );
};

export default Register;
