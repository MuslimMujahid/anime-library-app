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

export const updateWatched = (db, setDatabase, id, eps) => {
    const select = selectById(db, id)
    db = removeById(db, id)
    select.eps[eps].watched = !select.eps[eps].watched

    if (select.eps.filter(ep => ep.watched).length == 0) {
        select.status = 'unwatched'
    } else if (select.eps.filter(ep => !ep.watched).length == 0) {
        select.status = 'finished'
    } else {
        select.status = 'unfinished'
    }

    db = merge(db, select)
    db = sortDB(db)
    setDatabase(db)   

    Promise.all([
        axios
            .post('http://localhost:5000/anime/v2/update/watched', {
                title: select.title,
                epTitle: select.eps[eps].epTitle
            }),
        axios
            .post('http://localhost:5000/anime/v2/update/status', {
                title: select.title,
                status: select.status
            })
    ]).then(async ([res1, res2]) => {
        console.log(res1)
        console.log(res2)
    }).catch(error => {
        console.log(error)
    })

    console.log('Local database updated')
}

export const updateStatus = (db, setDatabase, id, newStatus) => {
    const select = selectById(db, id)
    db = removeById(db, id)
    select.status = newStatus
    db = merge(db, select)
    db = sortDB(db)
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