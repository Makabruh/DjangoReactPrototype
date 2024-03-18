import {useRef, useState, useEffect} from 'react';


const Login = () => {
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

    }

    return (
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
    )
}

export default Login