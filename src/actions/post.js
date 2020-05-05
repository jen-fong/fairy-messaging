import { ADD_POST_COMMENT, ADD_POST } from "../constants";

export const addPostComment = (comment) => {
  return {
    type: ADD_POST_COMMENT,
    payload: comment,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};
