import React, { useState } from 'react';
const AddUser = () => {

    let i;
    const [inputs, setInputs] = useState({});
    const inputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        console.log(inputs);
    }

    const [name, setName] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost/projects/renowebapp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        })
            .then((response) => response.text())
            .then((data) => { i = data.toString() })
            .then(() => {
                console.log("Success:", i)
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        alert(i);
    }


    return (
        <>
            {/* $name, $login, $password, $email, $phone, */}

            <section className='container' >
                <h2>AddUser</h2>
                <section className="card" style={{ width: 18 + 'rem', margin: 'auto' }}>
                    <div className="card-body">
                        <form action="" onSubmit={formSubmit} style={{ textAlign: 'left' }}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Login:</label>
                                <input type="text" className="form-control" id="login" placeholder="Enter login" onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter email" onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter phone" onChange={inputChange} />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Go!</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </>
    );
}
export default AddUser;