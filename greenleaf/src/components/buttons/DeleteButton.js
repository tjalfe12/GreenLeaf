import { useNavigate } from "react-router-dom";

export default function DeleteButton({ post_id, getPosts }) {
  const navigate = useNavigate();

  //Sends a request to the API to delete the post with the supplied  id.
  async function deletePost() {
    const url = `http://www.sabox.dk/backend/api.php?deletepost=${post_id}`;
    const response = await fetch(url);
    navigate(`/posts`);
    getPosts();
  }

  return (
    <>
      <button className="edit" onClick={deletePost}>
        Delete
      </button>
    </>
  );
}
