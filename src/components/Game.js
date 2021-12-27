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
    console.log(game);
  }, []);
  const handleClick = () => {
    push("/");
  };
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <img src={game.background_image} alt="game pic" />
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
  };
};

export default connect(mapStateToProps, { getGameById })(Game);
