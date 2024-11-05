import { MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CreateBook({ newBook, setNewBook }) {
    const [categories, setCategories] = useState([]);

    function changeHandler(event) {
        const { name, value } = event.target;
        setNewBook({ ...newBook, [name]: value })
    }

    function fetchCategories() {
        axios.get("http://localhost:5125/api/v1/Categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <TextField
                name="title"
                label="Book Title"
                variant="outlined"
                helperText="Enter the book title"
                type='text'
                onChange={changeHandler}
            />
            <TextField
                name="author"
                label="Book Author"
                variant="outlined"
                helperText="Enter the name of the author"
                type='text'
                onChange={changeHandler}
            />
            <TextField
                name="isbn"
                label="Book ISBN"
                variant="outlined"
                helperText="Enter the book of the ISBN"
                type='text'
                onChange={changeHandler}
            />
            <TextField
                name="price"
                label="Book Price"
                variant="outlined"
                helperText="Enter the book price in usd"
                type='number'
                onChange={changeHandler}
            />
            <TextField
                name="StockQuantity"
                label="Book Quantity"
                variant="outlined"
                helperText="Enter the book's stock quantity"
                type='number'
                onChange={changeHandler}
            />
            <TextField
                name="image"
                label="Book Cover Image"
                variant="outlined"
                helperText="Enter the book's cover link"
                type='url'
                onChange={changeHandler}
            />
            <Select
                //   labelId="Format"
                name="bookFormat"
                label="Book Format"
                onChange={changeHandler}
            >
                <MenuItem value={"Audio"}>Audio</MenuItem>
                <MenuItem value={"Paperback"}>Paperback</MenuItem>
                <MenuItem value={"Hardcover"}>Hardcover</MenuItem>
                <MenuItem value={"Ebook"}>Ebook</MenuItem>
            </Select>


            <Select
                name="categoryName"
                label="Book Category"
                onChange={changeHandler}
            >
                {categories.map((category) =>
                    <MenuItem value={category.categoryName} key={category.categoryId}>
                        {category.categoryName}
                        </MenuItem>
                )}
            </Select>


        </div>
    )
}
