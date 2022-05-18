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
  const [currentUser, setCurrentUser] = useState({
    login: false,
    email: "",
    password: "",
    id: "",
    img: "",
  });

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  function userLogin(user) {
    setCurrentUser({ ...user });
  }

  return (
    <main className="App">
      <Nav user={currentUser} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create user={currentUser} />} />
        <Route path="/" element={<Login sendtoggle={userLogin} />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/single" element={<SinglePost />} />
        <Route path="/posts/:postId" element={<Update />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
