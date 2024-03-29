import { Link } from "react-router-dom";

const Header = () => {
   return (
      <div className="border-2 border-lime-300 space-x-5 text-center">
         <Link to={"/"}>Home</Link>
         <Link to={"/login"}>Log In</Link>
      </div>
   );
};

export default Header;
