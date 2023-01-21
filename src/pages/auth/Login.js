import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../../features/firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUserDetails } from '../../features/user';
import { useDispatch } from 'react-redux';


function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogin() {
        const authentication = getAuth();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(authentication);

        signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
            console.log(response)
            dispatch(setUserDetails({uid: response.user.uid, email: response.user.email}));
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }
    return (
        <div>
            <label  for="email">Email</label>
            <input type='email' required = {true} name='email' ref={emailRef}></input>
            <label  for="password">Password</label>
            <input type='password' required = {true} name = 'password' ref={passwordRef}></input>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
