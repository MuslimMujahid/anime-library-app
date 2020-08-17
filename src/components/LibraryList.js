import React, { useContext } from 'react'
import styled from 'styled-components'
import ListItemCard from './ListItemCard'
import { Link } from 'react-router-dom' 

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
function LibraryList({ MovieList })  {
    if (!MovieList) return 'Loading ...'
    const MovieListElements = MovieList.map(item => 
        <Link key={item.title} to={`/watch/${item.title}`}>
            <ListItemCard title={item.title} cover={item.coverHttpPath} status={item.status}/>
        </Link>
    )
    return <List>{MovieListElements}</List>
}

export default LibraryList