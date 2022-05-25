import { useState, useEffect } from "react";
import imgPlaceholder from "../assets/foodPlaceholder.png";
import { useNavigate, NavLink } from "react-router-dom";

//The page to create a new post.
export default function Create(props) {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [category, setCategory] = useState("0");
  const [expiration, setExpiration] = useState("");

  //The post object that will be sent to the server.
  const [post, setPost] = useState({
    post_title: "",
    post_description: "",
    post_categoryid: "",
    expiration_date: "",
    post_img: "",
    user_id: null,
  });

  //Function that runs every time the file uploader changes value, ie. an image is uploaded.
  function handleImageChange(event) {
    //Saves the input from the file input field in a "file" variable
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
      alert("The image file is too big! Please choose a different one");
    }
  }

  //Form validation - Sends post if the fields are not empty.
  useEffect(() => {
    if (post.user_id !== null) {
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
  }, [post]);

  //Function to send the post via backend api.
  async function sendPost() {
    const url = "http://sabox.dk/backend/api.php?createpost";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
    });
    const data = await response.text();
    navigate("/posts");
  }

  //
  async function handleSubmit(event) {
    event.preventDefault();
    setPost({
      post_title: title,
      post_description: description,
      // post_categoryid: category,
      expiration_date: expiration,
      post_img: image,
      user_id: props.user.id,
    });
  }

  return (
    <>
      <h1 className="headLine">Post an offer</h1>
      <br />
      <div className="formBox">
        <form name="createForm " onSubmit={handleSubmit}>
          <img
            className="image-preview postPlaceholder"
            src={image}
            alt=" "
            height="80"
            width="80"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <br />
          <br />
          <label>Picture of the food:</label>
          <input
            type="file"
            name="fileField"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />
          <br />
          <label>Title:</label>
          <input
            type="text"
            value={title}
            placeholder="Type a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />

          <label>Description:</label>
          <textarea
            name="comment"
            form="createForm"
            value={description}
            placeholder="Write a description"
            onChange={(e) => setDescription(e.target.value)}
          >
            Enter text here...
          </textarea>
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
          <label>Expiration date:</label>
          <input
            type="date"
            value={expiration}
            placeholder="yyyy-mm-dd"
            onChange={(e) => setExpiration(e.target.value)}
          />
          <br />
          <br />
          <div className="formBtns">
            <NavLink to="/posts">
              <button>Back</button>
            </NavLink>
            <button id="submitBtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
