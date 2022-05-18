export default function DeleteButton({ post_id }) {
  async function deletePost() {
    const url = `http://www.sabox.dk/backend/api.php?deletepost=${post_id}`;
    const response = await fetch(url);
    const data = await response.text();
    console.log("POST WAS DELETED");
    console.log(data);
  }

  return (
    <div>
      <button onClick={() => deletePost(post_id)}>Delete</button>
    </div>
  );
}
