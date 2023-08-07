import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { app, db } from "../../features/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setUserDetails } from "../../features/user";
import { useDispatch } from "react-redux";
import styles from "../../styles/Auth.module.css";

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogin() {
        const authentication = getAuth();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(authentication, email, password).then(
            async (response) => {
                const docRef = doc(db, "users", response.user.uid);
                const docSnap = await getDoc(docRef);
                const courses = docSnap.data().courses;
                
                dispatch(
                    setUserDetails({
                        uid: response.user.uid,
                        email: response.user.email,
                        name: docSnap.data().name,
                        courses: courses != null? Object.keys(docSnap.data().courses): [],
                    })
                );

                navigate("/");
                sessionStorage.setItem(
                    "Auth Token",
                    response._tokenResponse.refreshToken
                );
            }
        );
    }
    return (
        <div className={styles.auth}>
            <label for="email">Email</label>
            <input
                type="email"
                required={true}
                name="email"
                ref={emailRef}
            ></input>
            <label for="password">Password</label>
            <input
                type="password"
                required={true}
                name="password"
                ref={passwordRef}
            ></input>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
