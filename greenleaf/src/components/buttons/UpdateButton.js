import { useNavigate } from "react-router-dom";

export default function UpdateButton({ post_id }) {
  const navigate = useNavigate();

  function handleUpdateButton() {
    console.log("you clicked UPDATE : " + post_id);
    navigate(`/posts/${post_id}`);
    console.log("UPDATE WENT TAHROUGH");
  }

  return (
    <>
      <button onClick={handleUpdateButton}>Update</button>
    </>
  );
}
