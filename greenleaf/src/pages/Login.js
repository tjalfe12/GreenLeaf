import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AboutSection from "../components/AboutSection";

//The login page.
export default function Login(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //"loggedIn" stores the data for the currently logged in user.
  const [loggedIn, setLoggedIn] = useState({
    login: false,
    email: "",
    password: "",
    id: "",
    img: "",
  });
  const [data, setData] = useState("");

  //If no one is logged in, this useEffect and funtion calls the server to see if there's a user logged in, in the session
  // and stores that in the data state, which will trigger the next stages of the login process.
  useEffect(() => {
    async function checkSessionLog() {
      const url = "http://www.sabox.dk/backend/api.php?checksession";
      const response = await fetch(url);
      setData(await response.json());
    }
    if (loggedIn.login === false) {
      checkSessionLog();
    }
  }, []);

  //When the data state changes, the data from data is stored in the setLoggedIn state, if the status property is "success",
  // otherwise it will give the error "invalid login".
  useEffect(() => {
    if (data.status === "success") {
      setLoggedIn({
        login: true,
        email: email,
        password: password,
        id: data.id,
        img: data.img,
      });
    } else if (data.status === "failed") {
      alert("Invalid login");
    }
  }, [data]);

  // Once the user data from the server is loaded into the loggedIn state, it will send the user data as a parameter for a function that was
  // passed on to this Login.js page from App.js. So it will send the user data back to App.js along with the function called userLogin in App.js.
  useEffect(() => {
    if (loggedIn.login === true) {
      props.sendtoggle(loggedIn);
      navigate("/posts");
    }
  }, [loggedIn]);

  //This login function triggers when the user clicks the "continue" button. It will then send the user email and password to the server, in order
  // for it to validate with the users in the database. It will then fill the data state with the response it is returned from the server. If the
  // login was successful, it will an object with a status, message and the users id and img_url.
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
    <>
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
            type="email"
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
          <button className="login-btn" type="submit">
            continue
          </button>
        </form>
      </div>
      <AboutSection />
    </>
  );
}
