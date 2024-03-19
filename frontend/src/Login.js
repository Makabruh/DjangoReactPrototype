import {useRef, useState, useEffect, useContext} from 'react';
//Created a global state with use context for the app
import AuthContext from "./context/AuthProvider"
import axios from './api/axios';
//This will need to change to /login or something and the base url staying within ./api/axios TODO
const LOGIN_URL = '/login';


const Login = () => {
    const {setAuth} = useContext(AuthContext);
    //Refs
    const userRef = useRef();
    const errRef = useRef();

    //States
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    //For testing purposes
    const [success, setSuccess] = useState('');

    //Set the focus on the username input when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //Empty the error message if the user changes the username or password states
    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        // The default behaviour of the form would be to reload - we don't want this
        e.preventDefault();
        console.log({
            userName: user,
            password: password
        })
        try {
            //Failing at this block
            const response = await axios.post(LOGIN_URL, 
                { userName: user, password: password},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            console.log("here")
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