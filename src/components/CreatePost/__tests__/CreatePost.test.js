import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as postActions from "../../../actions/post";
import { CreatePost } from "../CreatePost";

describe("CreatePost", () => {
  let store, history;
  beforeEach(() => {
    history = createMemoryHistory();
    postActions.addPost = jest.fn();

    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: () => ({}),
    };
  });

  const renderWithStoreAndRouter = (Component) => {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <CreatePost />
        </Router>
      </Provider>
    );
  };

  it("update the title field", () => {
    const createPostTitle = "A new post";

    const { getByLabelText, getByPlaceholderText } = renderWithStoreAndRouter();
    const titleInput = getByLabelText("Title");
    fireEvent.change(titleInput, {
      target: { name: "title", value: createPostTitle },
    });

    expect(getByPlaceholderText("Enter title").value).toEqual(createPostTitle);
  });

  it("update the message field", () => {
    const newMessage = "This new awesome post message";

    const { getByLabelText, getByPlaceholderText } = renderWithStoreAndRouter();
    const messageInput = getByLabelText("Message");
    fireEvent.change(messageInput, {
      target: { name: "message", value: newMessage },
    });

    expect(getByPlaceholderText("Enter message").value).toEqual(newMessage);
  });

  it("update the author field", () => {
    const author = "Person";

    const { getByLabelText, getByPlaceholderText } = renderWithStoreAndRouter();
    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, {
      target: { name: "author", value: author },
    });

    expect(getByPlaceholderText("Enter your name").value).toEqual(author);
  });

  it("cancels and returns to main page when cancel button is clicked", () => {
    jest.spyOn(history, "push");

    const { getByText } = renderWithStoreAndRouter();
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(history.push).toHaveBeenCalledWith("/");
  });

  it("submits form with post data when submit button is clicked", () => {
    jest.spyOn(history, "push");
    const createPostTitle = "new title";
    const newMessage = "a message";
    const author = "person";

    const { getByText, getByLabelText } = renderWithStoreAndRouter();
    const titleInput = getByLabelText("Title");
    fireEvent.change(titleInput, {
      target: { name: "title", value: createPostTitle },
    });
    const messageInput = getByLabelText("Message");
    fireEvent.change(messageInput, {
      target: { name: "message", value: newMessage },
    });
    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, {
      target: { name: "author", value: author },
    });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(history.push).toHaveBeenCalledWith("/");
    expect(postActions.addPost.mock.calls[0][0]).toMatchObject({
      author,
      message: newMessage,
      title: createPostTitle,
    });
  });
});
