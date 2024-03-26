import {useRef, useState, useEffect, useContext} from 'react';
//Created a global state with use context for the app
import AuthContext from "./context/AuthProvider"
import axios from './api/axios';
//This will need to change to /login or something and the base url staying within ./api/axios TODO
const LOGIN_URL = '/login';
const USERNAME_URL = '/username';


const Login = ({ currentUser, setCurrentUser }) => {
    const {auth, setAuth} = useContext(AuthContext);
    //Refs
    const userRef = useRef();
    const errRef = useRef();

    //States
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    //For testing purposes
    const [success, setSuccess] = useState('');
    //For the password - REMOVE?
    const [passAttempt, setPassAttempt] = useState(1);

    //Set the focus on the username input when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //Empty the error message if the user changes the username or password states
    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    //For testing purposes - REMOVE
    useEffect(() => {
        console.log("auth:", auth);
        console.log("User:", auth.user);
        console.log("Password:", auth.password);
        console.log("Access Token:", auth.accessToken);
      }, [auth]);

    const handleSubmit = async (e) => {
        // The default behaviour of the form would be to reload - we don't want this
        e.preventDefault();

        //Check username
        try {
            const response = await axios.post(USERNAME_URL, 
                { username: user},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch {

        }
        //Check the password attempts - REMOVE?
        if(passAttempt > 3){
            setErrMsg('Too many incorrect password attempts. Please follow the instructions to unlock your account.')
            errRef.current.focus();
        }

        //Finally try logging in with correct username and password
        else {
            try {
                //Failing at this block
                const response = await axios.post(LOGIN_URL, 
                    { username: user, password: password},
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                //Optional chaining
                //Get the CSRF token from the response data
                const accessToken = response?.data?.csrf_token;
                //Roles is not yet in place but will be access levels
                const roles = response?.data?.roles;
                //Saved in the global context
                setAuth({user, password, accessToken});
                console.log(accessToken)
                console.log(response)
                setUser('');
                setPassword('');
                setSuccess(true);
                setCurrentUser(true);
            } catch (err) {
                //If there is no error coming back from the server
                if(!err?.response){
                    setErrMsg('No Server Response')
                }
                else if (err.response?.status === 400) {
                    setErrMsg('Incorrect Username or Password')
                    setPassAttempt(passAttempt+1);
                }
                else if (err.response?.status === 401) {
                    setErrMsg('Unauthorised')
                }
                else if (err.response?.status === 403) {
                    setErrMsg('You do not have the required permissions')
                } else {
                    setErrMsg('Login Failed')
                    console.log("Error: Catch Statement")
                }
                errRef.current.focus();
            }
        }
        
    }

    return (
        // Open a fragment to show a different view if logged in already
        <>
            {success ? (
                <section>
                    <h1>Logged in</h1>
                    <br/>
                    <p>
                        <a href="#">Home</a>
                    </p>
                </section>
            ) : (
        <section>
            {/* The error message displayed at the top if there is one (assertive means announced immediately when the focus is put on the error message) */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                {/* The label needs to match the input */}
                <label htmlFor='username'>Username: </label>
                {/* value makes this a controlled input, crucial for clearing the inputs on submission */}
                <input 
                    type="text" 
                    id="username" 
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                {/* The label needs to match the input */}
                <label htmlFor='password'>Password: </label>
                {/* value makes this a controlled input, crucial for clearing the inputs on submission */}
                <input 
                    type="password" 
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <br />

                <button>
                    Sign In
                </button>

                <br />

                <p>
                    Need an Account? <br />
                    <span className="line">
                        {/* LINK GOES HERE TODO */}
                        <a href='#'>Sign Up</a>
                    </span>
                </p>
            </form>
        </section>
            )}
            </>
    )
}

export default Login