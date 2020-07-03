import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './CartHelpers';

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined
    // changeCartSize
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">Ver Productos</button>
                </Link>
            )
        );
    }

    const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    }

    const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Agregar al carrito
                </button>
            )
        );
    }

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">En Inventario</span>
        ) : (
                <span className="badge badge-primary badge-pill">Fuera de Inventario</span>
            );
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Ajustar Cantidad</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Eliminar Producto
                </button>
            )
        );
    }

    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 100)} </p>
                <p className="black-10">$ {product.price}</p>
                <p className="black-9">Categoria: {product.category && product.category.name}</p>
                <p className="black-8">Agregado {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCartBtn(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
}

export default Card;