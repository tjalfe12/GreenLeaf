import { useNavigate } from "react-router-dom";

export default function DeleteButton({ post_id, getPosts }) {
  const navigate = useNavigate();

  async function deletePost() {
    const url = `http://www.sabox.dk/backend/api.php?deletepost=${post_id}`;
    const response = await fetch(url);
    const data = await response.text();
    navigate(`/posts`);
    getPosts();
  }

  return (
    <>
      <button onClick={deletePost}>Delete</button>
    </>
  );
}
