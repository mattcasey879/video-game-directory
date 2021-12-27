import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getGameList } from "../actions";

const Home = (props) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`https://api.rawg.io/api/games?key=${api_key}&page_size=50`)
  //     .then((res) => {
  //       setData(res.data.results);
  //     });
  // }, []);
  // console.log(data);
  useEffect(() => {
    console.log(getGameList());
    props.getGameList();
  }, []);
  const { gameList, loading } = props;

  return (
    <div className="app-container">
      {loading ? (
        <h2>loading</h2>
      ) : (
        gameList.map((game) => {
          return (
            <div className="game-container" key={game.slug}>
              <Link to={`/game/${game.id}`}>
                <img
                  className="game-pic"
                  src={game.background_image}
                  alt="Cover of game"
                />
              </Link>
              <h2 className="gameTitle">{game.name}</h2>
              <h3>Available Platforms:</h3>
                <div className="platform-container">
                  {" "}
                  {game.platforms.map((plat) => {
                    return <p key={plat.platform.name}>{plat.platform.name}</p>;
                  })}
                </div>
            </div>
          );
        })
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    gameList: state.gameList,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { getGameList })(Home);
