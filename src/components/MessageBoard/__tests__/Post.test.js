import React from "react";
import { render, fireEvent } from "@testing-library/react";
import format from "date-fns/format";
import { Post } from "../Post";

describe("MessageBoard Post", () => {
  let post, mockClickHandler;
  beforeEach(() => {
    mockClickHandler = jest.fn();

    post = {
      id: 1,
      title: "test post",
      author: "author name",
      message: "Lorem ipsum dolor sit amet",
      comments: [
        {
          id: 1,
          name: "bird",
          message: "great post",
          createdAt: new Date(),
        },
        {
          id: 2,
          name: "cat",
          message: "good read",
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    };
  });

  it("displays title, author, comments count, and updated date", () => {
    const { getByText } = render(
      <Post post={post} onClick={mockClickHandler} />
    );

    const formatedDate = format(post.createdAt, "P @p");
    expect(getByText(post.title)).toBeInTheDocument();
    expect(getByText(`Posted By: ${post.author}`)).toBeInTheDocument();
    expect(getByText(`${post.comments.length} Comments`)).toBeInTheDocument();
    expect(getByText(`Last Update: ${formatedDate}`)).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const { getByTestId } = render(
      <Post post={post} onClick={mockClickHandler} />
    );
    const postItem = getByTestId("messageBoardPost");
    fireEvent.click(postItem);

    expect(mockClickHandler).toHaveBeenCalled();
  });
});
