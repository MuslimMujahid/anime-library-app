import React from 'react'
import styled from 'styled-components'

const Desc = styled.div`
    text-align: center;
    vertical-align: center;
    padding: 0 8px;
    font-size: 12px;
`

const ListItemDescription = ({title}) => {
    return <Desc>{title}</Desc>
}

export default ListItemDescription