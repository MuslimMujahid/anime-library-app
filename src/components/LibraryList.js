import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ListItemCard from './ListItemCard'
import { Link } from 'react-router-dom' 
import MovieDetail from './MovieDetail'
import axios from 'axios'
import { selectById, getHttpPath, getHttpCoverPath } from '../contexts/DatabaseContext'
import uuid from 'uuid'

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const CustomButton = styled.button`
    all: unset;
`

function LibraryList({ LibraryDB })  {

    const [itemDisplayed, setItemDisplayed] = useState(null)
    const [watchedList, setWatchedList] = useState([])

    useEffect(() => {

        if (itemDisplayed) {
            const watched = []
            itemDisplayed.eps.forEach((ep, index) => {
                if (ep.watched) {
                    watched.push(index)
                }
            })
            setWatchedList(watched)
        } else {
            setWatchedList([])
        }
    }, [itemDisplayed])

    const removeDisplay = () => {
        setItemDisplayed(null)
    }

    const MovieListElements = LibraryDB.map(item => 
        <CustomButton key={item.title} onClick={() => setItemDisplayed(item)}>
             <ListItemCard 
                 title={item.title} 
                 cover={getHttpCoverPath(LibraryDB, item.id)} 
                 status={item.status}
             />
        </CustomButton>
    )
    return (
        <React.Fragment>
            {itemDisplayed && 
            <MovieDetail 
                itemDisplayed={itemDisplayed} 
                removeDisplay={removeDisplay}
                watchedList={watchedList}
                setWatchedList={setWatchedList}
            />}
            <List>{MovieListElements}</List>
        </React.Fragment>
    )
}

export default LibraryList