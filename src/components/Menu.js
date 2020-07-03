import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './CartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
}

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Tienda</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">Carrito<sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0
                    ? <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">Administrador</Link>
                    </li>
                    : <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Administrador</Link>
                    </li>}
                {!isAuthenticated()
                    ? (<>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")} >Registro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")} >Iniciar sesión</Link>
                        </li>
                    </>)
                    : (<li className="nav-item">
                        <span className="nav-link" onClick={() => signout(() => {
                            history.push("/");
                        })} style={{ cursor: "pointer", color: "#FFF" }} >Salir</span>
                    </li>)}
            </ul>
        </div>
    );
}

export default withRouter(Menu);