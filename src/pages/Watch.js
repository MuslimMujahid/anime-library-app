import React, { Component } from 'react'
import styled from 'styled-components'
import { SimpleNav } from '../templates/StyledNavbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { StyledInputSelect } from '../templates/StyledInput'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Page = styled.div`
    position: relative;
    .Player {
        width: 100%;
        top: 70px;
        position: relative;
    }

    .Player .track {
        background-color: red;
        /* position: absolute; */
        /* top: 85%; */
        width: 100%;
        text-align: center;
        font-size: 500px;
        z-index: 1;
        text-shadow: 1px 1px #000000;
    }

    .selectEps {
        width: 60px;
    }
`

const CustomNav = styled(SimpleNav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

class Watch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: this.props.match.params.title,
            Data: undefined,
            EpsPlaying: 0
        }

        this.changeEpsPlayingHandler = this.changeEpsPlayingHandler.bind(this)
    }

    componentDidMount() {
        const url = `http://localhost:5000/anime/${this.state.title}`
        axios.get(url).then(res => {
            this.setState(prevState =>{
                return {
                    Data: res.data,
                    EpsPlaying: 0
                }
            })
        })
    }

    changeEpsPlayingHandler(event) {
        event.persist()
        console.log('change eps', event.target.value)
        this.setState(prevState => {
            return {
                Data: prevState.Data,
                EpsPlaying: event.target.value
            }
        })
    }
    
    render() {
        const { Data, EpsPlaying, title } = this.state 
        if (!Data) return 'Loading'
        
        const { epsLink } = Data
        const VideoUrl = `http://localhost:5000/library/${title}/${epsLink[EpsPlaying]}` 
        const epsList = epsLink.map((eps, index) => <option value={index}>{index+1}</option>)
        return (    
            <Page>
                <CustomNav>
                    <Link to="/"> <ArrowBackIcon /> </Link>
                    <div className="titleName">{title}</div>
                    <StyledInputSelect 
                        className="selectEps" 
                        onChange={this.changeEpsPlayingHandler}
                    >
                        {epsList}
                    </StyledInputSelect>
                </CustomNav>
                <video 
                    key={VideoUrl} 
                    className="Player" 
                    id="video" 
                    controls autoPlay 
                    preload="metadata"
                >
                    <source src={VideoUrl} type="video/mp4" />
                </video>
            </Page>
        )
    }
    
    
}

export default Watch