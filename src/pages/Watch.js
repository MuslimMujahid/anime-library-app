import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { SimpleNav } from '../templates/StyledNavbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Player from '../components/VideoPlayer'

const Page = styled.div`
    /* position: relative; */
    .Player {
        width: 100%;
        margin-top: 70px;
        /* position: absolute; */
    }
`

const CustomNav = styled(SimpleNav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CustomInputSelect = styled(StyledInputSelect)`
    width: 60px;
`

const TitleContainer = styled.div``

const Action = {
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR'
}

const reducer = (state, action) => {
    switch (action.type) {
        case Action.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case Action.FETCH_ERROR:
            return {
                ...state,
                loading: true,
                data: {}
            }
        default:
            return state
    }
}

function Watch(props) {

    const initialState = {
        loading: true,
        data: {}
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const [epsPlaying, setEpsPlaying] = useState(0)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/anime/${props.match.params.title}`)
            .then(res => {
                dispatch({ type: Action.FETCH_SUCCESS, payload: res.data })
            }).catch(error => {
                dispatch({ type: Action.FETCH_ERROR })
            })
    }, [props.match.params.title])

    function changeEpsPlayingHandler(event) {
        event.persist()
        setEpsPlaying(event.target.value)
    }

    if (state.loading) return 'Loading ...'

    const { epsLink } = state.data
    const title = props.match.params.title
    const VideoUrl = `http://localhost:5000/library/${title}/${epsLink[epsPlaying]}` 
    const epsList = epsLink.map((eps, index) => <option key={eps} value={index}>{index+1}</option>)
    return (    
        <Page>
            <CustomNav>
                <Link to="/"> <ArrowBackIcon /> </Link>
                <TitleContainer>{title}</TitleContainer>
                <CustomInputSelect onChange={changeEpsPlayingHandler}>
                    {epsList}
                </CustomInputSelect>
            </CustomNav>
            <Player key={VideoUrl} src={VideoUrl} className="Player" />
        </Page>
    )
}

export default Watch