import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getGameById } from "../actions";
import { connect } from "react-redux";

const Game = (props) => {
  const { game, loading } = props;
  const { id } = useParams();
  const { push } = useHistory();
  useEffect(() => {
    props.getGameById(id);
    console.log(game); // eslint-disable-next-line
  }, []);
  const handleClick = () => {
    push("/");
    window.location.reload()
  };
  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <img className="game-component"src={game.background_image} alt="game pic" />
          <h1>{game.name}</h1>

          <p>{game.description_raw}</p>
          <button onClick={handleClick}>Back</button>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    game: state.game,
    loading: state.loading,
    gameList: state.gameList
  };
};

export default connect(mapStateToProps, { getGameById })(Game);
