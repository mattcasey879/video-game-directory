import React, { useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getGameList, getGameByName } from "../actions";

const Home = (props) => {
  let { getGameList, getGameByName, page, gameList, loading } = props

  useEffect(() => {
    getGameList(1); 
  }, [getGameList]);
  
  // infinte-scrolling implemented here
  const observer = useRef();
  const lastGame = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getGameList(page);
      }
    });
    if (node) observer.current.observe(node);
  }, [getGameList, page, loading]);
  //


  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    e.preventDefault();
  };
  useEffect(() => {
    getGameByName(query); 
  }, [getGameByName, query]);

  const handleSubmit = (e) => {};
  return (
    <div>
      <h1 data-testid='header' className="app-title">Video Game Directory</h1>
      <form onSubmit={handleSubmit}>
        <label className="game-filter"> Looking for a specific game?
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="search here!"
          ></input>
        </label>
      </form>
      {query !== "" &&
        props.searchedList.map((g) => (
          <Link to={`/game/${g.id}`} style={{ textDecoration: "none" }}>
            <p className="searchedGame">{g.name}</p>
          </Link>
        ))}
      <div className="games-container">
        {gameList.map((game, index) => {
            return (
              <div data-testid='game' ref={gameList.length === index + 1 ? lastGame: null} className="game-container" key={game.slug}>
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
