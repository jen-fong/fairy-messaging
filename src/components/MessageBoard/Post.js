import React from "react";
import Card from "react-bootstrap/Card";
import { FaPlay } from "react-icons/fa";
import { formatDate } from "../../utils";

export function Post({ post, onClick }) {
  const handleClick = () => onClick(post.id);
  const formatedDate = formatDate(post.createdAt, " @");

  return (
    <Card
      data-testid="messageBoardPost"
      onClick={handleClick}
      className="mt-3 message-board-post"
    >
      <Card.Body className="d-flex justify-content-between">
        <div className="message-board-post-content">
          <header>
            <h4 className="message-board-post-title">{post.title}</h4>
          </header>

          <span>Posted By: {post.author}</span>

          <div className="d-flex">
            <span>{post.comments.length} Comments</span>
            <span className="ml-auto mr-5">Last Update: {formatedDate}</span>
          </div>
        </div>

        <div className="text-black-50 mt-4">
          <FaPlay size={32} />
        </div>
      </Card.Body>
    </Card>
  );
}
