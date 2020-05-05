import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as postActions from "../../../actions/post";
import { ViewPost } from "../ViewPost";

describe("ViewPost", () => {
  let store, history, state, testPostData;
  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ["/posts/1"],
    });
    postActions.addPostComment = jest.fn();

    testPostData = {
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
    };
    state = {
      messageBoard: {
        postsById: {
          1: testPostData,
        },
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
          <Route path="/posts/:id">
            <ViewPost />
          </Route>
        </Router>
      </Provider>
    );
  };

  it("displays post and author", () => {
    const { getByText } = renderWithStoreAndRouter();

    expect(getByText(testPostData.title)).toBeInTheDocument();
    expect(getByText(`By: ${testPostData.author}`)).toBeInTheDocument();
  });

  it("displays a message when no comments", () => {
    testPostData.comments = [];

    const { getByText } = renderWithStoreAndRouter();

    expect(getByText("There are no comments yet")).toBeInTheDocument();
  });

  it("displays a list of comments when there are comments", () => {
    const { getByText } = renderWithStoreAndRouter();

    testPostData.comments.forEach((comment) => {
      expect(getByText(comment.message)).toBeInTheDocument();
    });
  });

  it("goes back to homepage when back button is clicked", () => {
    jest.spyOn(history, "push");
    const { getByText } = renderWithStoreAndRouter();

    const backButton = getByText("Back");
    fireEvent.click(backButton);

    expect(history.push).toHaveBeenCalledWith("/");
  });

  it("dispatches addPostComment to add comment when submit is clicked", () => {
    const { getByText } = renderWithStoreAndRouter();

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalled();
    expect(postActions.addPostComment).toHaveBeenCalled();
  });
});
