import React from "react";

const EditableRow = ({
    i,
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {

    return (
        <tr style={{ backgroundColor: "whitesmoke" }}>
            <td key={++i} className="column-id">{++i}</td>
            <td key={++i}>
                <input key={++i}
                    type="text"
                    className="form-control"
                    id="name" name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td key={++i}>
                <input key={++i}
                    type="text"
                    className="form-control"
                    id="details"
                    name="details"
                    value={editFormData.details}
                    onChange={handleEditFormChange}
                />
            </td>
            <td key={++i} className="column-controls">
                <div className="controls-container">
                    <button type="submit" className="btn-control">
                        <section className="control-icon icon-ok" />
                    </button>
                    <button type="button" className="btn-control" onClick={handleCancelClick}>
                        <section className="control-icon icon-cancel" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EditableRow;