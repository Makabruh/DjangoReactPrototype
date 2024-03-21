//Import axios from our axios file
import axios from './api/axios';
import React, { useState } from 'react';


//The function
const QueryButton = () => {
    //Create variable called data
    let data;
    let apprenticeData;
    const [usernames, setUsernames] = useState([]);
    const [apprenticeUsernames, setApprenticeUsernames] = useState([]);

    //On the click of the button, run this function
    const handleClickGetAll = async (e) => {
        try {
            //Try to get from the url using axios
            axios.get('http://localhost:8000/query').then((response) => {
                console.log(response.data);
                data = response.data;
            })

            //The map function iterates over each element of an array 
            //and returns a new array where each element is transformed based on the function
            //The arrow function acts as a argument to map which takes user and returns user.username
            //User.username is getting the username from each user object
            const queriedUsernames = data.map(user => user.username);
            setUsernames(queriedUsernames);
            console.log(usernames)
          
        } catch (error) {
            
        }
    }

    const handleClickGetApprentices = async (e) => {
        try {
            //Try to get from the url using axios
            axios.get('http://localhost:8000/queryApprentices').then((response) => {
                console.log(response.data);
                apprenticeData = response.data;
            })

            //The map function iterates over each element of an array 
            //and returns a new array where each element is transformed based on the function
            //The arrow function acts as a argument to map which takes user and returns user.username
            //User.username is getting the username from each user object
            const queriedUsernames = apprenticeData.map(user => user.username);
            setApprenticeUsernames(queriedUsernames);
            console.log(apprenticeUsernames);
          
        } catch (error) {
            
        }
    }


    return(
        <section>
            <button onClick={handleClickGetAll}>Show All Users</button>
            <ul>
                {/* In the unlinked list, map the usernames with index i */}
                {usernames.map((username, i) => (
                    // Within the arrow function, generate a list item for each username
                    <li key={i}>{username}</li>
                ))}
            </ul>
            <button onClick={handleClickGetApprentices}>Show All Apprentices</button>
            <ul>
                {/* In the unlinked list, map the usernames with index i */}
                {apprenticeUsernames.map((username, i) => (
                    // Within the arrow function, generate a list item for each username
                    <li key={i}>{username}</li>
                ))}
            </ul>
        </section>
    )
}

export default QueryButton