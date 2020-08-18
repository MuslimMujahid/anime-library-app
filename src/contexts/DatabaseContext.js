import { createContext } from 'react'
import axios from 'axios'

export const DatabaseContext = createContext(null)

export const selectById = (db, id) => {
    const select = db.filter(item => item.id == id)[0]
    return select
}

export const removeById = (db, id) => {
    return db.filter(item => item.id !== id)
}

export const sortDB = (db) => {
    return db.sort((a, b) => a.id > b.id ? 1 : -1)
}

export const sortEps = (eps) => {
    return eps.sort((a, b) => a.epTitle > b.epTitle ? 1 : -1)
}

export const merge = (db, select) => {
    return [...db, select]
}

export const updateDatabaseStatus = (db, id) => {
    const select = selectById(db, id)
    axios
        .post('http://localhost:5000/anime/v2/update/status', {
            id: id,
            status: select.status
        })
        .then(res => {
            console.log(res)
        })
}

export const updateDatabaseWatched = (db, id, epIndex) => {
    const select = selectById(db, id)
    axios
        .post('http://localhost:5000/anime/v2/update/watched', {
            id: id,
            epIndex: epIndex
        })
        .then(res => {
            console.log(res)
        })
}

export const updateWatched = (db, setDatabase, id, epIndex) => {
    const select = selectById(db, id)
    const prevSelect = JSON.parse(JSON.stringify(select))
    select.eps[epIndex].watched = !select.eps[epIndex].watched

    if (select.eps.filter(ep => ep.watched).length == 0) {
        select.status = 'unwatched'
    } else if (select.eps.filter(ep => !ep.watched).length == 0) {
        select.status = 'finished'
    } else {
        select.status = 'unfinished'
    }

    setDatabase(db)   
    
    if (select.status != prevSelect.status) {
        updateDatabaseStatus(db, id)
    } 
    updateDatabaseWatched(db, id, epIndex)

    console.log('Local database updated')
}


export const updateStatus = (db, setDatabase, id, newStatus) => {
    const select = selectById(db, id)
    select.status = newStatus
    setDatabase(db)
    console.log('Local database updated')
}

export const filterDatabase = (db, type) => {
    const AllowedTypes = ['finished', 'unfinished', 'unwatched']
    if (!AllowedTypes.includes(type)) return db
    return db.filter(item => item.status === type)
}

export const getHttpPath = (db, id) => {
    const select = selectById(db, id)
    return 'http://localhost:5000/library/' +  select.title
}

export const getHttpCoverPath = (db, id) => {
    const select = selectById(db, id)
    if (select.cover) {
        return getHttpPath(db, id) + '/folder.jpg'
    } else {
        return '/no-image.jpg'
    }
}