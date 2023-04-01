import React from "react";
import { Link } from 'react-router-dom';
import '../res/css/styles.css'

const getStuff = () => {

}

const Stuff = () => {
    return (
        <>

            <div id="table-container">
                <section className="caption">
                    <h3>Робітники</h3>
                    <Link className="link-primary" to="add" >Додати робітника</Link>
                </section>
                <table id="table">
                    <thead>
                        <tr>
                            <th className="th-id">ID</th>
                            <th className="th-name">ПІБ</th>
                            <th className="th-cont">Контакти</th>
                            <th className="th-spec">Спеціалізація</th>
                            <th className="th-state">Статус</th>
                            <th className="th-controls">Операції</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Name-1</td>
                            <td>Contacts-1</td>
                            <td>Specialisation-1</td>
                            <td>State-1</td>
                            <td>
                                <a href="url" className="btn btn-sm btn-primary btn-control">
                                    <img src={require('../res/img/calendar.png')} alt="calendar" className="control-icon" title="Details" />
                                </a>
                                <a href="url" className="btn btn-sm btn-success btn-control">
                                    <img src={require('../res/img/edit.png')} alt="update" className="control-icon" title="Update" />
                                </a>
                                <a href="url" className="btn btn-sm btn-danger btn-control">
                                    <img src={require('../res/img/remove_bin.png')} alt="delete" className="control-icon" title="Delete" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Stuff;