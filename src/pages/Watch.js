import React, { useEffect, useReducer, useState, useContext } from 'react'
import styled from 'styled-components'
import { SimpleNav } from '../templates/StyledNavbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Player from '../components/VideoPlayer'
import { DatabaseContext, getHttpPath, selectById } from '../contexts/DatabaseContext'

const Page = styled.div`
    .Player {
        width: 100%;
        margin-top: 70px;
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

function Watch(props) {

    const { database, setDatabase } = useContext(DatabaseContext)
    const [itemPlaying, setItemPlaying] = useState(null)
    const [epsPlaying, setEpsPlaying] = useState(0)

    useEffect(() => {
        const select = selectById(database, props.match.params.id)
        setItemPlaying(select)
    }, [])

    if (!itemPlaying) return 'Loading ...'
    return (    
        <Page>
            <CustomNav>
                <Link to="/"> <ArrowBackIcon /> </Link>
                <TitleContainer>{itemPlaying.title}</TitleContainer>
                <CustomInputSelect onChange={e => setEpsPlaying(e.target.value)}>
                    {
                        itemPlaying.eps.map((ep, index) => 
                            <option key={itemPlaying.eps[index].epTitle} value={index}>{index+1}</option>
                        )
                    }
                </CustomInputSelect>
            </CustomNav>
            <Player 
                key={`${getHttpPath(database, itemPlaying.id)}/${itemPlaying.eps[epsPlaying].epTitle}`} 
                src={`${getHttpPath(database, itemPlaying.id)}/${itemPlaying.eps[epsPlaying].epTitle}`} 
                className="Player" 
            />
        </Page>
    )
}

export default Watch