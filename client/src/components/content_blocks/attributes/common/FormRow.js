import React from "react";

const FormRow = ({handleAddFormSubmit, handleAddFormChange }) => {
    return (
        <form onSubmit={handleAddFormSubmit} style={{ textAlign: "left" }} autoComplete="off">
            <div className="table-container">
                <table className="table">
                    <tbody>
                        <tr style={{ backgroundColor: "whitesmoke" }}>
                            <td className="column-id">+</td>
                            <td >
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name" name="name"
                                    placeholder="Назва"
                                    autoComplete="off"
                                    defaultValue=""
                                    onChange={handleAddFormChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="details"
                                    name="details"
                                    placeholder="Опис"
                                    autoComplete="off"
                                    onChange={handleAddFormChange}
                                />
                            </td>
                            <td className="column-controls">
                                <div className="controls-container">
                                    <button
                                        type="submit"
                                        className="btn-control"
                                    >
                                        <section className="control-icon icon-add"></section>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
}
export default FormRow