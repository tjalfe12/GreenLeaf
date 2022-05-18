import { useNavigate } from "react-router-dom";

export default function UpdateButton({ post_id }) {
  const navigate = useNavigate();

  function handleUpdateButton() {
    console.log("you clicked UPDATE : " + post_id);
    navigate(`/about`);
  }

  return (
    <div>
      <button onClick={handleUpdateButton}>Update</button>
    </div>
  );
}
