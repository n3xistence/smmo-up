import React, { useState, useEffect } from 'react';
import './Display.css'

function Display() {
    const [userID, setUserID] = useState("nothing");

    document.addEventListener('emit', ({ detail }) => {
        const { id } = detail;
        setUserID(id);
    })

    return(
        <div className="absolute p-5 top-12 text-white">
            User: {userID}
        </div>
    )
}

export default Display;