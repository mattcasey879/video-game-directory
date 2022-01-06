import React, { useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getGameList, getGameByName } from "../actions";

const Home = (props) => {
  useEffect(() => {
    props.getGameList(1); // eslint-disable-next-line
  }, []);
  const observer = useRef(); // eslint-disable-next-line
  const lastGame = useCallback((node) => {
    if (props.loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        props.getGameList(props.page);
      }
    });
    if (node) observer.current.observe(node);
  });
  const [query, setQuery] = useState("");
  const { gameList, loading } = props;
  const handleSearch = (e) => {
    setQuery(e.target.value);
    e.preventDefault();
  };
  useEffect(() => {
    props.getGameByName(query); // eslint-disable-next-line
  }, [query]);

  const handleSubmit = (e) => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="search for a game!"
        ></input>
      </form>
      {query !== "" &&
        props.searchedList.map((g) => (
          <Link to={`/game/${g.id}`} style={{ textDecoration: "none" }}>
            <p className="searchedGame">{g.name}</p>
          </Link>
        ))}
      <div className="games-container">
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
        {loading && <div className="spinner"></div>}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    gameList: state.gameList,
    loading: state.loading,
    page: state.page,
    searching: state.searching,
    searchedList: state.searchedList,
  };
};

export default connect(mapStateToProps, { getGameList, getGameByName })(Home);
