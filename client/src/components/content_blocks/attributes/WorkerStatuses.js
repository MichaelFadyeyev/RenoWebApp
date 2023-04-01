import React, { useContext, useState, Fragment } from "react";
import '../res/css/styles.css';
//
import Context from "../../Context";
import AppRouts from "../../AppRouts";
//
import FormRow from "./common/FormRow";
import ReadOnlyRow from "./common/ReadOnlyRow";
import EditableRow from "./common/EditableRow";


const WorkerStatuses = () => {

    const { workerStatuses } = useContext(Context);
    const { setWorkerStatuses } = useContext(Context);

    const [editItemId, setEditItemId] = useState(null);

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
            addItem(name, details);
            setAddFormData({
                name: "",
                details: ""
            });
            event.target
            .querySelectorAll("input")
            .forEach(input => input.value = "");
        }
        else
            alert("Не вказана назва статусу!")
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        let id = editItemId;
        let name = editFormData.name;
        let details = editFormData.details;

        if (name !== "") {
            updateItem(id, name, details);
            setEditItemId(null);
        }
        else
            alert("Не вказана назва статусу робіт!")
    };

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditItemId(item.id);

        const formValues = {
            name: item.name,
            details: item.details
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditItemId(null);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Видалити статус?")) {
            deleteItem(id);
        };
    };

    const loadItems = () => {        
        fetch(`${AppRouts.adminWorkerStatuses}&action=load`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          setWorkerStatuses(data);
        })
    }

    const addItem = async (name, details) => {
        try {
            fetch(`${AppRouts.adminWorkerStatuses}&action=add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, details }),
            }).then((response) => {
                if (response.status === 200) {
                    loadItems();
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

    const updateItem = async (id, name, details) => {
        try {
            fetch(`${AppRouts.adminWorkerStatuses}&action=update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, name, details }),
            }).then((response) => {
                if (response.status === 200) {
                    loadItems();
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

    const deleteItem = async (id) => {
        try {
            fetch(`${AppRouts.adminWorkerStatuses}&action=delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }).then((response) => {
                if (response.status === 200) {
                    loadItems();
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
                    <h3>Статуси робітників</h3>
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
                            {workerStatuses.map((item, i) =>
                                <Fragment key={i}>
                                    {editItemId === item.id ? (
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


export default WorkerStatuses;