//Import hooks
import { useRef, useState, useEffect} from "react";
//Import visuals
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//Import Axios
import axios from 'axios';

//Backend details
const backendURL = 'http://localhost:8000'

//Regex statements
//Note that email will have to be properly checked with mfa
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%£*]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Register = () => {
    //userRef will allow us to set the focus on user input when the component loads
    const userRef = useRef();
    //If we get an error we need to put the focus on the error
    const errRef = useRef();
    const emailRef = useRef();

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

    //Same as above for email
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

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
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

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
    }, [user, password, matchPassword, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Security - preventing console JS hack of disabled button
        const v1 = USER_REGEX.test(user);
        const v2 = PASSWORD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email)
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid entry");
            return;
        }

        const sendRegistrationDetails = async (data) => {
            try {
                const response = await axios.post(backendURL, data)
                console.log('Response: ', response.data)
            } catch (error) {
                console.error(error);
            }
        }

        //This is a TEST
        sendRegistrationDetails({userName: user, password: password, userLevel: 'apprentice', email: email});

        setSuccess(true);
    }

    return (
        // section is more semantic than div
        <section>
            {/* Here is our error message, using a ternary operator to check if there is an error message */}
            {/* The offscreen class name means it is still available to screen readers when there is no error message but not visible on the screen */}
            {/* The aria-live means that if there is an error message, the focus will be put on the message for a screen reader */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {/* This is the username field */}
                {/* The htmlFor needs to match the id of the input */}
                <label htmlFor="username">Username: 
                {/* These spans provide the green check mark if the username is valid and the red cross if not*/}
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type = "text"
                    id = "username"
                    /* ref allows us to set focus on the input */
                    ref = {userRef}
                    /* Autocomplete off because we don't want to see previous values suggested */
                    autoComplete = "off"
                    /* onChange ties the input to the userState */
                    onChange={(e) => setUser(e.target.value)}
                    required
                    /* aria-invalid will be set to true when the component loads because blank is an invalid username */
                    aria-invalid={validName ? "false" : "true"}
                    /* This is the final thing read by the screen reader and here we give the full requirements for the field */
                    aria-describedby="uidnote"
                    /* Settinig focus */
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                {/* Info message for the username field */}
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters <br/>
                    Must begin with a letter <br/>
                    Letters, numbers, underscores, and hyphens allowed
                </p>

                {/* This is the email field */}
                <label htmlFor="email">Email: 
                {/* These spans provide the green check mark if the username is valid and the red cross if not*/}
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type = "email"
                    id = "email"
                    /* ref allows us to set focus on the input */
                    ref = {emailRef}
                    /* Autocomplete off because we don't want to see previous values suggested */
                    autoComplete = "off"
                    /* onChange ties the input to the userState */
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    /* aria-invalid will be set to true when the component loads because blank is an invalid username */
                    aria-invalid={validEmail ? "false" : "true"}
                    /* This is the final thing read by the screen reader and here we give the full requirements for the field */
                    aria-describedby="emailnote"
                    /* Settinig focus */
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                {/* Info message for the username field */}
                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please input a valid email address
                </p>

                {/* This is the password field */}
                <label htmlFor="password">
                    Password: 
                    <span className={validPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type = "password"
                    id = "password"
                    /* onChange ties the input to the passwordState */
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    /* aria-invalid will be set to true when the component loads because blank is an invalid username */
                    aria-invalid={validPassword ? "false" : "true"}
                    /* This is the final thing read by the screen reader and here we give the full requirements for the field */
                    aria-describedby="pwdnote"
                    /* Settinig focus */
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                {/* Info message for the password field */}
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters <br/>
                    Must include uppercase, lowercase, a number, and a special character <br />
                    {/* Each character is put in a span with an aria label so the screen reader can read it */}
                    Allowed special characters: 
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                    <span aria-label="pound sign">£</span>
                    <span aria-label="star">*</span>
                </p>

                {/* This is the matching password field */}
                <label htmlFor="confirm_password">
                    Confirm Password: 
                    {/* Both validMatch and matchPassword needed or there could be a green check for empty passwords */}
                    <span className={validMatch && matchPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type = "password"
                    id = "confirm_password"
                    /* onChange ties the input to the passwordState */
                    onChange={(e) => setMatchPassword(e.target.value)}
                    required
                    /* aria-invalid will be set to true when the component loads because blank is an invalid username */
                    aria-invalid={validMatch ? "false" : "true"}
                    /* This is the final thing read by the screen reader and here we give the full requirements for the field */
                    aria-describedby="confirmnote"
                    /* Settinig focus */
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                {/* Info message for the password field */}
                <p id="confirmnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match password
                </p>

                {/* No need for type=submit as when only one button in a form, that is default */}
                <button disabled={!validName || !validPassword || !validMatch ? true : false}>
                    Sign Up
                </button>

            </form>

            <p>
                Already registered? <br />
                <span className="line">
                    {/* Placeholder */}
                    <a href="#">Sign In</a>
                </span>
            </p>
            

        </section>
    )
}

export default Register
