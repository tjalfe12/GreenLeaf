import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { NavLink } from "react-router-dom";

export default function SinglePost(props) {
  const [post, setPost] = useState({});
  const params = useParams();
  const url = `http://www.sabox.dk/backend/api.php?getpost=${params.postId}`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
      setPost(data.data[0]);
    }

    getPost();
  }, [url]);

  return (
    <section className="page">
      <Post getPosts={props.getPosts} post={post} single="true" />
      <NavLink to="/posts">
        <button>Back</button>
      </NavLink>
    </section>
  );
}
