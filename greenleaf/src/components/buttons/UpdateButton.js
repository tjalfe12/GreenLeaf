import { useNavigate } from "react-router-dom";

export default function UpdateButton({ post_id }) {
  const navigate = useNavigate();

  function handleUpdateButton() {
    navigate(`/posts/${post_id}`);
  }

  return (
    <>
      <button className="edit" onClick={handleUpdateButton}>Edit</button>
    </>
  );
}
