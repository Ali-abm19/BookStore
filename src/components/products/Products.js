import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid2';

import styles from './Product.module.css'

export default function Products() {

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function fetchListFromAPI() {
    axios.get("http://localhost:5125/api/v1/Books?limit=10")
      .then((response) => {
        setFetchedBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch the books");
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchListFromAPI();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  console.log(fetchedBooks);

  return (
    <Grid className={styles.booksContainer} container spacing={12} justifyContent={'center'}>
      {fetchedBooks.map((b) =>
        <div className={styles.book} key={b.bookId} size="3" >
          <p>{b.title}</p>
          <p>{b.price}</p>
          <p>{b.author}</p>
          <p>{b.category.categoryName}</p>
        </div>

      )
      }

    </Grid >
  )
}
