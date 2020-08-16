import React from 'react'
import styled from 'styled-components'

const Badge = styled.div`
    width: max-content;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 9px;
    letter-spacing: 0.05rem;
`

export const BadgePrimary = styled(Badge)`
    background-color: #0075F2;
`

export const BadgeWarning = styled(Badge)`
    background-color: #FFE66D;
` 

export const BadgeSuccess = styled(Badge)`
    background-color: #64F58D;
`