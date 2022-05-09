import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/about">About </NavLink>
      <NavLink to="/create">Create </NavLink>
      <NavLink to="/">Login </NavLink>
      <NavLink to="/posts">Posts </NavLink>
      <NavLink to="/signup">Sign-Up </NavLink>
      <NavLink to="/single">SinglePost </NavLink>
      <NavLink to="/userpage">UserPage </NavLink>
    </nav>
  );
}
