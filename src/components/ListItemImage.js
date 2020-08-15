import React from 'react'
import styled from 'styled-components'

const CardImage = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    object-position: bottom;
`

const ListItemImage = ({imageUrl}) => {
    return (
        <React.Fragment>
            <CardImage src={imageUrl} />
        </React.Fragment>
    )
}

export default ListItemImage