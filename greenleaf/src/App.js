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
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    login: false,
    email: "",
    password: "",
    id: "",
    img: "",
  });

  useEffect(() => {
    console.log(currentUser);
    localStorage.setItem("userLoggedIn", JSON.stringify(currentUser));
    console.log("user data");
    console.log(JSON.parse(localStorage.getItem("userLoggedIn")));
  }, [currentUser]);

  function signOut() {
    setCurrentUser({
      login: false,
      email: "",
      password: "",
      id: "",
      img: "",
    });
    localStorage.setItem("userLoggedIn", null);
  }

  function showPages() {
    if (currentUser.login === true) {
      return (
        <>
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create user={currentUser} />} />
          <Route path="/posts" element={<Posts user={currentUser} />} />
          <Route
            path="/single/:postId"
            element={<SinglePost user={currentUser} />}
          />
          <Route
            path="/posts/:postId"
            element={<Update user={currentUser} />}
          />
          <Route path="/userpage" element={<Userpage user={currentUser} />} />
        </>
      );
    }
  }

  function userLogin(user) {
    setCurrentUser({ ...user });
    localStorage.setItem("loggedIn", "true");
  }

  return (
    <main className="App">
      <Nav user={currentUser} signOut={signOut} />
      <Routes>
        <Route path="/signup" element={<Signup user={currentUser} />} />
        <Route path="/" element={<Login sendtoggle={userLogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
        {showPages()}
      </Routes>
      <Footer signOut={signOut} logged={currentUser.login} />
    </main>
  );
}

export default App;
