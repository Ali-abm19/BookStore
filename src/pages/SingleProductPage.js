import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Product from '../components/products/Product';
import { enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';

export default function SingleProductPage({ product, setCartBooks, cartBooks }) {
    const params = useParams();
    let productId = params.id;


    const [fetchedProduct, setFetchedProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let url = "http://localhost:5125/api/v1/Books/" + productId;

    function addToCart(book) {
        if (!(cartBooks.some((b) => b.book.bookId === book.bookId))) {
            setCartBooks([...cartBooks, { quantity: 1, book: book }]);
            enqueueSnackbar("Book added to cart", { variant: "success" })
        }
        else {
            enqueueSnackbar("Book is already in the cart", { variant: "error" })
        }
    }

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
                alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px'
            }}>

            <div style={{ width: '75%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Book: {fetchedProduct.title}</p>
                <p>Price: ${fetchedProduct.price}</p>
                <p>Author: {fetchedProduct.author}</p>
                <p>Form: {fetchedProduct.bookFormat}</p>
                <p>Category: {fetchedProduct.category.categoryName}</p>
            </div>

            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '20px'
            }}>

                <img style={{ maxWidth: '300px', maxHeight: '400px', marginRight: '20px' }} src={fetchedProduct.image} alt={fetchedProduct.title}></img>

                <textarea readOnly style={{ border: '2px solid', width: '800px', height: '450px', padding: '20px' }}>{fetchedProduct.description}</textarea>
            </div>


            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => addToCart(fetchedProduct)}>Add to Cart</Button>


        </div>
    )
}
