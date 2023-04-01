import React, { useContext, useState, Fragment } from "react";
import '../res/css/styles.css';
//
import Context from "../../Context";
import AppRouts from "../../AppRouts";
//
import FormRow from "./common/FormRow";
import ReadOnlyRow from "./common/ReadOnlyRow";
import EditableRow from "./common/EditableRow";


const Specialisations = () => {

    const { specials } = useContext(Context);
    const { setSpecials } = useContext(Context);

    const [editSpecialId, setEditSpecialId] = useState(null);

    const [addFormData, setAddFormData] = useState({
        name: "",
        details: ""
    });

    const [editFormData, setEditFormData] = useState({
        name: "",
        details: ""
    });

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        let name = addFormData.name;
        let details = addFormData.details;
        if (name !== "") {
            addSpecial(name, details);
            setAddFormData({
                name: "",
                details: ""
            });
            event.target
            .querySelectorAll("input")
            .forEach(input => input.value = "");
        }
        else
            alert("Не вказана назва!")
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        let id = editSpecialId;
        let name = editFormData.name;
        let details = editFormData.details;

        if (name !== "") {
            updateSpecial(id, name, details);
            setEditSpecialId(null);
        }
        else
            alert("Не вказана назва робіт!")
    };

    const handleEditClick = (event, specialisation) => {
        event.preventDefault();
        setEditSpecialId(specialisation.id);

        const formValues = {
            name: specialisation.name,
            details: specialisation.details
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditSpecialId(null);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Видалити спеціалізацію?")) {
            deleteSpecial(id);
        };
    };

    /* #region  crud data*/
    const loadSpecials = () => {
        fetch(AppRouts.adminSpecialisations + "&action=load")
            .then((res) => {
                return res.json()
            }).then((data) => setSpecials(data))
    }

    const addSpecial = async (name, details) => {
        try {
            fetch(AppRouts.adminSpecialisations + "&action=add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, details }),
            }).then((response) => {
                if (response.status === 200) {
                    loadSpecials();
                }
                else
                    console.log(response.status);
            })
                .catch((error) => {
                    console.error("Error:", error);
                });

        } catch (error) {
            console.log(error.message);
        }
    }

    const updateSpecial = async (id, name, details) => {
        try {
            fetch(AppRouts.adminSpecialisations + "&action=update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, name, details }),
            }).then((response) => {
                if (response.status === 200) {
                    loadSpecials();
                }
                else
                    console.log(response.status);
            })
                .catch((error) => {
                    console.error("Error:", error);
                });

        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteSpecial = async (id) => {
        try {
            fetch(AppRouts.adminSpecialisations + "&action=delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }).then((response) => {
                if (response.status === 200) {
                    console.log(response.status);
                    loadSpecials();
                }
                else
                    console.log(response.status);
            })
                .catch((error) => {
                    console.error("Error:", error);
                });

        } catch (error) {
            console.log(error.message);
        }
    }
    /* #endregion */

    return (
        <>
            <div className="table-container">
                <section className="caption">
                    <h3>Спеціалізація за видом роботи</h3>
                </section>
                <form onSubmit={handleEditFormSubmit}>
                    <table className="table">
                        <thead>
                            <tr key="one">
                                <th className="column-id">№</th>
                                <th>Назва</th>
                                <th>Опис</th>
                                <th className="column-controls">Операції</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specials.map((item, i) =>
                                <Fragment key={i}>
                                    {editSpecialId === item.id ? (
                                        <EditableRow
                                            i={i}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            i={i}
                                            item={item}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            )}
                        </tbody>
                    </table>
                </form>

                <FormRow
                    handleAddFormSubmit={handleAddFormSubmit}
                    handleAddFormChange={handleAddFormChange}
                />
            </div>
        </>
    );
}


export default Specialisations;