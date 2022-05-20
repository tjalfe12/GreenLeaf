import SignOutButton from "./buttons/SignOutButton";
import fbLogo from "../assets/fb.png";
import inLogo from "../assets/in.png";
import pinLogo from "../assets/pin.png";
import twLogo from "../assets/tw.png";
import { NavLink } from "react-router-dom";

export default function Footer(props) {
  function showSignOut() {
    if (props.logged === true) {
      return (
        <>
          <SignOutButton signOut={props.signOut} />
        </>
      );
    }
  }

  return (
    <>
      <a href="https://www.facebook.com">
        <img src={fbLogo} height="30" width="30" alt="Facebook logo" />
      </a>
      <a href="https://www.instagram.com">
        <img src={inLogo} height="30" width="30" alt="Instagram logo" />
      </a>
      <a href="https://www.pinterest.com">
        <img src={pinLogo} height="30" width="30" alt="Pinterest logo" />
      </a>
      <a href="https://www.twitter.com">
        <img src={twLogo} height="30" width="30" alt="Twitter logo" />
      </a>
      {showSignOut()}
    </>
  );
}
