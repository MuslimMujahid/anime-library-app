import React, { useContext } from 'react'
import styled from 'styled-components'
import ListItemCard from './ListItemCard'
import { MovieListContext } from '../contexts/MovieListContext'
import { Link } from 'react-router-dom' 

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
function LibraryList()  {
    const data = useContext(MovieListContext)
    if (!data) return 'Loading ...'
    
    const { titles, covers } = data
    const MovieList = titles.map((title, index) => 
        <Link key={title} to={`/watch/${title}`}>
            <ListItemCard title={title} cover={covers[index]}/>
        </Link>
    )
    return <List>{MovieList}</List>
}

export default LibraryList