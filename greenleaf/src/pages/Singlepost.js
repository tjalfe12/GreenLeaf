import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { NavLink } from "react-router-dom";

export default function SinglePost(props) {
  const [post, setPost] = useState({});
  const params = useParams();
  //We use the params to retrieve the post id and put it into an URL.
  const url = `http://www.sabox.dk/backend/api.php?getpost=${params.postId}`;

  //When the url state is changed, this retrieves post data from server for the individual post and stores it in the post state.
  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
      setPost(data.data[0]);
    }

    getPost();
  }, [url]);

  return (
    <section className="post-page">
      <div className="singlePostForm">
        {/* Prints out a Post component */}
        <Post getPosts={props.getPosts} post={post} single="true" />
        <NavLink to="/posts">
          <button>Back</button>
        </NavLink>
      </div>
    </section>
  );
}
