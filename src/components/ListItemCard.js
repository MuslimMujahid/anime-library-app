import React from 'react'
import ListItemImage from './ListItemImage'
import ListItemDescription from './ListItemDescription'
import styled from 'styled-components'
import { SimpleCard } from '../templates/Card'
import EditIcon from '@material-ui/icons/Edit';

const CustomCardStyle = styled(SimpleCard)`

    position: relative;

    &:hover {
        cursor: pointer;
    }

    &:hover img {
        object-fit: contain;
    }

    &:hover .editIcon {
        display: block;
    }

    .editIcon {
        position: absolute;
        font-size: 24px;
        color: #000000;
        top: 5px;
        left: 5px;
        background-color: #ffffff;
        border-radius: 50%;
        padding: 5px;
        border: solid 1px #b5b5b5;
        transition: all ease-in 0.1s;
        display: none;

        &:hover {
            background-color: #b5b5b5;
            color: #ffffff;
        }
    }
`

const ListItemCard = ({title, cover, status}) => {
    const imageUrl = cover ? cover : "/no-image.jpg"
    return (
        <CustomCardStyle>                  
            <EditIcon className="editIcon"/>           
            <ListItemImage className="itemImage" imageUrl={imageUrl} />
            <ListItemDescription className="itemDesc" title={title} status={status} />
        </CustomCardStyle>
    )
}

export default ListItemCard