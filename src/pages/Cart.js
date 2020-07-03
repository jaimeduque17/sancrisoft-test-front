import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from '../components/CartHelpers';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Checkout from '../components/Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    // const [cartSize, setCartSize] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Tu carrito tiene {`${items.length}`} productos</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    // changeCartSize={changeCartSize}
                    />
                ))}
            </div>
        );
    }

    const noItemsMessage = () => (
        <h2>
            Tu carrito está vacio. <br />
            <Link to="/shop"> Continua comprando. </Link>
        </h2>
    );

    return (
        <Layout title="Carrito de compras" description="Compra ahora!" className="container-fluid">
            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                {items.length > 0 &&
                <div className="col-6">
                    <h2 className="mb-4">Total productos</h2>
                    <hr />
                    <Checkout products={items} />
                </div>}
            </div>
        </Layout>
    );
};

export default Cart;