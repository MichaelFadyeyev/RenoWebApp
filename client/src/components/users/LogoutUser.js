import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Context from '../Context';
import AppRouts from '../AppRouts';

const LogoutUser = () => {

    const { user } = useContext(Context);
    const { setUser } = useContext(Context);

    const [result, setResult] = useState();

    const logoutHandler = async () => {
        try {
            const response =
                fetch(`${AppRouts.adminControllers}/logout_handler.php/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user.login),
                });

            (await response).text().then((result) => {
                setResult(result);
            }).then(() => {
                if (result === '0') {
                    localStorage.loggedInUser = '';
                    setUser({});
                    window.location.replace('/');
                }
            });

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h2>Вихід</h2>
            <div className="card" style={{ width: 18 + "rem", margin: "auto" }}>
                <div className="card-body form-card  no-cursor">
                    <h4 className="card-title">Вийти з додатку?</h4>
                    <br />
                    <div className="col-12 btn-container">
                        <Button variant="primary"
                            onClick={()=>logoutHandler()}>Так</Button>
                        <Button variant="secondary"
                            onClick={() => { window.history.go(-1) }}>Ні</Button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default LogoutUser;