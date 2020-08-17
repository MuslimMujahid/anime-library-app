import React from 'react'
import { BadgeError, BadgeSuccess, BadgeWarning, BadgePrimary } from './CardBadges' 
import uuid from 'uuid'

function ListItemBadges({marks}) {
    const badgeList = marks.map(mark => {
        switch (mark) {
            case 'finished':
                return <BadgeSuccess key={uuid.v4()}>Finished</BadgeSuccess>
            case 'unfinished':
                return <BadgeWarning key={uuid.v4()}>Unfinished</BadgeWarning>
            case 'unwatched':
                return <BadgeError key={uuid.v4()}>Unfinished</BadgeError>
            default:
                return <BadgePrimary key={uuid.v4()}>Unfinished</BadgePrimary>
        }
    }) 
    return badgeList
}

export default ListItemBadges