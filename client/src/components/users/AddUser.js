import React, { useState, useEffect, useContext } from "react";
import Context from '../Context';
import AppRouts from "../AppRouts";

const AddUser = () => {

    let i;

    /* #region -> form fields, states, error msg*/
    const { setUser } = useContext(Context);

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");

    const [nameActive, setNameActive] = useState(false);
    const [loginActive, setLoginActive] = useState(false);
    const [password1Active, setPassword1Active] = useState(false);
    const [password2Active, setPassword2Active] = useState(false);
    const [phoneActive, setPhoneActive] = useState(false);

    const [nameError, setNameError] = useState("Помилка введення імені");
    const [loginError, setLoginError] = useState("Помилка введення логіну");
    const [password1Error, setPassword1Error] = useState("Помилка введення пароля");
    const [password2Error, setPassword2Error] = useState("Помилка повтору пароля");
    const [phoneError, setPhoneError] = useState("Помилка введення телефону");
    /* #endregion */

    const [formValid, setFormValid] = useState(false);

    const [formActive, setFormActive] = useState()

    useEffect(() => {
        if (nameError || loginError || password1Error || password2Error || phoneError) {
            setFormValid(false);
        }
        else
            setFormValid(true);

    }, [nameError, loginError, password1Error, password2Error, phoneError]);


    useEffect(() => {
        if (nameActive || loginActive || password1Active || password2Active || phoneActive)
            setFormActive(true);
        else
            setFormActive(false);

    }, [nameActive, loginActive, password1Active, password2Active, phoneActive]);


    /* #region -> fields hendlers*/
    // name check
    // /^[їЇіІєЄа-яА-Яa-zA-Z]*( [їЇіІєЄа-яА-Яa-zA-Z-']+)*$/
    const nameHandler = (e) => {
        setName(e.target.value);
        const re =
            /^[їЇіІєЄа-яА-Яa-zA-Z]*( [їЇіІєЄа-яА-Яa-zA-Z-'.]+)*$/;
        if (!re.test(String(e.target.value))) {
            setNameError("Некоректне ім'я");
        }
        else
            setNameError("");
    }

    // login check
    // /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/

    // password1 check
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{6,}$/
    const password1Handler = (e) => {
        setPassword1(e.target.value);
        const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{6,}$/;
        if (!re.test(String(e.target.value))) {
            setPassword1Error("Некоректний пароль");
        }
        else {
            setPassword1Error("");
            if (password2Active)
                checkPassword2(password2);
        }
    }

    const password2Handler = (e) => {
        if (password1Active)
            checkPassword2(e.target.value);
    }

    const checkPassword2 = (passw) => {
        if (password1Error === "" && passw !== password1) {
            setPassword2Error("Некоректний повтор паролю");
        }
        else {
            setPassword2(passw);
            setPassword2Error("");
        }
    }

    // email as login
    // logn (email) check
    // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    const loginHandler = (e) => {
        setLogin(e.target.value);
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setLoginError("Некоректний логін (email)");
        }
        else setLoginError("");
    }


    // /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const phoneHandler = (e) => {
        setPhone(e.target.value);
        const re =
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhoneError("Некоректний номер телефону");
        }
        else setPhoneError("");
    }
    /* #endregion */


    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameActive(true);
                break;
            case "login":
                setLoginActive(true);
                break;
            case "password-1":
                setPassword1Active(true);
                break;
            case "password-2":
                setPassword2Active(true);
                break;
            case "phone":
                setPhoneActive(true);
                break;
            default: break;
        }
    }

    const resetHandler = () => {
        setNameActive(false);
        setLoginActive(false);
        setPassword1Active(false);
        setPassword2Active(false);
        setPhoneActive(false);
        setFormActive(false);
        setFormValid(false);
    }


    const submitHandler = (event) => {
        event.preventDefault();
        try {
            fetch(`${AppRouts.adminControllers}/registry_handler.php/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, login, password1, password2, phone }),
            })
                .then((response) => {
                    if (response.status === 200)
                        return response.json();
                    else
                        throw new Error(response.status)
                })
                .then((data) => {
                    setUser(data);
                    localStorage.setItem('loggedInUser', JSON.stringify(data));
                    window.location.replace('/');
                    // console.log(data);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        } catch (error) {
            console.log(error.message);
        }
    }


    // /* $name, $login, $password1, $email, $phone, */
    return (
        <>
            <h2>Реєстрація</h2>
            <div className="card" style={{ width: 18 + "rem", margin: "auto" }}>
                <div className="card-body form-card  no-cursor">
                    <form action="" onSubmit={submitHandler} style={{ textAlign: "left" }} autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Ім'я, прізвище:</label>
                            {(nameActive && nameError) && <div className="err-msg">{nameError}</div>}
                            <input type="text" className="form-control" id="name" name="name" placeholder="Ім'я, прізвище" autoFocus="autoFocus"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={nameHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">Логін (email):</label>
                            {(loginActive && loginError) && <div className="err-msg">{loginError}</div>}
                            <input type="text" className="form-control" id="login" name="login" placeholder="Логін (email)"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={loginHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-1" className="form-label">Пароль:</label>
                            {(password1Active && password1Error) && <div className="err-msg">{password1Error}</div>}
                            <input type="password" className="form-control" id="password-1" name="password-1" placeholder="Пароль"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={password1Handler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-2" className="form-label">Повтор паролю:</label>
                            {(password2Active && password2Error) && <div className="err-msg">{password2Error}</div>}
                            <input type="password" className="form-control" id="password-2" name="password-2" placeholder="Пароль повторно"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={password2Handler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Телефон:</label>
                            {(phoneActive && phoneError) && <div className="err-msg">{phoneError}</div>}
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Телефон"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={phoneHandler} />
                        </div>
                        <br />
                        <div className="col-12 btn-container">
                            <button disabled={!formValid} type="submit"
                                className={formValid ? "btn btn-primary" : "btn btn-secondary"}>Відправити</button>
                            <button type="reset"
                                className={formActive ? "btn btn-danger" : "btn btn-secondary"}
                                onClick={() => resetHandler()}>Очистити</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default AddUser;