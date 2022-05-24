import { useNavigate } from "react-router-dom";

//A button that will send the user to the update page for the post where the button appears on.
export default function UpdateButton({ post_id }) {
  const navigate = useNavigate();

  function handleUpdateButton() {
    navigate(`/posts/${post_id}`);
  }

  return (
    <>
      <button className="edit" onClick={handleUpdateButton}>
        Edit
      </button>
    </>
  );
}
