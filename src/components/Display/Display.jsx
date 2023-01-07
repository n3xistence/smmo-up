import React, { useState, useEffect } from 'react';
import './Display.css'
import axios from 'axios';

function Display() {
    const [userID, setUserID] = useState("nothing");

    document.addEventListener('emit', async ({ detail }) => {
        const { id } = detail;

        try {
            var res = await axios.get(`http://localhost:3002/api/user/${id}`);
        } catch (e) { console.log(e) }

        if (res.data === "ER_NO_SUCH_TABLE") return alert('This user does not exist')
        else setUserID(res.data)
    })

    return(
        <div className="absolute p-5 top-12 text-white z-1">
            User: {userID}
        </div>
    )
}

export default Display;