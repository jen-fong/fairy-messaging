import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddComment } from "../AddComment";

describe("AddComment", () => {
  let onAddCommentMock;
  beforeEach(() => {
    onAddCommentMock = jest.fn();
  });

  it("update the message field", () => {
    const newMessage = "This new awesome post message";

    const { getByLabelText, getByPlaceholderText } = render(
      <AddComment onAddComment={onAddCommentMock} />
    );
    const messageInput = getByLabelText("Reply Message");
    fireEvent.change(messageInput, {
      target: { name: "message", value: newMessage },
    });

    expect(getByPlaceholderText("Enter message").value).toEqual(newMessage);
  });

  it("update the author field", () => {
    const author = "Person";

    const { getByLabelText, getByPlaceholderText } = render(
      <AddComment onAddComment={onAddCommentMock} />
    );
    const nameInput = getByLabelText("Reply Name");
    fireEvent.change(nameInput, {
      target: { name: "name", value: author },
    });

    expect(getByPlaceholderText("Enter name").value).toEqual(author);
  });

  it("submits form with post data when submit button is clicked", () => {
    const newMessage = "a message";
    const author = "person";

    const { getByText, getByLabelText } = render(
      <AddComment onAddComment={onAddCommentMock} />
    );
    const messageInput = getByLabelText("Reply Message");
    fireEvent.change(messageInput, {
      target: { name: "message", value: newMessage },
    });
    const nameInput = getByLabelText("Reply Name");
    fireEvent.change(nameInput, {
      target: { name: "name", value: author },
    });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(onAddCommentMock.mock.calls[0][0]).toMatchObject({
      name: author,
      message: newMessage,
    });
  });
});
