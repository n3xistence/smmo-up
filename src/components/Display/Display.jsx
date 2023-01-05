import React, { useState, useEffect } from 'react';
import './Display.css'

function Display() {
    const [userID, setUserID] = useState("nothing");

    document.addEventListener('emit', ({ detail }) => {
        let { id } = detail;
        setUserID(id);
    })

    return(
        <div className="p-5 top-0">
          User: {userID}
        </div>
    )
}

export default Display;