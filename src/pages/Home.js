import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getProducts } from './ApiCore';
import Card from '../components/Card';
import Search from '../components/Search';

function Home() {

  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.err) {
        setError(data.err)
      } else {
        setProductsBySell(data)
      }
    });
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.err) {
        setError(data.err)
      } else {
        setProductsByArrival(data)
      }
    });
  }

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell()
  }, []);

  return (
    <Layout title="Pagina de Inicio" description="Prueba Sancrisoft" className="container-fluid">
      <Search />
      <h2 className="mb-4">Nuevos</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <h2 className="mb-4">Mas vendidos</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
