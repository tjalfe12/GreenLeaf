import UpdateButton from "./buttons/UpdateButton";
import DeleteButton from "./buttons/DeleteButton";
import SinglePostButton from "./buttons/SinglePostButton";

// A component for an individual post.
export default function Post({ post, single, getPosts }) {
  //If the author of the post is the one who is logged in, display the update button.
  function showUpdateButton() {
    const userId = JSON.parse(localStorage.getItem("userLoggedIn")).id;

    if (userId === post.user_id) {
      return (
        <>
          <UpdateButton post_id={post.post_id} />
        </>
      );
    }
  }

  //If the author of the post is the one who is logged in, display the delete button.
  function showDeleteButton() {
    const userId = JSON.parse(localStorage.getItem("userLoggedIn")).id;

    if (userId === post.user_id) {
      return (
        <>
          <DeleteButton getPosts={getPosts} post_id={post.post_id} />
        </>
      );
    }
  }

  //If the post is displayed on the main posts page (and not on the individual post page), show the "continue" button.
  function showSingleButton() {
    if (single !== "true") {
      return (
        <>
          <SinglePostButton post_id={post.post_id} />
        </>
      );
    }
  }

  return (
    <article>
      <h3 className="creator">
        {post.first_name} {post.last_name}
      </h3>
      <img
        className="post-img"
        src={post.postImg_url}
        alt={post.title}
        height="350"
      />
      <div className="post-description">
        <h2>{post.post_title}</h2>
        <hr></hr>
        <p>{post.post_description}</p>
        <h5>expiration date: {post.expiration_date}</h5>

        <div className="buttons">
          {/* Conditional renders */}
          {showDeleteButton()}
          {showUpdateButton()}
          {showSingleButton()}
        </div>
      </div>
    </article>
  );
}
