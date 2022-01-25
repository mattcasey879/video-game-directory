import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game/:id">
          <Game />
        </Route>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
