import React from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getPosts } from "../../selectors";
import { Post } from "./Post";

export function MessageBoard() {
  const history = useHistory();
  const posts = useSelector(getPosts);

  const handlePostClick = (postId) => {
    console.log("move to next page");
    // history.push(`/posts/${postId}`);
  };

  return (
    <section className="message-board">
      <header className="text-center">
        <h2>The Fairygodboss Message Board</h2>
      </header>

      <div className="message-board-posts">
        {!posts.length ? (
          <div className="message-board-posts-none">
            There are currently no posts...add one!
          </div>
        ) : (
          posts.map((post) => {
            return <Post key={post.id} post={post} onClick={handlePostClick} />;
          })
        )}
      </div>

      <div className="d-flex flex-row-reverse mt-3">
        <Link to="/posts/create">
          <Button variant="primary">Create New Post</Button>
        </Link>
      </div>
    </section>
  );
}
