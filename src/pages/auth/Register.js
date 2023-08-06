import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { app, db } from "../../features/firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserDetails } from "../../features/user";
import { useDispatch } from "react-redux";
import styles from '../../styles/Auth.module.css'

function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function handleRegister(e) {
    e.preventDefault();
    const authentication = getAuth();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(authentication);

    createUserWithEmailAndPassword(authentication, email, password).then(
      async (response) => {
        console.log(response);
        dispatch(
          setUserDetails({
            uid: response.user.uid,
            email: response.user.email,
            name: name,
            courses: [],
          })
        );
        await setDoc(doc(db, "users", response.user.uid), {
          name: name,
          email: email,
          chapters: {},
        });
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
      <label for="name">Name</label>
      <input type="text" required={true} name="name" ref={nameRef}></input>
      <label for="email">Email</label>
      <input type="email" required={true} name="email" ref={emailRef}></input>
      <label for="password">Password</label>
      <input
        type="password"
        required={true}
        name="password"
        ref={passwordRef}
      ></input>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
