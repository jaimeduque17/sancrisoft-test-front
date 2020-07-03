import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    const adminLinks = () => (
        <div className="card">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">Crear Categoria</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/product">Crear Producto</Link>
                </li>
            </ul>
        </div>
    );

    const adminInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">Información</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Usuario Registrado'}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Administrador" description={`Hola ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;