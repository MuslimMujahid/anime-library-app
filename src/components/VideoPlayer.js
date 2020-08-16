import React from 'react'

const Style = {
    width: '100%',
    marginTop: '70px'
}

function VideoPlayer({src}) {
    return (
        <React.Fragment>
            <video 
                id="video" 
                controls 
                autoPlay 
                preload="metadata"
                style={Style}
            >
                <source src={src} type="video/mp4" />
            </video>
        </React.Fragment>
    )
}

export default VideoPlayer