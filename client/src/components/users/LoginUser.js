import React, { useState, useEffect, useContext } from "react";
import Context from '../Context';
import AppRouts from "../AppRouts";

const LoginUser = () => {

    const { setUser } = useContext(Context);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [loginActive, setLoginActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);

    const [loginError, setLoginError] = useState("Помилка введення логіну");
    const [passwordError, setPasswordError] = useState("Помилка введення пароля");

    const [formValid, setFormValid] = useState(false);
    const [formActive, setFormActive] = useState();

    useEffect(() => {
        (loginError || passwordError) ?
            setFormValid(false) :
            setFormValid(true);
    }, [loginError, passwordError]);

    useEffect(() => {
        (loginActive || passwordActive) ?
            setFormActive(true) :
            setFormActive(false);
    }, [loginActive, passwordActive]);


    const loginHandler = (e) => {
        setLogin(e.target.value);
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setLoginError("Некоректний логін (email)");
        }
        else setLoginError("");
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{6,}$/;
        if (!re.test(String(e.target.value))) {
            setPasswordError("Некоректний пароль");
        }
        else setPasswordError("");
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "login":
                setLoginActive(true);
                break;
            case "password":
                setPasswordActive(true);
                break;
            default: break;
        }
    }

    const resetHandler = () => {
        setLoginActive(false);
        setPasswordActive(false);
        setFormActive(false);
        setFormValid(false);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response =
                fetch(`${AppRouts.adminControllers}/login_handler.php/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ login, password }),
                });
            (await response).text()
                .then((data) => {
                    setUser(JSON.parse(data));
                    localStorage.setItem('loggedInUser', data);
                    window.location.replace('/');
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

        } catch (error) {
            console.log(error.message);
        }

    }

    // /* $login, $password */
    return (
        <>
            <h2>Вхід</h2>
            <div className="card" style={{ width: 18 + "rem", margin: "auto" }}>
                <div className="card-body form-card  no-cursor">
                    <form action="" onSubmit={submitHandler} style={{ textAlign: "left" }} autoComplete="off">
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
                            {(passwordActive && passwordError) && <div className="err-msg">{passwordError}</div>}
                            <input type="password" className="form-control" id="password-1" name="password-1" placeholder="Пароль"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={passwordHandler} />
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

export default LoginUser;
