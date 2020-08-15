import React from 'react'
import { StyledInputText } from '../templates/StyledInput'

const CustomInputStyle = {
    width: '50vw',
    padding: '8px 12px'
}

function SearchBar() {
    return <StyledInputText 
        type="text" 
        placeholder="Search ..." 
        style={CustomInputStyle}
        />
} 

export default SearchBar