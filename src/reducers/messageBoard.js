import produce from "immer";
import { ADD_POST_COMMENT, ADD_POST } from "../constants";

export const initialState = {
  postsById: {
    //   1: {
    //     id: 1,
    //     title: "test post",
    //     author: "jenny",
    //     message:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     comments: [
    //       {
    //         id: 1,
    //         name: "cockatiel",
    //         message: "hello my name is bird",
    //       },
    //     ],
    //     createdAt: new Date("2019-06-28"),
    //   },
    //   2: {
    //     id: 2,
    //     title: "test post 2",
    //     author: "jenny",
    //     message:
    //       "Maecenas volutpat blandit aliquam etiam erat. Diam ut venenatis tellus in metus. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Integer malesuada nunc vel risus commodo. Id diam vel quam elementum. Tempus iaculis urna id volutpat. Ut tellus elementum sagittis vitae et. Sed ullamcorper morbi tincidunt ornare massa eget. Diam sit amet nisl suscipit adipiscing bibendum est. Pellentesque diam volutpat commodo sed egestas. Nibh praesent tristique magna sit amet purus gravida. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar p",
    //     comments: [],
    //     createdAt: new Date("2019-06-10"),
    //   },
  },
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
