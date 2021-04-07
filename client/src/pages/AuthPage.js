import React, {useState} from 'react';
import './AuthPage.css';

function AuthPage() {


    const [form, newFrom] = useState(true); // Login = true; Reg = false
    const [validationError, setValidationError] = useState({
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
    })
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

    function AuthValidation() {
        const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const emailError = emailReg.test(field.email) ? "" : "Wrong email format. Make sure your email mathes template acoount@mail.com";

        const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        const passError = passReg.test(field.password) ? "" : "Wrong password format. Use 8-24 letters A-z 0-9 and special symblos";
        return [emailError, passError]
    }

    function Login(e) {
        e.preventDefault();
        const [emailError, passError] = AuthValidation();
        setValidationError({
            ...validationError,
            email: emailError,
            password: passError
        });

    }

    function Registration(e) {
        e.preventDefault();
        
        const [emailError, passError] = AuthValidation();

        const loginReg = /^[a-zA-Z0-9]{6,18}$/;

        const loginError = loginReg.test(field.login) ? "" : "Wront login format. Use 6-18 letters A-z 0-9";
        
        const passConfirmError = field.password === field.confirmPassword ? "" : "Passwords are different";
        setValidationError({
            ...validationError,
            email: emailError,
            password: passError,
            login: loginError,
            confirmPassword: passConfirmError
        });


    }

    return (
        <div className="AuthPage">
            <div className="windowForm">
                <div className="buttons">
                    <button className={form ? "active" : ""} onClick={()=>ChangeForm(true)}>Login</button>
                    <button className={form ? "" : "active"} onClick={()=>ChangeForm(false)}>Register</button>
                </div>
                <form>
                    <input type="text" name="email" className={validationError.email === "" ? "" : "error"} placeholder="example@mail.com" onChange={InputField}/>
                    {validationError.email === "" ? "" : <div className="validationError">{validationError.email}</div>}
                    {form ? "" : <input type="text" className={validationError.login === "" ? "" : "error"} name="login" placeholder="login" onChange={InputField}/>}
                    {validationError.login === "" || form ? "" : <div className="validationError">{validationError.login}</div>}
                    <input type="password" className={validationError.password === "" ? "" : "error"} name="password" placeholder="password" onChange={InputField}/>
                    {validationError.password === "" || form ? "" : <div className="validationError">{validationError.password}</div>}
                    {form ? "" : <input type="password" className={validationError.confirmPassword === "" ? "" : "error"} name="confirmPassword" placeholder="confirm password" onChange={InputField}/>}
                    {validationError.confirmPassword === "" || form ? "" : <div className="validationError">{validationError.confirmPassword}</div>}
                    <input type="submit" className="sbm" value={form ? "Login" : "Register"} onClick={form ? Login : Registration}/>
                </form>
            </div>
        </div>
    )
}

export default AuthPage;