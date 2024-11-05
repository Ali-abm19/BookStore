import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../products/Product';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import CreateBook from '../Forms/CreateBook';

export default function AdminProducts() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [dbBooksCount, setDbBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState(null);
  const url = `http://localhost:5125/api/v1/Books?limit=${1000}`;
  const token = localStorage.getItem("token");

  function deleteHandler(book) {
    axios.delete("http://localhost:5125/api/v1/Books/" + book.bookId,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => enqueueSnackbar(`Book ${book.title} was Deleted`, { variant: 'info' })
      )
      .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
    fetchListFromAPI();
  }

  function createBookHandler(book) {
    axios.post("http://localhost:5125/api/v1/Books/", book,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => enqueueSnackbar(`Book ${book.title} was Created`, { variant: 'success' })
      )
      .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
    fetchListFromAPI();
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Admin Books view</h1>
      <CreateBook
        newBook={newBook}
        setNewBook={setNewBook}
      ></CreateBook>
      <Button color='F5EDF0' variant="outlined" onClick={() => { createBookHandler(newBook) }} >Create Book</Button>

      {fetchedBooks.map((b) =>
        <div key={b.bookId}>
          <Product book={b} />
          <Button color='F5EDF0' variant="outlined" onClick={() => deleteHandler(b)}>Delete</Button>
          <br />
        </div>

      )}
    </div>
  )
}
