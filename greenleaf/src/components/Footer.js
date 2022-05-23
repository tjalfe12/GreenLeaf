import SignOutButton from "./buttons/SignOutButton";
import fbLogo from "../assets/fb.png";
import inLogo from "../assets/in.png";
import pinLogo from "../assets/pin.png";
import twLogo from "../assets/tw.png";

export default function Footer(props) {
  //Function to check if the user is logged in, and then returns the signout button to be displayed.
  function showSignOut() {
    if (props.logged === true) {
      return (
        <>
          <SignOutButton signOut={props.signOut} />
        </>
      );
    }
  }

  //Returns the social media logos/buttons along with the signout button, if the user is logged in.
  return (
    <footer>
      <a className="SoMe" href="https://www.facebook.com">
        <img src={fbLogo} height="30" width="30" alt="Facebook logo" />
      </a>
      <a className="SoMe" href="https://www.instagram.com">
        <img src={inLogo} height="30" width="30" alt="Instagram logo" />
      </a>
      <a className="SoMe" href="https://www.pinterest.com">
        <img src={pinLogo} height="30" width="30" alt="Pinterest logo" />
      </a>
      <a className="SoMe" href="https://www.twitter.com">
        <img src={twLogo} height="30" width="30" alt="Twitter logo" />
      </a>
      {showSignOut()}
    </footer>
  );
}
