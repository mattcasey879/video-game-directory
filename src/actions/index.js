import axios from "axios";

export const GET_GAME_LIST_SUCCESS = "GET_GAME_LIST_SUCCESS";
export const GET_GAME_LIST_FAIL = "GET_GAME_LIST_FAIL";

export const GET_GAME_SUCCESS = "GET_GAME_SUCCESS";
export const GET_GAME_FAIL = "GET_GAME_FAIL";

export const GET_GAME_LOADING = "GET_GAME_LOADING";

const api_key = "ccf87acd225b44498a3b6dd28aaa475b";

export const getGameList = (pageNum) => (dispatch) => {
  console.log("HITTING GAME LIST FUNCTION");
  dispatch({ type: GET_GAME_LOADING });
  axios
    .get(`https://api.rawg.io/api/games?key=${api_key}&page_size=24&page=${pageNum}`)
    .then((res) => {
      console.log(res.data.results);
      dispatch({ type: GET_GAME_LIST_SUCCESS, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: GET_GAME_LIST_FAIL, payload: err.error });
    });
};

export const getGameById = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_GAME_LOADING });
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${api_key}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_GAME_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_GAME_FAIL, payload: err.error });
      });
  };
};
