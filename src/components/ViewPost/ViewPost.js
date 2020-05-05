import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { formatDate } from "../../utils";
import { addPostComment } from "../../actions/post";
import { AddComment } from "./AddComment";
import Button from "react-bootstrap/Button";

export function ViewPost() {
  const routeParams = useParams();
  const { id } = routeParams;
  const post = useSelector((state) => state.messageBoard.postsById[id]);
  const formatedDate = formatDate(post.createdAt, " ");

  const dispatch = useDispatch();
  const handleAddComment = (comment) => {
    dispatch(
      addPostComment({
        id,
        comment,
      })
    );
  };

  if (!post) {
    return <section>Post not found</section>;
  }

  return (
    <section className="view-post-container">
      <header className="d-flex ">
        <div className="mr-auto">
          <h2 className="m-0">{post.title}</h2>
          <div>
            By: {post.author} on {formatedDate}
          </div>
        </div>

        <div className="mt-3">
          <Link to="/">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>
      </header>
      <div className="mt-3 view-post-message">{post.message}</div>

      <div className="view-post-comments">
        <h5>Responses</h5>
        {!post.comments.length ? (
          <div>
            <p className="text-secondary">There are no comments yet</p>
          </div>
        ) : (
          post.comments.map((comment) => {
            return (
              <div className="ml-4 mr-4 pb- view-post-comment" key={comment.id}>
                <p className="font-weight-bold">{comment.name}</p>
                <p>{comment.message}</p>
              </div>
            );
          })
        )}
      </div>

      <div>
        <AddComment onAddComment={handleAddComment} />
      </div>
    </section>
  );
}
