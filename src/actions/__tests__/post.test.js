import configureMockStore from "redux-mock-store";
import { ADD_POST, ADD_POST_COMMENT } from "../../constants";
import * as postActions from "../post";

const mockStore = configureMockStore();

describe("gallery actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  describe("addPost", () => {
    it("dispatches action for adding a post", () => {
      const post = {
        id: 1,
        title: "new title",
        message: "a new message",
        author: "somebody",
        createdAt: new Date(),
      };

      store.dispatch(postActions.addPost(post));

      expect(store.getActions()).toEqual([{ type: ADD_POST, payload: post }]);
    });
  });

  describe("addPostComment", () => {
    it("dispatches action to add a comment to a post", () => {
      const postComment = {
        id: 1,
        name: "test",
        message: "test message",
        createdAt: new Date(),
      };

      store.dispatch(postActions.addPostComment(postComment));

      expect(store.getActions()).toEqual([
        { type: ADD_POST_COMMENT, payload: postComment },
      ]);
    });
  });
});
