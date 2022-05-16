import { NavLink } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      <NavLink to="/about">About </NavLink>
      <NavLink to="/create">Create </NavLink>
      <NavLink to="/">Login </NavLink>
      <NavLink to="/posts">Posts </NavLink>
      <NavLink to="/signup">Sign-Up </NavLink>
      <NavLink to="/single">SinglePost </NavLink>
      <NavLink to="/userpage">UserPage </NavLink>
      <UserHeader user={props.user} />
    </nav>
  );
}

function UserHeader(props) {
  if (props.user.login === true) {
    return <h1>{props.user.email}</h1>;
  } else {
    return <h2>not logged in</h2>;
  }
}
