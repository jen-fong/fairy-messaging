import React from "react";
import { Switch, Route } from "react-router-dom";
import { MessageBoard } from "./components/MessageBoard";
import { ViewPost } from "./components/ViewPost";
import { CreatePost } from "./components/CreatePost";

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/posts/create">
          <CreatePost />
        </Route>
        <Route path="/posts/:id">
          <ViewPost />
        </Route>
        <Route path="/">
          <MessageBoard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
