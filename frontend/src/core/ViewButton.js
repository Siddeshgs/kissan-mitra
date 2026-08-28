import React from "react";
import { isAuthenticated } from "../auth";
import "./nav.css";

const ViewButton = ({ handleFilters }) => {
    const { user } = isAuthenticated();

    const handleChange = event => {
        handleFilters(event.target.value);
    };

    return  (
            <li className="list-unstyled">
                <button 
                    type="button" 
                    className = "myButton"
                    onClick = {handleChange}
                    value = {`${user._id}`}
                    >View Items
                </button>
            </li>
    );
};

export default ViewButton;