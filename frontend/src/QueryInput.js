//Import axios from our axios file
import axios from './api/axios';
import React, { useState, useEffect } from 'react';

//Backend details
const QUERY_URL = '/queryInput'


//The function
const QueryInput = () => {
    const [userLevel, setUserLevel] = useState('');
    const [usernames, setUsernames] = useState([]);
    
    const handleSubmit = async (e) => {
        // The default behaviour of the form would be to reload - we don't want this
        e.preventDefault();
        try {
            const response = await axios.post(QUERY_URL, 
                { userLevel },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response)


            const queriedUsernames = response.data.map(user => user.username);
            setUsernames(queriedUsernames);
            //console.log(usernames);

        } catch (error) {
            
        }
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userLevel'>Type of User: </label>
                <input 
                    type="text" 
                    id="userLevel" 
                    autoComplete='off'
                    onChange={(e) => setUserLevel(e.target.value)}
                    value={userLevel}
                    required
                />
                <button>
                    Search Users
                </button>
            </form>
            <ul>
                {/* In the unlinked list, map the usernames with index i */}
                {usernames.map((username, i) => (
                    // Within the arrow function, generate a list item for each username
                    <li key={i}>{username}</li>
                ))}
            </ul>
        </section>
    )
}

export default QueryInput