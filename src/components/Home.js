import React, {useEffect, useState} from "react"
import axios from "axios";

const Home  = () => {
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
      <div className="app-container">
        {data.length === 0 ? (
          <h2>loading</h2>
        ) : (
          data.map((game) => {
            return (
              <div className="game-container" key={game.slug}>
                <h2>{game.name}</h2>
                <img className='game-pic' src={game.background_image} alt='Cover of game'/>
              </div>
            );
          })
        )}
      </div>
    );
}

export default Home;