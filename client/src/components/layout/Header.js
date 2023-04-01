import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import DropDownAdmin from './DropDownAdmin';
import './styles.css';


const Header = () => {

    const { user } = useContext(Context);
    // dropdawn
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const UserMenu = (props) => {
        console.log(props.mode)
        switch (props.mode) {
            case 'user':
                if (user.role_id === 1) { // if ADMIN is signed in
                    return (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link active" to="users/add">Add User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="users/:id/delete">Delete User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="users/:id/edit">Edit User</Link>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <section className="nav-link active dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" onClick={handleOpen}>
                                        Адмін
                                    </section>
                                    {open ? (
                                        <DropDownAdmin
                                            handleOpen={handleOpen}
                                        />
                                    ) : null}
                                </div>
                            </li>
                        </>
                    )
                }
                return <></>
            case 'worker':
                return (
                    <></>
                )
            default:
                break;
        }

    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Головна</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <UserMenu mode='user' />
                            </ul>
                            {/* login-logout-registration */}
                            <ul className="navbar-nav">
                                {user ? // if ANY USER signed in
                                    <>
                                        <li className="nav-item">
                                            <p className="nav-link text-dark" style={{ margin: "0" }}> Вітаю, {user.name}</p>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="users/logout">Вихід</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="users/login">Вхід</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="users/add">Реєстрація</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;