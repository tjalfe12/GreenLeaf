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

  useEffect(() => {
    if (toggle === true) {
      sendPost();
    }
  }, [post]);

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

  async function sendPost() {
    const url = `http://sabox.dk/backend/api.php?updatepostid=${post_id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    navigate("/posts");
  }

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
