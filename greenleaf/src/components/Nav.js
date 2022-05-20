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
            {/* <div className="links"> */}
            <NavLink to="/about">About </NavLink>
            <NavLink to="/create">Create </NavLink>
            <NavLink to="/posts">Posts </NavLink>
            <UserHeader user={props.user} />
            {/* </div> */}
          </nav>
        </>
      );
    }
  }

  return <>{showNav()}</>;
}
