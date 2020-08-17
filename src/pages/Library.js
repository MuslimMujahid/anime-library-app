import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LibraryList from '../components/LibraryList'
import SearchBar from '../components/SearchBar'
import SettingsIcon from '@material-ui/icons/Settings'
import { SimpleNav } from '../templates/StyledNavbar'
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'

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
        /* font-weight: bold; */
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

    // const [MovieList, setMovieList] = useState()
    const [listType, setListType] = useState(DISPLAY.ALL)
    const [listData, setListData] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/anime/v2/all/${listType}`
        axios.get(url)
        .then(res => {
            setListData(res.data.data)
        })
    }, [listType])

    function SelectInputHandler(event) {
        event.persist()
        setListType(event.target.value)
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
                <LibraryList MovieList={listData} />
            </div>
        </Page>
    )
}

export default Library