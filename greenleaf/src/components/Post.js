import { useNavigate } from "react-router-dom";

export default function SinglePost({ post }) {
    const navigate = useNavigate();

    /**
     * handleClick is called when user clicks on the Article (PostCard)
     */
    function handleClick() {
        navigate(`/single/${post.post_id}`);
    }

    return (
        <article onClick={handleClick}>
            <h3>{post.first_name} {post.last_name}</h3>
            <img src={post.postImg_url} alt={post.title} />
            <h2>{post.post_title}</h2>
            <h5>expiration date: {post.expiration_date}</h5>
            <p>{post.post_description}</p>
            <hr/>
        </article>
    );
}
