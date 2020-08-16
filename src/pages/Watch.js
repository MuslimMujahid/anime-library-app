import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SimpleNav } from '../templates/StyledNavbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Page = styled.div`
    position: relative;
    .Player {
        width: 100%;
        top: 70px;
        position: relative;
    }
    .selectEps {
        width: 60px;
    }
`

const CustomNav = styled(SimpleNav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

function Watch(props) {

    const [state, setState] = useState({
        title: props.match.params.title,
        Data: undefined,
        EpsPlaying: 0
    })

    useEffect(() => {
        const url = `http://localhost:5000/anime/${state.title}`
        axios.get(url).then(res => {
            setState({ ...state, Data: res.data })
        })
    }, [])

    function changeEpsPlayingHandler(event) {
        event.persist()
        setState({ ...state, EpsPlaying: event.target.value })
    }

    const { Data, EpsPlaying, title } = state 
    if (!Data) return 'Loading ...'

    const { epsLink } = Data
    const VideoUrl = `http://localhost:5000/library/${title}/${epsLink[EpsPlaying]}` 
    const epsList = epsLink.map((eps, index) => <option value={index}>{index+1}</option>)
    return (    
        <Page>
            <CustomNav>
                <Link to="/"> <ArrowBackIcon /> </Link>
                <div className="titleName">{title}</div>
                <StyledInputSelect 
                    className="selectEps" 
                    onChange={changeEpsPlayingHandler}
                >
                    {epsList}
                </StyledInputSelect>
            </CustomNav>
            <video 
                key={VideoUrl} 
                className="Player" 
                id="video" 
                controls autoPlay 
                preload="metadata"
            >
                <source src={VideoUrl} type="video/mp4" />
            </video>
        </Page>
    )
}

export default Watch