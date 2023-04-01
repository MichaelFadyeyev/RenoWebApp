import React from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

const DropDownAdmin = ({ handleOpen }) => {
    return (
        // use outsideClickHandler to hide menu on click outside
        <OutsideClickHandler onOutsideClick={handleOpen} >
            <ul className="menu">
                <li>
                    <Link className="dropdown-item" to="projects/" onClick={handleOpen}>Проекти</Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="stuff/" onClick={handleOpen}>Робітники</Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="specials/" onClick={handleOpen}>Види робіт</Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="process-statuses/" onClick={handleOpen}>Стауси процесів</Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="worker-statuses/" onClick={handleOpen}>Стауси робітників</Link>
                </li>
            </ul>
        </OutsideClickHandler>
    )
}

export default DropDownAdmin;