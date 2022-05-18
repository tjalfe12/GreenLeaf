import { useNavigate } from "react-router-dom";
import UpdateButton from "./buttons/UpdateButton";
import DeleteButton from "./buttons/DeleteButton";

export default function Post({ post }) {
  const navigate = useNavigate();

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`/single/${post.post_id}`);
  }
  function showUpdateButton() {
    console.log("POST USERS IDs");
    console.log(post);
    const userId = JSON.parse(localStorage.getItem("userLoggedIn")).id;
    console.log(userId);

    if (userId === post.user_id) {
      return (
        <div>
          <UpdateButton />;
        </div>
      );
    }
  }

  function showDeleteButton() {
    console.log("POST USERS IDs");
    console.log(post);
    const userId = JSON.parse(localStorage.getItem("userLoggedIn")).id;
    console.log(userId);

    if (userId === post.user_id) {
      return (
        <div>
          <DeleteButton />;
        </div>
      );
    }
  }

  return (
    <article onClick={handleClick}>
      <h3>
        {post.first_name} {post.last_name}
      </h3>
      <img src={post.postImg_url} alt={post.title} />
      <h2>{post.post_title}</h2>
      <h5>expiration date: {post.expiration_date}</h5>
      <p>{post.post_description}</p>
      {/* <UpdateButton /> */}
      <div>
        {/*       {showUpdateButton()} */}
        {showDeleteButton()}
      </div>

      <hr />
    </article>
  );
}
