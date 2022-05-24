import { useNavigate } from "react-router-dom";

//A button that will send the user to the individual page for the specific post, on which the button is located.
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
