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
import Footer from "./components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({
    login: false,
    email: "",
    password: "",
    id: "",
    img: "",
  });

  //Stores the user logging in, in the React local storage.
  useEffect(() => {
    localStorage.setItem("userLoggedIn", JSON.stringify(currentUser));
  }, [currentUser]);

  //Function to sign out, ie. reset the currentUser state and the local storage.
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

  //Function to determine if the user is logged in, and then display most of the webcontent, which is not available without logging in.
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

  //A function to send to the login page, which will set the currentUser state in this main App.js to the user logging in on the login page.
  function userLogin(user) {
    //Using the spread syntax, the 'user' object sent from the login page is inserted in the 'currentUser' state.
    setCurrentUser({ ...user });
    localStorage.setItem("loggedIn", "true");
  }

  //Here it returns what the user will see when not logged in.
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
