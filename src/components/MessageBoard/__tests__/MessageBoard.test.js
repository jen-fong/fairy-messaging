import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { MessageBoard } from "../MessageBoard";

describe("MessageBoard", () => {
  let store, history, state, postsById;
  beforeEach(() => {
    history = createMemoryHistory();

    postsById = {
      1: {
        id: 1,
        title: "test post",
        author: "author",
        message: "Lorem ipsum dolor sit amet",
        comments: [
          {
            id: 1,
            name: "commenter 1",
            message: "great article!",
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
      },
      2: {
        id: 2,
        title: "test post 2",
        author: "author 2",
        message: "Lorem ipsum dolor sit ametaaaaaaakjsfk",
        comments: [],
        createdAt: new Date(),
      },
    };

    state = {
      messageBoard: {
        postsById,
      },
    };

    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: () => state,
    };
  });

  const renderWithStoreAndRouter = (Component) => {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <MessageBoard />
        </Router>
      </Provider>
    );
  };

  it("displays no posts message no posts have been made", () => {
    state.messageBoard.postsById = {};

    const { getByText } = renderWithStoreAndRouter();

    expect(
      getByText("There are currently no posts...add one!")
    ).toBeInTheDocument();
  });

  it("renders list of posts", () => {
    const { getByText } = renderWithStoreAndRouter();

    Object.entries(postsById).forEach(([postId, post]) => {
      expect(getByText(post.title)).toBeInTheDocument();
    });
  });

  it("goes to post create page when create post button is clicked", () => {
    jest.spyOn(history, "push");

    const { getByText } = renderWithStoreAndRouter();
    const createPostButton = getByText("Create New Post");
    fireEvent.click(createPostButton);

    expect(history.push).toHaveBeenCalledWith("/posts/create");
  });
});
