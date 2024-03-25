//Import axios from our axios file
import axios from './api/axios';
import React, { useState } from 'react';

//Backend details
const LOGOUT_URL = '/logout'

const Logout = ({ currentUser, setCurrentUser }) => {
    const client = axios.create({
        baseURL: 'http://localhost:8000'
      });
    function submitLogout(e) {
        e.preventDefault();
        client.post(
            "/logout", {withCredentials: true}
        ).then(function(res) {
            setCurrentUser(false);
        })
    }

    return (
        <button onClick={e => submitLogout(e)}>Logout</button>
    )
}

export default Logout