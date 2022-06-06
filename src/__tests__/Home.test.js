import React from "react";
import { cleanup, render, fireEvent, getByTestId, queryByTestId } from "@testing-library/react";
import '@testing-library/jest-dom'
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Home from "../components/Home";
import { BrowserRouter as Router } from "react-router-dom";
import {TestGameArray, Testgame} from '../testData/Mock-game-data'
import {getGameList, getGameById, getGameByName} from '../actions/index'

afterEach(() => {
  cleanup();
});

const startingState = {
  gameList: [],
  loading: false,
  error: null,
  game: {},
  page: 1,
  searching: false,
  searchedList: [],
};
const reducer = (state = startingState, action) => {
  switch (action.type) {
    case "GET_GAME_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_GAME_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        gameList: state.gameList.concat(action.payload),
        page: state.page + 1,
      };
    case "GET_GAME_LIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        game: action.payload,
      };
    case "GET_GAME_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SEARCHING_FOR_GAME":
      return {
        ...state,
        searching: true,
        loading: false,
        searchedList: action.payload,
      };
    default:
      return state;
  }
};

const renderWithRedux = (
  component,
  { store = createStore(reducer, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
    ),
  };
};

describe("Testing Redux", () => {
  it("renders with redux", () => {
    renderWithRedux(<Home />);
  });

  it('renders Header', () => {
  const { getByTestId } = renderWithRedux(<Home/>);
  const header = getByTestId("header")
  expect(header).toBeInTheDocument()
  console.log(getGameList())
  }) 
});


