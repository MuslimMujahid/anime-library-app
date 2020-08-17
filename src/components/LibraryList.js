import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ListItemCard from './ListItemCard'
import { Link } from 'react-router-dom' 
import MovieDetail from './MovieDetail'

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const CustomButton = styled.button`
    all: unset;
`

function LibraryList({ MovieList })  {

    const [itemDisplayed, setItemDisplayed] = useState(null)

    const removeDisplay = () => {
        setItemDisplayed(null)
    }

    if (!MovieList) return 'Loading ...'
    const MovieListElements = MovieList.map(item => 
        // <Link key={item.title} to={`/watch/${item.title}`}>
        //     <ListItemCard title={item.title} cover={item.coverHttpPath} status={item.status}/>
        // </Link>
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
            {itemDisplayed && <MovieDetail itemDisplayed={itemDisplayed} removeDisplay={removeDisplay}/>}
            <List>{MovieListElements}</List>
        </React.Fragment>
    )
}

export default LibraryList