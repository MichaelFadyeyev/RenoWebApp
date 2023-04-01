import React, { useContext, useState, useEffect } from "react";
import Context from '../../Context';

const AddWorker = () => {

    /**
     * name
     * contact
     * specialisation_id
     * state_id
     */

    const { setUser } = useContext(Context);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [specId, setSpecId] = useState("");
    const [stateId, setStateId] = useState("");

    const [nameActive, setNameActive] = useState(false);
    const [contactActive, setContactActive] = useState(false);
    const [specIdActive, setSpecIdActive] = useState(false);
    const [stateIdActive, setStateIdActive] = useState(false);

    const [nameError, setNameError] = useState("Помилка введення ПІБ");
    const [contactError, setContactError] = useState("Помика введення контактів");
    const [specIdError, setSpecIdError] = useState("Помилка введення");
    const [stateIdError, setStateIdError] = useState("Помилка введення");

    const [formValid, setFormValid] = useState(false);
    const [formActive, setFormActive] = useState();

    useEffect(() => {
        (nameError || contactError || specIdError || stateIdError) ?
            setFormValid(false) :
            setFormValid(true);
    }, [nameError, contactError, specIdError, stateIdError]);

    useEffect(() => {
        (nameActive || contactActive || specIdActive || stateIdActive) ?
            setFormActive(false) :
            setFormActive(true);
    }, [nameActive, contactActive, specIdActive, stateIdActive]);

    const nameHandler = (e) => {
        setName(e.target.value);
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setNameError("Некоректні ПІБ");
        }
        else setNameError("");
    }

    const contactHandler = (e) => {
        setContact(e.target.value);
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setContactError("Некоректні ПІБ");
        }
        else setContactError("");
    }

    const resetHandler = () => {
        setNameActive(false);
        setContactActive(false);
        setFormActive(false);
        setFormValid(false);
    }


    const submitHandler = () => {
        ;
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameActive(true);
                break;
            case "contacts":
                setContactActive(true);
                break;
            case "specId":
                setSpecIdActive(true);
                break;
            case "stateId":
                setStateIdActive(true);
                break;
            default: break;
        }
    }


    return (
        <>
            <h3>Додавання робітника</h3>
            <div className="card" style={{ width: 18 + "rem", margin: "auto" }}>
                <div className="card-body form-card  no-cursor">
                    <form action="" onSubmit={submitHandler} style={{ textAlign: "left" }} autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">ПІБ:</label>
                            {(nameActive && nameError) && <div className="err-msg">{nameError}</div>}
                            <input type="text" className="form-control" id="name" name="name" placeholder="ПІБ"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={nameHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Контактні дані:</label>
                            {(contactActive && contactError) && <div className="err-msg">{contactError}</div>}
                            {/* <input type="contact" className="form-control" id="contact" name="contact" placeholder="Контакти"
                                autoComplete="off"
                                onBlur={e => blurHandler(e)}
                                onChange={contactHandler} /> */}
                            <textarea className="form-control" name="contact" id="contact" cols="50" rows="6" style={{resize: "none"}}
                            autoComplete="off"
                            onBlur={e => blurHandler(e)}
                            onChange={contactHandler}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="specId" className="form-label">Спеціалізація:</label>
                            <select  className="form-select" aria-label="Select for specialisation" name="specId" id="specId">
                                <option value="1">Sp-1</option>
                                <option value="2">Sp-2</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stateId" className="form-label">Статус:</label>
                            <select  className="form-select" aria-label="Select for state" name="stateId" id="stateId">
                                <option value="1">St-1</option>
                                <option value="2">St-2</option>
                            </select>
                        </div>
                        <br />
                        <div className="col-12 btn-container">
                            <button disabled={!formValid} type="submit"
                                className={formValid ? "btn btn-primary" : "btn btn-secondary"}>Додати</button>
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

export default AddWorker;