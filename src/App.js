
import "./App.css";
import axios from "axios";
import { React, useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const api_key = "ccf87acd225b44498a3b6dd28aaa475b";
  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games?key=${api_key}&page_size=50`)
      .then((res) => {
        setData(res.data.results);
      });
  }, []);
  console.log(data);

  return (
    <div className="App">
      {data.length === 0 ? (
        <h2>loading</h2>
      ) : (
        data.map((game) => {
          return (
            <div>
              <h2>{game.name}</h2>
              <img src={game.background_image} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
