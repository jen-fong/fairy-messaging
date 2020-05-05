export const getPosts = (state) => {
  return Object.keys(state.messageBoard.postsById)
    .map((postId) => state.messageBoard.postsById[postId])
    .sort((a, b) => a.createdAt - b.createdAt);
};
