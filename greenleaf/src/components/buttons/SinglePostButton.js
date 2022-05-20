import { useNavigate } from "react-router-dom";

export default function SinglePostButton({ post_id }) {
  const navigate = useNavigate();

  function handleSinglePostButton() {
    navigate(`/single/${post_id}`);
  }

  return (
    <>
      <button onClick={handleSinglePostButton}>continue</button>
    </>
  );
}
