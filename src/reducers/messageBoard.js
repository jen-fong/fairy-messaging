import produce from "immer";
import { ADD_POST_COMMENT, ADD_POST } from "../constants";

export const initialState = {
  postsById: {},
};

export const messageBoardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_COMMENT:
        const { id, comment } = action.payload;
        const post = draft.postsById[id];
        post.comments.push(comment);
        break;

      case ADD_POST:
        const postId = action.payload.id;
        draft.postsById[postId] = {
          ...action.payload,
          comments: [],
        };
        break;

      default:
        return draft;
    }
  });
