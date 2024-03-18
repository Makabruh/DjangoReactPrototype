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

    return (
        <div>
            {/* Test 2 */}
        </div>
    )
}

export default Login