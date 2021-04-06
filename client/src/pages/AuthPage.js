import React, {useState} from 'react';
import './AuthPage.css';

function AuthPage() {


    const [form, newFrom] = useState(true); // Login = true; Reg = false

    function ChangeForm(val) {
        if (val !== form) {
            newFrom(val);
        }
    }

    function Login(e) {
        e.preventDefault();
    }

    function Registration(e) {
        e.preventDefault();
    }

    return (
        <div className="AuthPage">
            <div className="windowForm">
                <div className="buttons">
                    <button className={form ? "active" : ""} onClick={()=>ChangeForm(true)}>Login</button>
                    <button className={form ? "" : "active"} onClick={()=>ChangeForm(false)}>Register</button>
                </div>
                <form>
                    <input type="text" className="email" placeholder="example@mail.com"/>
                    {form ? "" : <input type="text" className="login" placeholder="login"/>}
                    <input type="password" className="password" placeholder="password"/>
                    {form ? "" : <input type="password" className="confirmPassword" placeholder="confirm password"/>}
                    <input type="submit" className="sbm" value={form ? "Login" : "Register"} onClick={form ? Login : Registration}/>
                </form>
            </div>
        </div>
    )
}

export default AuthPage;