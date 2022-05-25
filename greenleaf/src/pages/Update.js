import { useState, useEffect } from "react";
import imgPlaceholder from "../assets/foodPlaceholder.png";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Update(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({});
  const url = `http://www.sabox.dk/backend/api.php?getpost=${params.postId}`;
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");
  const [post_id, setPost_id] = useState("");
  const [toggle, setToggle] = useState(false);

  //On render and when url state changes, this makes an API call to the server and receives data for the specific post with the given postID from params.
  // Then it loads the data into the appropriate states.
  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
      setPost(data.data[0]);

      setPost_id(data.data[0].post_id);
      setTitle(data.data[0].post_title);
      setDescription(data.data[0].post_description);
      setCategory(data.data[0].category_id);
      setExpiration(data.data[0].expiration_date);
      setImage(data.data[0].postImg_url);
    }

    getPost();
  }, [url]);

  //On render this will run once, but to prevent an unwanted sending of data, the toggle state must be set true first. But when the post state is properly loaded with data,
  // and the toggle state is set to true, this will trigger the sendPost() function.
  useEffect(() => {
    if (toggle === true) {
      sendPost();
    }
  }, [post]);

  //When the user selects an image to upload, this function is called. If the file is less than 1MB, it is stored in the image state as a base64 value.
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
      alert("Image size is too big! Please choose an image below 1MB");
    }
  }

  //Makes a PUT request to the server, including the post data to be put in the database.
  async function sendPost() {
    const url = `http://sabox.dk/backend/api.php?updatepostid=${post_id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    navigate("/posts");
  }

  //When the user presses the save button, this function will store all the data from the various relevant states in the post state, as an object.
  //Then it will set the toggle state to true, indicating everything is ready to be uploaded.
  async function handleSubmit(event) {
    event.preventDefault();
    setPost({
      post_title: title,
      post_description: description,
      post_categoryid: category,
      expiration_date: expiration,
      post_img: image,
      user_id: props.user.id,
    });
    setToggle(true);
  }

  return (
    <>
      <h1 className="headLine">Update your post</h1>
      <br />
      <div className="formBox">
        <form name="updateForm" onSubmit={handleSubmit}>
          <img
            className="image-preview"
            src={image}
            alt=" "
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <br />
          <br />
          <label>Picture of the food:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
            form="updateForm"
            value={description}
            placeholder="Write a description"
            onChange={(e) => setDescription(e.target.value)}
          >
            Enter text here...
          </textarea>
          {/*   <br />
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
