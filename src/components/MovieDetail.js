import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { SimpleNav } from '../templates/StyledNavbar'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios' 
import uuid from 'uuid'
import { DatabaseContext, getHttpPath, getHttpCoverPath, updateWatched } from '../contexts/DatabaseContext'

const Container = styled.div`
    background-color: #ffffff;
    position: fixed;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    z-index: 4;
    grid-column-gap: 12px;
    grid-row-gap: 5px;
    padding: 12px;
    max-width: 800px;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    max-height: 100vh;
`

const CustomNav = styled.div`
    position: relative;
    grid-column: span 2;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .closeIcon {
        position: absolute;
        right: 12px;
        border-radius: 50%;
        transition: all ease-in 0.1s;
        
        &:hover {
            cursor: pointer;
            background-color: #ebebeb;
        }
    }
`

const LeftContainer = styled.div`

    img {
        width: 100%;
    }
`
const RightContainer = styled.div`
    padding: 0 12px;
    overflow-y: auto;
    max-height: 90vh;

    .watchButton {
        margin-right: 8px;
    }
`

const CustomButton = styled.button`
    border: none;
    padding: 8px 12px;
    font-size: 10px;
    background-color: #ebebeb;
    transition: all ease-in 0.1s;

    &:hover {
        cursor: pointer;
        background-color: #0075F2;
        color: #ffffff;
    }
`

const ListItem = styled.li`
    width: 100%;
    margin-top: 8px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px black;


    .Index {
        background-color: #403635;
        font-size: 12px;
        color: #ffffff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .epTitle {
        /* background-color: #b5b5b5; */
        width: 100%;
        height: 100%;
        font-size: 16px;
        padding: 3px 5px 3px 7px;
    }
`

const Options = styled.div`
    display: flex;
    justify-content: flex-end;
`

function MovieDetail({ itemDisplayed, removeDisplay, watchedList, setWatchedList }) {

    const { database, setDatabase } = useContext(DatabaseContext)

    const markAsWatchedHandler = (event) => {
        event.persist()
        const eps = parseInt(event.target.value)
        updateWatched(database, setDatabase, itemDisplayed.id, eps)

        watchedList.includes(eps)
        ? setWatchedList(watchedList.filter(x => x !== eps))
        : setWatchedList([...watchedList, eps]);
    }

    const checkAllHandler = () => {
        itemDisplayed.eps.forEach((ep, index) => {
            if (!watchedList.includes(index)) {
                (async () => {
                    await setWatchedList(await [...watchedList, index])
                    return await index
                })()
                .then(ep => {
                    updateWatched(database, setDatabase, itemDisplayed.id, ep)
                })
            }
        })
    }

    return (
        <Container>
            <CustomNav> 
                <div className="title"> {itemDisplayed.epTitle} </div>
                <button onClick={removeDisplay}><CloseIcon className="closeIcon"/></button>
            </CustomNav>
            <LeftContainer>
                <img src={getHttpCoverPath(database, itemDisplayed.id)} alt="temporary"/>
            </LeftContainer>
            <RightContainer>
                <Link to={`/watch/${itemDisplayed.id}`} className="watchButton">
                    <CustomButton>
                        Watch
                    </CustomButton>
                </Link>
                <CustomButton onClick={ checkAllHandler }> Check all </CustomButton>
                <ul>
                {
                    itemDisplayed.eps.map((item, index) => 
                        <ListItem key={item.epTitle}>
                            <div className="Index">{index+1}</div>
                            <div className="epTitle">{item.epTitle}</div>
                            <input 
                                type="checkbox" 
                                onChange={ markAsWatchedHandler } 
                                checked={watchedList.includes(index)}
                                value={index}
                                />
                        </ListItem>    
                    )
                }
                </ul>
            </RightContainer>
        </Container>
    )
}

export default MovieDetail