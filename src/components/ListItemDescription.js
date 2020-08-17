import React from 'react'
import styled from 'styled-components'
import ListItemBadges from './ListItemBadges'

const Desc = styled.div`
    text-align: center;
    vertical-align: center;
    padding: 0 8px 5px 8px;
    font-size: 12px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
        margin-bottom: 12px;
    }

    .Badges {}
`

const ListItemDescription = ({title, status}) => {
    const marks = [status]
    return (
        <Desc>
            <div className="title">{title}</div>
            <ListItemBadges className="Badges" marks={marks} />
        </Desc>
    )
}

export default ListItemDescription