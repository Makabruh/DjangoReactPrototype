//Import hooks
import { useRef, useState, useEffect} from "react";
//Import visuals
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//Regex statements
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    //userRef will allow us to set the focus on user input when the component loads
    const userRef = useRef();
    //If we get an error we need to put the focus on the error
    const errRef = useRef();

    //States for user field - user tied to user input, validName a boolean for validation, userFocus tied to focus on input field
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //Same as above but for password and matching password fields
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //States for error messages and successful submission
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //First time effect is applied is setting the focus when the component loads - nothing in dependency array
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //Validating the username input field at every change
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result)
        console.log(user);
        setValidName(result);
    }, [user])

    //Validating the password input field
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        //Comparing the password and match password
        //Have them in the same effect as we want to re-check whenever one of the passwords changes
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    //Any input state being changed requires a clearing of the error message
    useEffect(() => {
        setErrMsg('');
    }, [user, password, matchPassword])

    return (
        // section is more semantic than div
        <section>
            {/* Here is our error message, using a ternary operator to check if there is an error message */}
            {/* The offscreen class name means it is still available to screen readers when there is no error message but not visible on the screen */}
            {/* The aria-live means that if there is an error message, the focus will be put on the message for a screen reader */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Register</h1>
            <form>
                {/* The htmlFor needs to match the id of the input */}
                <label htmlFor="username">Username: </label>
                <input>
                    type = "text"
                    id = "username"
                    {/* ref allows us to set focus on the input */}
                    ref = {userRef}
                    {/* Autocomplete off because we don't want to see previous values suggested */}
                    autoComplete = "off"
                    {/* onChange ties the input to the userState */}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    {/* aria-invalid will be set to true when the component loads because blank is an invalid username */}
                    aria-invalid={validName ? "false" : "true"}
                    {/* This is the final thing read by the screen reader and here we give the full requirements for the field */}
                    aria-describedby="uidnote"
                    {/* Settinig focus */}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                </input>
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters <br/>
                    Must begin with a letter <br/>
                    Letters, numbers, underscores, and hyphens allowed
                </p>
            </form>
            

        </section>
    )
}

export default Register
