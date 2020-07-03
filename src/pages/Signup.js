import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { signup } from '../auth';

const Signup = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    err: '',
    success: false
  });

  const { name, email, password, err, success } = values;

  const handleChange = name => event => {
    setValues({
      ...values,
      err: false,
      [name]: event.target.value
    });
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false })
    signup({ name, email, password })
      .then(data => {
        if (data.err) {
          setValues({
            ...values,
            err: data.err,
            success: false
          })
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            err: '',
            success: true
          })
        }
      })
  }

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Nombre</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Correo electronico</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Contraseña</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button
        onClick={clickSubmit}
        className="btn btn-primary">Enviar</button>
    </form>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{ display: err ? "" : "none" }}>
      {err}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
      Una nueva cuenta ha sido creada. <Link to="/signin">Iniciar sesión</Link>
    </div>
  );

  return (
    <Layout title="Registro" description="Prueba Sancrisoft" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
}

export default Signup;