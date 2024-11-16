import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import CreateBook from '../Forms/CreateBook';
import ProductsInDataGrid from '../products/ProductsInDataGrid';

export default function AdminProducts() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [dbBooksCount, setDbBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState(null);
  const url = `http://localhost:5125/api/v1/Books?limit=${1000}`;
  const token = JSON.parse(localStorage.getItem('UserInfo')).token

  function deleteHandler(book) {
    axios.delete("http://localhost:5125/api/v1/Books/" + book,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => {
        enqueueSnackbar(`Book was Deleted`, { variant: 'info' })
        fetchListFromAPI();
      }
      )
      .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  function updateHandler(book) {
    axios.put("http://localhost:5125/api/v1/Books/" + book.id, {

      "isbn": book.isbn,
      "title": book.title,
      "author": book.author,
      "price": book.price,
      "stockQuantity": book.stockQuantity,
      "image": book.image,
      "CategoryId": fetchedBooks.find(x => x.bookId === book.id).category.categoryId
    }

      ,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => enqueueSnackbar(`Book was updated`, { variant: 'info' })
      )
      .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
    fetchListFromAPI();
  }

  function createBookHandler(book) {
    axios.post("http://localhost:5125/api/v1/Books/", book,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => {
        enqueueSnackbar(`Book ${book.title} was Created`, { variant: 'success' })
        fetchListFromAPI();
      }
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
      <h1>Admin Books View</h1>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Create Book
        </AccordionSummary>
        <AccordionDetails>

          <CreateBook

            newBook={newBook}
            setNewBook={setNewBook}
          />
          <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => { createBookHandler(newBook) }} >Create Book</Button>
        </AccordionDetails>
      </Accordion>
      <br></br>
      <ProductsInDataGrid
        books={fetchedBooks}
        deleteHandler={deleteHandler}
        updateHandler={updateHandler} />
      <br />

    </div>
  )
}
