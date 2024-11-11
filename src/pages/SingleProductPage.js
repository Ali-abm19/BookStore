import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Product from '../components/products/Product';

export default function SingleProductPage({ product }) {
    const params = useParams();
    let productId = params.id;


    const [fetchedProduct, setFetchedProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let url = "http://localhost:5125/api/v1/Books/" + productId;

    function fetchListFromAPI() {
        axios.get(url)
            .then((response) => {
                setFetchedProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch data");
                setLoading(false);
            })
    }


    useEffect(() => {
        fetchListFromAPI();
        // eslint-disable-next-line
    }, [url]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (


        <div
            style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'
            }}>
            <p>{fetchedProduct.title}</p>
            <p>{fetchedProduct.price}$</p>
            <p>{fetchedProduct.author}</p>
            <p>{fetchedProduct.category.categoryName}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <img style={{ maxWidth: '300px', maxHeight: '400px', marginRight: '20px' }} src={fetchedProduct.image} alt={fetchedProduct.title}></img>

                <p style={{ border: '2px solid', width: '800px', padding: '20px' }}>{fetchedProduct.description}</p>
            </div>

        </div>
    )
}
