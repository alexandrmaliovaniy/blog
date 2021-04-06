import React, {useState} from 'react';
import './AuthPage.css';

function AuthPage() {


    const [form, newFrom] = useState(true); // Login = true; Reg = false
    const [field, setField] = useState({
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
    })

    function ChangeForm(val) {
        if (val !== form) {
            newFrom(val);
        }
    }
    
    function InputField(e) {
        setField({...field, [e.target.name]: e.target.value});
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
                    <input type="text" name="email" placeholder="example@mail.com" onChange={InputField}/>
                    {form ? "" : <input type="text" name="login" placeholder="login" onChange={InputField}/>}
                    <input type="password" name="password" placeholder="password" onChange={InputField}/>
                    {form ? "" : <input type="password" name="confirmPassword" placeholder="confirm password" onChange={InputField}/>}
                    <input type="submit" className="sbm" value={form ? "Login" : "Register"} onClick={form ? Login : Registration}/>
                </form>
            </div>
        </div>
    )
}

export default AuthPage;