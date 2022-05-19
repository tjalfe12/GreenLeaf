import { useState, useEffect } from "react";
import imgPlaceholder from "../default.png";
import { useNavigate } from "react-router-dom";

export default function Create(props) {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("0");
  const [expiration, setExpiration] = useState("");
  const [user, setUser] = useState({
    post_title: "",
    post_description: "",
    post_categoryid: "",
    expiration_date: "",
    post_img: "",
    user_id: null,
  });

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

  useEffect(() => {
    if (user.user_id !== null) {
      if (title !== "") {
        if (description) {
          if (expiration) {
            if (image) {
              sendPost();
            } else {
              alert("Please choose an image");
            }
          } else {
            alert("Please enter an expiration date");
          }
        } else {
          alert("Please enter a description");
        }
      } else {
        alert("Please enter a title");
      }
    }
  }, [user]);

  async function sendPost() {
    const url = "http://sabox.dk/backend/api.php?createpost";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.text();
    navigate("/posts");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUser({
      post_title: title,
      post_description: description,
      // post_categoryid: category,
      expiration_date: expiration,
      post_img: image,
      user_id: props.user.id,
    });
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
          value={title}
          placeholder="Type a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          value={description}
          placeholder="Type a description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {/*  <br />
        <br />
        <input
          type="text"
          value={category}
          placeholder="choose a category"
          onChange={(e) => setCategory(e.target.value)}
        /> */}
        <br />
        <br />
        <input
          type="date"
          value={expiration}
          placeholder="yyyy-mm-dd"
          onChange={(e) => setExpiration(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
