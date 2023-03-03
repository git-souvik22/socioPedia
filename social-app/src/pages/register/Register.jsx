import axios from "axios";
import { useRef } from "react";
import "./register.css";
import {useNavigate} from "react-router-dom";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const navigate = useNavigate();

    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't Match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try{
                await axios.post("/auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err);
            }
        }
    };

    const goToLogin = ()=>{
        navigate("/login");
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocioPedia</h3>
                <span className="loginDesc"> Connect with friends and the world around you on SocioPedia. </span>
            </div>
            <div className="loginRight" >
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required className="loginInput" ref={username} type="username"/>

                    <input placeholder="Email" required className="loginInput" ref={email} type="email"/>

                    <input placeholder="Enter Password" required minLength={6} className="loginInput" ref={password} type="password"/>

                    <input placeholder="Confirm Password" required  className="loginInput" ref={passwordAgain} type="password"/>

                    <button className="loginButton" type="submit">Sign Up</button>

                    <button className="loginRegisterButton" onClick={goToLogin}>
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
