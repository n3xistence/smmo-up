import React, { useState, useEffect } from 'react';
import './Display.css'
import axios from 'axios';

function expCalc(level) {
    var exp = 0;
    for (let i = 1;i < level;i++) {
        exp += i*50
    }
    return exp;
}

function Display() {
    const [userID, setUserID] = useState("unknown.");

    document.addEventListener('emit', async ({ detail }) => {
        const { id } = detail;

        try {
            var res = await axios.get(`http://localhost:3002/api/user/${id}`);
        } catch (e) { console.log(e) }

        if (res.data === "ER_NO_SUCH_TABLE") return alert('This user does not exist')
        else {
            console.log(res.data)
            setUserID(res.data)
        }
    })

    if (userID !== "unknown." && userID !== "ER_NO_SUCH_TABLE") {
        return(
            <div className="max-w-6xl h-full mx-auto pt-16 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="mt-2 grid grid-cols-2 gap-1 sm:gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-gray-750 border border-1 border-gray-800 rounded-lg px-6 pt-4 pb-4 text-center">
                        <h2>User Information</h2>
                        <div className="horizontal pt-4">
                            <img src={`https://web.simple-mmo.com${userID.current_data.avatar}`} className="avatar px-4">
                            </img>
                            <p className = "px-4">{userID.current_data.name}
                            <br />
                            Level: {userID.current_data.level.toLocaleString()}
                            <br />
                            Health: {userID.current_data.hp.toLocaleString()}/{userID.current_data.max_hp.toLocaleString()}
                            <br />
                            Exp: {(userID.current_data.exp - expCalc(userID.current_data.level)).toLocaleString()}/{((userID.current_data.level+1)*50).toLocaleString()}
                            </p>

                        </div>
                    </div>
                    <div className="bg-gray-750 border border-1 border-gray-800 rounded-lg px-6 pt-4 pb-4 text-center">
                        <h2>User Links</h2>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="max-w-6xl h-full mx-auto pt-16 pb-16 px-4 sm:px-6 lg:px-8">
                
            </div>
        )
    }
}

export default Display;