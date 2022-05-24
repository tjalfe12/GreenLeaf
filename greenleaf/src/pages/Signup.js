import { useState, useEffect } from "react";
import imgPlaceholder from "../default.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_business, setIs_business] = useState("0");
  const [user, setUser] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    is_business: null,
    img_url: null,
  });

  useEffect(() => {
    async function sendPost() {
      const url = "http://sabox.dk/backend/api.php?createuser";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
      });
      alert("User Created - please log in");
      navigate("/");
    }
    if (user.first_name !== null) {
      sendPost();
    }
  }, [user]);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 1000000) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      //Resets the image input and image preview.
      event.target.value = null;
      setImage(imgPlaceholder);
      alert("Image size too big! Maximum image size is 1MB");
    }
  }

  function prepareUserState() {
    setUser({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      is_business: is_business,
      img_url: image,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (first_name !== "") {
      if (last_name !== "") {
        if (email !== "") {
          if (password !== "") {
            if (image !== "") {
              prepareUserState();
            } else {
              setImage(imgPlaceholder);
              prepareUserState();
            }
          } else {
            alert("Please enter a password");
          }
        } else {
          alert("Please enter you email");
        }
      } else {
        alert("Pleaser enter your last name");
      }
    } else {
      alert("Pleaser enter your first name");
    }
  }

  function checkBox(event) {
    if (event.target.checked === true) {
      setIs_business("1");
    } else {
      setIs_business("0");
    }
  }

  return (
    <>
      <h1 className="headLineUser">Sign up for Greenleaf</h1>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <img
            className="image-preview signupPlaceholder"
            src={image}
            alt=" "
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <br />
          <br />
          <label>Profile picture:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <br />
          <label>First name:</label>
          <input
            type="text"
            value={first_name}
            placeholder="First name"
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <br />
          <br />
          <label>Last name:</label>
          <input
            type="text"
            value={last_name}
            placeholder="Last name"
            onChange={(e) => setLast_name(e.target.value)}
          />
          <br />
          <br />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label>Password:</label>
          <input
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <div className="checkBox">
            <input
              type="checkbox"
              id="is_business"
              name="is_business"
              className="item1"
              value="1"
              onChange={checkBox}
            />
            <label htmlFor="is_business" className="item2">
              I represent a business
            </label>
          </div>
          <br />
          <br />
          <button type="submit">Save</button>
          <h3>Return to login?</h3>
          <NavLink to="/">Login </NavLink>
        </form>
      </div>
    </>
  );
}
