import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ListItemCard from './ListItemCard'
import { Link } from 'react-router-dom' 
import MovieDetail from './MovieDetail'
import axios from 'axios'

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const CustomButton = styled.button`
    all: unset;
`

function LibraryList({ MovieList, reloadMovieList })  {

    const [itemDisplayed, setItemDisplayed] = useState(null)
    const [watchedList, setWatchedList] = useState(['Akame ga Kill! BD 24 720p.mkv'])

    useEffect(() => {
        console.log('Use effect run ...')

        if (itemDisplayed) {
            console.log('item displayed')
            async function getData() {
                const res = await axios(`http://localhost:5000/anime/v2/${itemDisplayed.title}`)
                return await res.data.data                
            }
            getData().then(async data => {
                const result = await Promise.all(data.map(async a => a.watched ? a.filename : "" ))
                setWatchedList(result)
            })
        }
    }, [itemDisplayed])

    const removeDisplay = () => {
        setItemDisplayed(null)
        reloadMovieList()
    }

    const MovieListElements = MovieList.map(item => 
        <CustomButton onClick={() => setItemDisplayed(item)}>
            <ListItemCard 
                key={item.title}
                title={item.title} 
                cover={item.coverHttpPath} 
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