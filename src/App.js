import "./App.css";
import React from "react";
import {Route} from 'react-router-dom'
import Home from "./components/Home"
import Game from "./components/Game"

function App() {
return (
<div className="App">
  <h2>Hello</h2>
  <Route exact path='/' component={Home}/>
  <Route path="/game/:id">
    <Game/>
  </Route>
</div>
)
}

export default App;
