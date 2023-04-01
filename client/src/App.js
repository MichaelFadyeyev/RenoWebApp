import 'bootstrap/dist/css/bootstrap.min.css'
//import 'jquery/dist/jquery.min.js'
//import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import Context from './components/Context';
import AppRouts from './components/AppRouts';
//
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import DeleteUser from './components/users/DeleteUser';
import LoginUser from './components/users/LoginUser';
import LogoutUser from './components/users/LogoutUser';
import Projects from './components/content_blocks/projects'
//
import Stuff from './components/content_blocks/stuff'
import AddWorker from './components/content_blocks/stuff/AddWorker'
//
import Specialisations from './components/content_blocks/attributes/Specialisations';
import ProcessStatuses from './components/content_blocks/attributes/ProcessStatuses';
import WorkerStatuses from './components/content_blocks/attributes/WorkerStatuses';
//
function App() {

  const [user, setUser] = useState("");
  const [specials, setSpecials] = useState([]);
  const [processStatuses, setProcessStatuses] = useState([]);
  const [workerStatuses, setWorkerStatuses] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.loggedInUser;
    if (savedUser != null && savedUser !== "") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    fetch(`${AppRouts.adminSpecialisations}&action=load`)
      .then((response) => {
        return response.json()
      }).then((data) => {
        setSpecials(data)
      })
  }, []);

  useEffect(() => {
    fetch(`${AppRouts.adminProcessStatuses}&action=load`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setProcessStatuses(data);
      })
  }, []);

  useEffect(() => {
    fetch(`${AppRouts.adminWorkerStatuses}&action=load`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setWorkerStatuses(data);
      })
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{
        user, setUser,
        specials, setSpecials,
        processStatuses, setProcessStatuses,
        workerStatuses, setWorkerStatuses
      }}>
        <BrowserRouter>
          <Header />
          <main role="main" className="pb-3">
            <div className="container">
              <Routes>
                <Route path="/" element={<div>Головна сторінка</div>} />
                <Route path="users/add" element={<AddUser />} />
                <Route path="users/login" element={<LoginUser />} />
                <Route path="users/logout" element={<LogoutUser />} />
                <Route path="users/:id/edit" element={<EditUser />} />
                <Route path="users/:id/delete" element={<DeleteUser />} />
                <Route path="projects/" element={<Projects />} />
                {/* Stuff */}
                <Route path="stuff/" element={<Stuff />} />
                <Route path="stuff/add" element={<AddWorker />} />
                {/* Attributes */}
                <Route path="specials/" element={<Specialisations />} />
                <Route path="process-statuses/" element={<ProcessStatuses />} />
                <Route path="worker-statuses/" element={<WorkerStatuses />} />
                {/* ...next */}
              </Routes>
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
