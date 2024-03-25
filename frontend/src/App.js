import React from 'react';
import {useState, useEffect, useContext} from 'react';

import Register from './Register';
import Login from './Login';
import QueryButton from './QueryButton';
import QueryInput from './QueryInput';
import Logout from './Logout';

import axios from './api/axios';
import AuthContext from "./context/AuthProvider"


function App() {
  const {setAuth} = useContext(AuthContext);

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
  }, [setCurrentUser])
  //Included setCurrentUser as a dependency so that React will re-run the effect whenever setCurrentUser changes
  //This means that the App component re-renders when the currentUser state is updated in the Login component
  //Still requires a reload of the page - TODO


  return(
    <div className="App">
      {/* Use a ternary operator to simplify display */}
      {/* If there is no currentUser then there is a need to register or login and if not then not */}
      {/* Need to fetch CSRF token from Auth ?? - TODO */}

      {currentUser ? (
        <div>
          {console.log(AuthContext)}
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
