import { useNavigate } from "react-router-dom";

export default function UpdateButton({ post_id }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log("you clicked UPDATE");
    navigate(`/posts/${post_id}`);
  }

  return (
    <div>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}
