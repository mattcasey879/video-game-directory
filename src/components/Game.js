import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getGameById } from "../actions";
import { connect } from "react-redux";

const Game = (props) => {
  const { game, loading } = props;
  const { id } = useParams();
  useEffect(() => {
    props.getGameById(id); //eslint-disable-next-line
  }, []);

  const history = useHistory();

  const handleClick = () => {
    history.push("/");
    window.location.reload();
  };
  const platSet = new Set();
  if (game.platforms === undefined) {
    return [];
  } else {
    game.platforms.forEach((p) => {
      if (p.platform.slug.includes("xbox")) {
        platSet.add("xbox");
      } else if (p.platform.slug.includes("playstation")) {
        platSet.add("playstation");
      } else if (p.platform.slug === "pc") {
        platSet.add("pc");
      } else if (p.platform.slug === "nintendo-switch") {
        platSet.add("switch");
      }
    });
  }
  const platformsArray = [...platSet];
  const availablePlatforms = [];
  platformsArray.forEach((p) => {
    if (p === "switch") {
      availablePlatforms.push(
        <span key="switch" className="iconify" data-icon="mdi:nintendo-switch" data-width="38"></span>
      );
    }
    if (p === "xbox") {
      availablePlatforms.push(
        <span key='xbox' className="iconify" data-icon="fontisto:xbox" data-width="38"></span>
      );
    }
    if (p === 'playstation') {
      availablePlatforms.push(<span key="ps" className="iconify" data-icon="cib:playstation" data-width="38"></span>)
    }
    if(p === 'pc') {
      availablePlatforms.push(<span key="pc" className="iconify" data-icon="raphael:pc" data-width="38"></span>)
    }
  });

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <img
            className="game-component"
            src={game.background_image}
            alt="game pic"
          />
          <img
          className="game-component"
          src={game.background_image_additional}
          alt='additional-pic'/>
          <h1 className="game-comTitle">{game.name}</h1>
          <p className="game-des">{game.description_raw}</p>
          <h3 className="available-plats">Available Platforms:</h3>
          <div className="platforms">{availablePlatforms.map((p) => p)}</div>
          
        </div>
      )}
      <span className="back-btn" onClick={handleClick}>Home</span>
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
