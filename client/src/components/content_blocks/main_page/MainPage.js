import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import '../res/css/styles.css';


const MainPage = () => {

    const { user } = useContext(Context);

    if (user) {
        return (
            <>
                <h2>LOGGEDIN</h2>
                <table className="table">
                    <thead>
                        <tr key="one">
                            <th className="column-id">№</th>
                            <th>Назва</th>
                            <th>Опис</th>
                            <th className="column-controls">Операції</th>
                        </tr>
                    </thead>
                </table>
            </>
        )

    }
    else {
        return (
            <><h2>Для роботи з системою війдить або зареєструйтеся</h2></>
        )
    }

}

export default MainPage;
