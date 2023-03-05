import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import DeleteUser from './users/DeleteUser';

const Menu = () => {
  return (
    <div className="Menu">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="index">Navbar</a> */}
            <Link className="navbar-brand" to="index">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="users/add">Add User</Link>
                  {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" href="#">Link</a> */}
                  <Link className="nav-link active" to="users/:id/delete">Delete User</Link>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a> */}
                  <Link className="nav-link active" to="users/:id/edit">Edit User</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='./' />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/:id/edit" element={<EditUser />} />
          <Route path="users/:id/delete" element={<DeleteUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Menu;