import { useState, useEffect } from "react";
import imgPlaceholder from "../default.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_business, setIs_business] = useState("0");
  const [readyToSend, setReadyToSend] = useState(false);
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
      console.log(user);
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
    if (file.size < 500000) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage("");
    } else {
      setErrorMessage("The image file is too big!");
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
    <div>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <img
          className="image-preview"
          src={image}
          alt=" "
          height="70"
          width="70"
          onError={(event) => (event.target.src = imgPlaceholder)}
        />
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        <br />
        <input
          type="text"
          value={first_name}
          placeholder="First name"
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          value={last_name}
          placeholder="Last name"
          onChange={(e) => setLast_name(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input
          type="checkbox"
          id="is_business"
          name="is_business"
          value="1"
          onChange={checkBox}
        />
        <label for="is_business"> I represent a business</label>
        <br />
        <br />
        <button type="submit">Save</button>
        <h3>Return to login?</h3>
        <NavLink to="/">Login </NavLink>
      </form>
    </div>
  );
}
