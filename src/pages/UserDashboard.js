import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';

const UserDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const userLinks = () => (
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">Mi Carrito</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/profile/update">Actualizar Perfil</Link>
                </li>
            </ul>
        </div>
    );

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">Información</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Usuario registrado'}</li>
            </ul>
        </div>
    );

    const purchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Historial de compra</h3>
            <ul className="list-group">
                <li className="list-group-item">historial</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Administrador" description={`Hola ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;