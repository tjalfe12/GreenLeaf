import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

export default function SinglePost() {
    const [post, setPost] = useState({});
    const params = useParams();
    const url = `http://www.sabox.dk/backend/api.php?getpost=${params.postId}`;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const data = await response.json();
            setPost(data.data[0]);
            console.log(data.data)
        }

        getPost();
    }, [url]);

    return (
        <section className="page">
            <Post post={post} />
        </section>
    );
}
