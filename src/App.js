import "./App.css";
import React from "react";
import {Route} from 'react-router-dom'
import Home from "./components/Home"
import Game from "./components/Game"

function App() {
return (
<div className="App">
  <h2>Hello</h2>
  <Route exact path='/'>
    <Home/>
  </Route>
  <Route path="/game">
    <Game/>
  </Route>
</div>
)
}

export default App;
