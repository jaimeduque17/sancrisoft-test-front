import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const Checkout = ({ products }) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0) // 0 is the index (second argument)
    }

    const showCheckout = () => (
        isAuthenticated()
            ? <button className="btn btn-success">Pagar</button>
            : <Link to="/signin">
                <button className="btn btn-primary">Inicia sesión</button>
            </Link>
    );

    return (
        <div>
            <h2>total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    );
}

export default Checkout;