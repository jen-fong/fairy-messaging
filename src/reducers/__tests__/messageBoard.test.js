import { ADD_POST, ADD_POST_COMMENT } from "../../constants";
import { messageBoardReducer, initialState } from "../messageBoard";

describe("messageBoard reducers", () => {
  let testPostData;
  beforeEach(() => {
    testPostData = {
      id: 1,
      title: "new title",
      message: "a new message",
      author: "somebody",
      createdAt: new Date(),
    };
  });

  it(`adds new post to existing data when ${ADD_POST}`, () => {
    const newState = messageBoardReducer(initialState, {
      type: ADD_POST,
      payload: testPostData,
    });

    expect(newState).toEqual({
      ...initialState,
      postsById: {
        1: {
          ...testPostData,
          comments: [],
        },
      },
    });
  });

  it(`adds a comment to post when ${ADD_POST_COMMENT}`, () => {
    const postComment = {
      id: 1,
      name: "person name",
      message: "a very nice message on post",
      createdAt: new Date(),
    };
    testPostData.comments = [];
    initialState.postsById[1] = testPostData;

    const newState = messageBoardReducer(initialState, {
      type: ADD_POST_COMMENT,
      payload: {
        id: 1,
        comment: postComment,
      },
    });

    expect(newState).toEqual({
      postsById: {
        1: {
          ...testPostData,
          comments: [...testPostData.comments, postComment],
        },
      },
    });
  });
});
