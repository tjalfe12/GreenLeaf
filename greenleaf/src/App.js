import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import About from "./pages/About.js";
import Create from "./pages/Create.js";
import Login from "./pages/Login.js";
import Posts from "./pages/Posts.js";
import Signup from "./pages/Signup.js";
import SinglePost from "./pages/Singlepost.js";
import Update from "./pages/Update.js";
import Userpage from "./pages/Userpage.js";
import Nav from "./components/Nav";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  /*   useEffect(() => {
    async function getPosts() {
      const url = "http://www.sabox.dk/backend/api.php?getallusers";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data["data"]);
    }
    getPosts();
  }, []);
  useEffect(() => {
    async function checkLogin() {
      const url = "http://www.sabox.dk/backend/api.php?loginSuccess";
      const response = await fetch(url);
      const data = await response.text();
      console.log(data);
    }
    checkLogin();
  }, []); */

  function callCheckUser() {
    console.log(loggedIn);
  }

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
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      setLoggedIn(true);
    }
  }

  async function phpcheck() {
    const url = "http://www.sabox.dk/backend/api.php?loginSuccess";
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
  }

  return (
    <main className="App">
      <Nav />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/single" element={<SinglePost />} />
        <Route path="/posts/:postId" element={<Update />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <center>
        <form onSubmit={login}>
          <table>
            <tbody>
              <tr>
                <th>Choose a username</th>
                <th>Choose a password</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Login" name="login" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="hidden" name="action" value="login" />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="button" value="Check User" onClick={callCheckUser} />
          <input type="button" value="Check stattus" onClick={phpcheck} />
        </form>
      </center>
    </main>
  );
}

export default App;
