import React from "react";
import "./nav.css";

const Checkbox = ({ farmers, handleFilters }) => {
    const handleChange = event => {
        handleFilters(event.target.value);
    };

    if (!farmers || !Array.isArray(farmers)) {
        return null;
    }

    return farmers.map((c, i) => (
        <li key={i} className="list-unstyled">
            <button 
                type="button" 
                className = "myButton"
                onClick = {handleChange}
                value = {`${c._id}`}
                >{c.name}
            </button>
        </li>
    ));
};

export default Checkbox;