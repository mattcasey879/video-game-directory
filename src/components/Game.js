import React,{useEffect} from "react"
import {useParams, useHistory} from 'react-router-dom'
import { getGameById } from "../actions"
import { connect } from "react-redux"

const Game = (props) => {
    const{game} = props
    const {id} = useParams()
    const {push} = useHistory()
    useEffect(() => {
        props.getGameById(id)
        console.log(game)
    },[])
    return(
        <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt="game pic"/>
           <p>{game.description_raw}</p>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        game: state.game,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {getGameById})(Game);