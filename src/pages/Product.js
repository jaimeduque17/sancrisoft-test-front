import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { read, listRelated } from './ApiCore';
import Card from '../components/Card';

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.err) {
                        setError(data.err);
                    } else {
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductBottom={false} />}
                </div>
                {relatedProduct.length > 0 && <div className="col-4">
                    <h4>Productos Relacionados</h4>
                    {relatedProduct.map((p, i) => (
                        <div key={i} className="mb-3">
                            <Card product={p} />
                        </div>
                    ))}
                </div>}
            </div>
        </Layout>
    );
}

export default Product;