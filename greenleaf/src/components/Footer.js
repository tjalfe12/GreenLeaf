import SignOutButton from "./buttons/SignOutButton";
import fbLogo from "../assets/fb.png";
import inLogo from "../assets/in.png";
import pinLogo from "../assets/pin.png";
import twLogo from "../assets/tw.png";
export default function Footer(props) {
  if (props.logged === true) {
    return (
      <>
        <img src={fbLogo} height="30" width="30" alt="Facebook logo" />
        <img src={inLogo} height="30" width="30" alt="Instagram logo" />
        <img src={pinLogo} height="30" width="30" alt="Pinterest logo" />
        <img src={twLogo} height="30" width="30" alt="Twitter logo" />
        <SignOutButton signOut={props.signOut} />
      </>
    );
  }
}
