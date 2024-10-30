import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid2';

import styles from './Product.module.css'
import Product from './Product';
import CustomPagination from './CustomPagination';
import SearchForBook from '../Forms/SearchForBook';
import MinMaxPrice from '../Forms/MinMaxPrice';


export default function Products() {

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [dbBooksCount, setDbBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(1);
  const [offset, setOffset] = useState(0);
  const [title, setTitle] = useState(" ");
  const [max, setMax] = useState(1000);
  const [min, setMin] = useState(0);
  const [page, setPage] = useState(1);
  const url = `http://localhost:5125/api/v1/Books?limit=${limit}&offset=${offset}&SearchByTitle=${title}&MaxPrice=${max}&MinPrice=${min}`;

  const handleChange = (event, value) => {
    // const nextValue = value;
    setPage(value);
    //const nextOffset = page * limit - limit;
    setOffset(page * limit - limit);
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
  }, [limit, offset, title, max, min]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <SearchForBook
      setSearchTerm={setTitle}/>
      <MinMaxPrice
      setMaxPrice={setMax}
      setMinPrice={setMin}
      />

      <Grid className={styles.booksContainer} container spacing={12} justifyContent={'center'}>
        {fetchedBooks.map((b) =>
          <div className={styles.book} key={b.bookId} size="3" >
            <Product book={b} />
          </div>
        )}
      </Grid >
      <CustomPagination handleChange={handleChange}
        limit={limit}
        page={page}
        count={dbBooksCount}
      />
    </div>

  )
}
