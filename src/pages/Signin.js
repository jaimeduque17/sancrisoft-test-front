import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    err: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, err, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({
      ...values,
      err: false,
      [name]: event.target.value
    });
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.err) {
          setValues({
            ...values,
            err: data.err,
            loading: false
          })
        } else {
          authenticate(
            data,
            () => {
              setValues({
                ...values,
                redirectToReferrer: true
              });
            }
          );
        }
      });
  }

  const signInForm = () => (
    <form>
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

  const showLoading = () => (
    loading &&
    (<div className="alert alert-info">
      <h2>Cargando...</h2>
    </div>)
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()) {
        return <Redirect to="/" />
    }
  }

  return (
    <Layout title="Inicio de sesión" description="Prueba Sancrisoft" className="container col-md-8 offset-md-2">
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
}

export default Signin;