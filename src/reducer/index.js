import {
    GET_GAME_LOADING,
    GET_GAME_LIST_SUCCESS,
    GET_GAME_LIST_FAIL,
    GET_GAME_SUCCESS,
    GET_GAME_FAIL,
    SEARCHING_FOR_GAME
} from '../actions/index'

const INITIAL_STATE = {
    gameList: [],
    loading: false,
    error: null,
    game: {},
    page: 1,
    searching: false,
    searchedList: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_GAME_LOADING:
        return({
            ...state,
            loading: true
        })
        case GET_GAME_LIST_SUCCESS:
        return({
            ...state,
            loading: false,
            gameList: state.gameList.concat(action.payload),
            page: state.page + 1
        })
        case GET_GAME_LIST_FAIL:
        return({
            ...state,
            loading: false,
            error: action.payload
        })
        case GET_GAME_SUCCESS:
        return({
            ...state,
            loading: false,
            game: action.payload
        })
        case GET_GAME_FAIL:
        return({
            ...state,
            loading: false,
            error: action.payload
        })
        case SEARCHING_FOR_GAME:
            return({
                ...state,
                searching: true,
                loading: false,
                searchedList: action.payload,
            })
        default:
            return state
    }
}

export default reducer