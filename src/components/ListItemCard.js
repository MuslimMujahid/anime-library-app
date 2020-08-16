import React from 'react'
import ListItemImage from './ListItemImage'
import ListItemDescription from './ListItemDescription'
import styled from 'styled-components'
import { SimpleCard } from '../templates/Card'

const CustomCardStyle = styled(SimpleCard)`

    &:hover {
        cursor: pointer;
    }

    &:hover img {
        object-fit: contain;
    }
`

const ListItemCard = ({title, cover}) => {
    const imageUrl = cover ? cover : "/no-image.jpg"
    return (
        <CustomCardStyle>                             
            <ListItemImage className="itemImage" imageUrl={imageUrl} />
            <ListItemDescription className="itemDesc" title={title} />
        </CustomCardStyle>
    )
}

export default ListItemCard