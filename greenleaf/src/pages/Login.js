import { useState, useEffect } from "react";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState({
    login: false,
    email: "",
    password: "",
    id: "",
    img: "",
  });
  const [data, setData] = useState("");

  useEffect(() => {
    if (data.status === "success") {
      setLoggedIn({
        login: true,
        email: email,
        password: password,
        id: data.id,
        img: data.img,
      });
      alert("Logged in!");
    } else if (data.status === "failed") {
      console.log("failed to login");
    }
  }, [data]);

  useEffect(() => {
    if (loggedIn.login === true) {
      props.sendtoggle(loggedIn);
    }
  }, [loggedIn]);

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
