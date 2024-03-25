import React from 'react';
import {useState, useEffect} from 'react';
import Register from './Register';
import Login from './Login';
import QueryButton from './QueryButton';
import QueryInput from './QueryInput';
import Logout from './Logout';
import axios from './api/axios';


function App() {

  //Check for current user
  const [currentUser, setCurrentUser] = useState();
  //Toggle between registration and login form
  const [registrationToggle, setRegistrationToggle] = useState(false);

  const client = axios.create({
    baseURL: 'http://localhost:8000'
  });

  //Check for logged in user
  //If user returned then set currentuser to true, if error returned, set to false
  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    })
  })


  return(
    <div className="App">
      {/* Use a ternary operator to simplify display */}
      {/* If there is no currentUser then there is a need to register or login and if not then not */}

      {currentUser ? (
        <div>
          <QueryInput />
          <Logout currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
      ) : (
        <div>
          <Register />
          <br />
          {/* Pass props to child component */}
          <Login currentUser={currentUser}/>
        </div>
      )}
    </div>
  );
  
}

export default App;
