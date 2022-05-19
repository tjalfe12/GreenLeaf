import SignOutButton from "./buttons/SignOutButton";
export default function Footer(props) {
  if (props.logged === true) {
    return <SignOutButton signOut={props.signOut} />;
  }
}
