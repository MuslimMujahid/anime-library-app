import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import LibraryList from '../components/LibraryList'
import SearchBar from '../components/SearchBar'
import SettingsIcon from '@material-ui/icons/Settings'
import { SimpleNav } from '../templates/StyledNavbar'
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'
import { DatabaseContext, filterDatabase } from '../contexts/DatabaseContext'

const Page = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #f7f7f7;

    .Navbar {
        .rightItems {
            display: flex;
            outline: none;
        }

        .rightItems li {
            margin-left: 12px;
        }

        .rightItems .Icon {
            height: 100%;
            font-size: 28px;
            color: #b5b5b5;
        }
    }

    .pageBody {
        margin-top: 70px;
        padding: 0 2vw;
    }

    .pageBody .pageTitle {
        font-size: 42px;
        text-align: center;
        margin-bottom: 24px;
        letter-spacing: .4rem
    }
`

const DISPLAY = {
    ALL: '',
    UNFINISHED: 'unfinished',
    UNWATCHED: 'unwatched'
}

function Library() {

    const { database, setDatabase } = useContext(DatabaseContext)
    const [localDB, setLocalDB] = useState(database)
    const [loading, setLoading] = useState(false)

    function SelectInputHandler(event) {
        event.persist()
        setLoading(true)
        const newDB = filterDatabase(database, event.target.value)
        setLocalDB(newDB)
        setLoading(false)
    }


    return (
        <Page>
            <SimpleNav className="Navbar">
                <SearchBar />
                <ul className="rightItems">
                    <li>
                        <StyledInputSelect onChange={SelectInputHandler}>
                            <option value=''> All </option>
                            <option value='finished'> Finished </option>
                            <option value='unfinished'> Unfinished </option>
                            <option value='unwatched'> Unwatched </option>
                        </StyledInputSelect>
                    </li>
                    <li>
                        <SettingsIcon className="Icon"/>
                    </li>
                    
                </ul>
            </SimpleNav>    
            <div className="pageBody">
                <div className="pageTitle">Library</div>
                <LibraryList LibraryDB={localDB} />
            </div>
        </Page>
    )
}

export default Library