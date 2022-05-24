export default function SignOutButton(props) {
  //Return a button, which calls a signout function passed down originally from App.js
  return (
    <>
      <button onClick={props.signOut}>Sign Out</button>
    </>
  );
}
