import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import styles from './Product.module.css'
import Product from './Product';
import CustomPagination from './CustomPagination';
import SearchForBook from '../Forms/SearchForBook';
import MinMaxPrice from '../Forms/MinMaxPrice';



export default function Products({ setCartBooks, cartBooks }) {

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [dbBooksCount, setDbBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(2);
  // const [offset, setOffset] = useState(0);
  const [title, setTitle] = useState(" ");
  const [author, setAuthor] = useState(" ");
  const [max, setMax] = useState(1000);
  const [min, setMin] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const url = `http://localhost:5125/api/v1/Books?limit=${limit}&offset=${(page - 1) * limit}&SearchByTitle=${title}&MaxPrice=${max}&MinPrice=${min}&SearchByAuthor=${author}`;

  const handleChange = (event, value) => {
    // const nextValue = value;
    setPage(value);
    //const nextOffset = page * limit - limit;
  }
  function fetchListFromAPI() {
    axios.get(url)
      .then((response) => {
        setFetchedBooks(response.data.books);
        setDbBooksCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch the books");
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchListFromAPI();
    // eslint-disable-next-line
  }, [limit, title, max, min, page, author]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // console.log(cartBooks);
  function addToCart(book) {
    if (!(cartBooks.some((b) => b.book.bookId === book.bookId))) {
      setCartBooks([...cartBooks, { quantity: 1, book: book }]);
      enqueueSnackbar("Book added to cart", { variant: "success" })
    }
    else {
      enqueueSnackbar("Book is already in the cart", { variant: "error" })
    }
  }

  return (
    <div className={styles.OuterContainer}>
      <SearchForBook
        setTitle={setTitle}
        setAuthor={setAuthor} />
      <MinMaxPrice
        setMaxPrice={setMax}
        setMinPrice={setMin}
      />

      <Grid className={styles.booksContainer} container spacing={12} justifyContent={'center'}>
        {fetchedBooks.map((b) =>
          <div className={styles.book} key={b.bookId} size="3" >
            <Product book={b} />
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => navigate(`/books/${b.bookId}`)}>Details</Button>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => addToCart(b)}>Add to Cart</Button>
          </div>
        )}

      </Grid >
      <br />
      <CustomPagination handleChange={handleChange}
        limit={limit}
        page={page}
        count={dbBooksCount}
      />
    </div>

  )
}
