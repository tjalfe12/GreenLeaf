import { NavLink } from "react-router-dom";
//logo from "../assets/logo.PNG";

export default function Nav(props) {
  //Function to return the users profile image in the navbar, if the user is logged in.
  function UserHeader(props) {
    if (props.user.login === true) {
      return (
        <img src={props.user.img} alt="Profile" width="30" heigh="30"></img>
      );
    }
  }
  //Function that returns the navbar, if the user is logged in.
  function showNav() {
    if ((props.user.login === true) === true) {
      return (
        <>
          <nav>
            <div className="logo">
              <img
                src={require("../assets/logo.PNG")}
                alt="logo"
                height="44px"
              ></img>
            </div>

            {/* Top navbar links */}
            <NavLink to="/posts">Home </NavLink>
            <NavLink to="/create">New Post </NavLink>
            <NavLink to="/about">About </NavLink>

            {/* Conditional render of the users profile picture */}
            <UserHeader user={props.user} />
          </nav>
        </>
      );
    }
  }

  return <>{showNav()}</>;
}
