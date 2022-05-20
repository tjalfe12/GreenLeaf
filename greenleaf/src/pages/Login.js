import { useState, useEffect } from "react";
import UpdateButton from "../components/buttons/UpdateButton";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
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
    async function checkSessionLog() {
      const url = "http://www.sabox.dk/backend/api.php?checksession";
      const response = await fetch(url);
      const data = await response.text();
      console.log(data);
    }
    if (loggedIn.login === false) {
      console.log("dild");
      checkSessionLog();
    }
    console.log("MegaDild");
  }, []);

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
    }
  }, [data]);

  useEffect(() => {
    if (loggedIn.login === true) {
      props.sendtoggle(loggedIn);
      navigate("/posts");
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
    <div className="login-section">
      <div className="logo-image">
        <img
          src={require("../assets/logo.PNG")}
          alt="logo"
          height="200px"
        ></img>
      </div>
      <form onSubmit={login}>
        <h1>Login</h1>
        <label htmlFor="email.field">Email:</label>
        <input
          id="email-field"
          type="text"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password-field">Password:</label>
        <input
          id="password-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <NavLink to="/signup">Sign up here!</NavLink>
        <br />
        <button className="login-btn" type="submit">continue</button>
      </form>
    </div>
  );
}
