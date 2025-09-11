// src/assets/components/PostCard.jsx
import "../../App.css";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.name}</h3>
      <p className="post-msg">{post.message}</p>
      {post.image && (
        <img
          src={post.image}
          alt="uploaded"
          className="post-image"
        />
      )}
    </div>
  );
}

export default PostCard;
