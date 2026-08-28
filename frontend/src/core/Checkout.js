import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout = ({ vegetables = [] }) => {
    const getTotal = () => {
        if (!Array.isArray(vegetables)) return 0;
        return vegetables.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.count || 1) * (nextValue.price || 0);
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    return (
        <div>
            <h2>Total: Rs. {getTotal()}</h2>

            {showCheckout()}
        </div>
    );
};

export default Checkout;