import { useState, useEffect } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (data.status === "success") {
      setLoggedIn(true);
      alert("Logged in!");
    } else if (data.status === "failed") {
      console.log("failed to login");
    }
  }, [data]);

  async function login(event) {
    event.preventDefault();
    const user = {
      userEmail: email,
      userPassword: password,
    };
    const url = "http://www.sabox.dk/backend/api.php?login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });
    setData(await response.json());
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          value={email}
          placeholder="Name"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
}
