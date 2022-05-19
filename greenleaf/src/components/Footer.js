import SignOutButton from "./buttons/SignOutButton";
export default function Footer(props) {
  return <SignOutButton signOut={props.signOut} />;
}
