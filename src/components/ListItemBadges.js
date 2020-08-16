import React from 'react'
import {BadgePrimary, BadgeSuccess} from './CardBadges' 


function ListItemBadges({Badges}) {
    const badgeList = Badges.map(badge => {
        switch (badge) {
            case 'finished':
                return <BadgeSuccess>Finished</BadgeSuccess>
            case 'unfinished':
                return <BadgePrimary>Unfinished</BadgePrimary>
        }
    }) 
    return badgeList
}

export default ListItemBadges