import React, { useState } from 'react';
import './Display.css'

function Display() {
    document.addEventListener('emit', ({ detail }) => {
        console.log(`Received ${detail}`)
    })

    return(
        <div className="p-5">
          In Here Goes My Content!
        </div>
    )
}

export default Display;