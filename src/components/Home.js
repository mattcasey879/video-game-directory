import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getGameList } from "../actions";

const Home = (props) => {
  useEffect(() => {
    props.getGameList(1);
  }, []);
  const observer = useRef();
  const lastGame = useCallback((node) => {
    console.log(node);
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Visible");
        props.getGameList(props.page);
      }
    });
    if (node) observer.current.observe(node);
  });
  const { gameList, loading } = props;
  return (
    <div className="app-container">
      {gameList.map((game, index) => {
        if (gameList.length === index + 1) {
          return (
            <div ref={lastGame} className="game-container" key={game.slug}>
              <Link
                className="game-pic"
                to={`/game/${game.id}`}
                style={{ textDecoration: "none" }}
              >
                <img src={game.background_image} alt="Cover of game" />
                <div className="layer"></div>
                <h2 className="gameTitle">{game.name}</h2>
              </Link>
            </div>
          );
        } else {
          return (
            <div className="game-container" key={game.slug}>
              <Link
                className="game-pic"
                to={`/game/${game.id}`}
                style={{ textDecoration: "none" }}
              >
                <img src={game.background_image} alt="Cover of game" />
                <div className="layer"></div>
                <h2 className="gameTitle">{game.name}</h2>
              </Link>
            </div>
          );
        }
      })}
      {loading && <h1>Loading</h1>}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    gameList: state.gameList,
    loading: state.loading,
    page: state.page,
  };
};

export default connect(mapStateToProps, { getGameList })(Home);
