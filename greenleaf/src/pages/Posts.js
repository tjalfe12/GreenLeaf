import { useState, useEffect } from "react";

export default function Posts() {
const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url = "http://www.sabox.dk/backend/api.php?getallposts";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.data)
            setPosts(data.data);
        }
        getPosts();
    }, []);

    return (
        <section className="page">
            <section className="grid-container">
                {posts.map(post => (
                  <div>
                    <img src={post.postImg_url} alt="food items"/>
                    <h1>{post.post_title}</h1>
                    <p>{post.post_description}</p>
                    <hr/>
                  </div>
                ))}

            </section>
        </section>
    );
}
