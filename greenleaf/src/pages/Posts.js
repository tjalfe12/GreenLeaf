import { useState, useEffect } from "react";
import SinglePost from "../components/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const url = "http://www.sabox.dk/backend/api.php?getallposts";
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data.data);
  }

  return (
    <section className="page">
      <h1>Available offers</h1>

      <section className="grid-container">
        {posts.map((post) => (
          <SinglePost getPosts={getPosts} post={post} key={post.post_id} />
        ))}
      </section>
    </section>
  );
}
