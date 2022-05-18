import { useState, useEffect } from "react";
import imgPlaceholder from "../default.png";
import { useParams } from "react-router-dom";

export default function Update(props) {
  const params = useParams();
  const [post, setPost] = useState({});
  const url = `http://www.sabox.dk/backend/api.php?getpost=${params.postId}`;
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [post_id, setPost_id] = useState("");

  useEffect(() => {
    if (post.post_title !== null) {
      sendPost();
    }
  }, [post]);

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
      setPost(data.data[0]);
      console.log(data.data[0]);

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

  async function sendPost() {
    console.log(post);
    const url = `http://sabox.dk/backend/api.php?updatepostid=${post_id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    const data = await response.text();
    console.log(data);
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
        <br />
        <br />
        <input
          type="text"
          value={category}
          placeholder="choose a category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
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
