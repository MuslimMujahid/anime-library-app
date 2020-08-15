import React from 'react'
import styled from 'styled-components'

const EpList = styled.ul`

    padding: 0 12px;

    li {
        background-color: #ebebeb;
        margin-top: 8px;
        padding: 8px 12px;
        cursor: pointer;
    }
`

function EpisodeList() {
    const eps = [
        'episode 1',
        'episode 2',
        'episode 3',
        'episode 4',
        'episode 5',
        'episode 6',
    ]
const epList = eps.map((ep, index) => <li>{eps[index]}</li>) 
    return <EpList className="epList">{epList}</EpList>
}

export default EpisodeList