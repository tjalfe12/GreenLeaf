import { useState, useEffect } from "react";
import SinglePost from "../components/Post";

//Our main posts page, displaying all the posts.
export default function Posts() {
  const [posts, setPosts] = useState([]);

  //Runs the getPosts() function on render.
  useEffect(() => {
    getPosts();
  }, []);

  //Makes an API call to retrieve all the current posts from the database, which it then stores in the posts state.
  async function getPosts() {
    const url = "http://www.sabox.dk/backend/api.php?getallposts";
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data.data);
  }

  return (
    <section className="page">
      <h1>Available offers</h1>

      {/* Here we iterate through the entire posts state, printing out a "SinglePost" component for each element in posts. Some information
    from the individual post is also passed along in parameters to the component */}
      <section className="grid-container">
        {posts.map((post) => (
          <SinglePost getPosts={getPosts} post={post} key={post.post_id} />
        ))}
      </section>
    </section>
  );
}
