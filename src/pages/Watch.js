import React, { useEffect, useState } from 'react'
import { Player } from 'video-react'
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

function Watch({match:{params: {title}}}) {

    const [Data, setData] = useState(null)
    const [EpsPlaying, setEpsPlaying] = useState(0)

    useEffect(() => {
        const url = `http://localhost:5000/anime/${title}`
        axios.get(url)
          .then(res => {
            setData(res.data)
          })
      }, []) 
    

    function changeEpsPlaying(event) {
        setEpsPlaying(event.target.value)
    }

    if (Data != null) {
        const { epsLink } = Data
        let VideoUrl = `http://localhost:5000/library/${title}/${epsLink[EpsPlaying]}` 
        const epsList = epsLink.map((eps, index) => <option value={index}>{index+1}</option>)
        return (    
            <Page>
                <CustomNav>
                    <Link to="/"><ArrowBackIcon /></Link>
                    <div className="titleName">{title}</div>
                    <StyledInputSelect 
                        className="selectEps" 
                        onChange={changeEpsPlaying}
                    >
                        {epsList}
                    </StyledInputSelect>
                </CustomNav>
                <Player
                    className="Player"             
                    PlaysInline 
                    src={VideoUrl} 
                    type="video/mp4"
                />
            </Page>
        )
    } else { return 'Loading' }
    
}

export default Watch