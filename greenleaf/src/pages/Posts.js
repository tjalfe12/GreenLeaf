import { useState, useEffect } from "react";
import SinglePost from "../components/Post"

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
                    <SinglePost post={post} key={post.post_id}/>
                ))}

            </section>
        </section>
    );
}
