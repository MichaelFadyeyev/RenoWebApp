import React from "react";

const ReadOnlyRow = ({ item, i, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={++i}>
            <td key={++i} className="column-id">{i + 1}</td>
            <td key={++i}>{item.name}</td>
            <td key={++i}>{item.details}</td>
            <td key={++i} className="column-controls">
                <div className="controls-container">
                    <button
                        type="button"
                        className="btn-control"
                        onClick={(event) => handleEditClick(event, item)}
                    >
                        <section className="control-icon icon-edit" />
                    </button>
                    <button
                        type="button"
                        className="btn-control"
                        onClick={() => handleDeleteClick(item.id)}
                    >
                        <section className="control-icon icon-delete" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;