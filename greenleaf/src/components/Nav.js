import { NavLink } from "react-router-dom";
import SignOutButton from "./buttons/SignOutButton";

export default function Nav(props) {
  function showNav() {
    if (props.user.login === true) {
      return (
        <>
          <NavLink to="/about">About </NavLink>
          <NavLink to="/create">Create </NavLink>
          <NavLink to="/posts">Posts </NavLink>
          <NavLink to="/signup">Sign-Up </NavLink>
          <NavLink to="/userpage">UserPage </NavLink>

          <UserHeader user={props.user} />
        </>
      );
    } else {
      return <NavLink to="/">Login </NavLink>;
    }
  }

  return <nav>{showNav()}</nav>;
}

function UserHeader(props) {
  if (props.user.login === true) {
    return <img src={props.user.img} alt="Profile" width="30" heigh="30"></img>;
  }
}
