import { MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CreateBook({ newBook, setNewBook }) {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    function changeHandler(event) {
        const { name, value } = event.target;
        setNewBook({ ...newBook, [name]: value })
    }

    function fetchCategories() {
        axios.get("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Categories")
            .then((response) => {
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch((error) => {
                //console.log(error);
                setLoadingCategories(false);
            })
    }

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, [loadingCategories]);

    // //console.log(categories[0].categoryName);

    if (!loadingCategories)
        return (
            <div>
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    helperText="Book title"
                    type='text'
                    onChange={changeHandler}
                />
                <TextField
                    name="author"
                    label="Author"
                    variant="outlined"
                    helperText="Name of the author"
                    type='text'
                    onChange={changeHandler}
                />
                <TextField
                    name="isbn"
                    label="ISBN"
                    variant="outlined"
                    helperText="ISBN of the book"
                    type='text'
                    onChange={changeHandler}
                />

                <br></br>

                <TextField
                    name="price"
                    label="Price"
                    variant="outlined"
                    type='number'
                    style={{ width: '120px' }}
                    onChange={changeHandler}
                />
                <TextField
                    name="StockQuantity"
                    label="Quantity"
                    variant="outlined"
                    type='number'
                    style={{ width: '120px' }}
                    onChange={changeHandler}
                />

                <Select
                    name="bookFormat"
                    label="Book Format"
                    onChange={changeHandler}
                    defaultValue={"Paperback"}
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
                    defaultValue={categories[0].categoryName || ""}

                >
                    {categories.map((category) =>
                        <MenuItem value={category.categoryName} key={category.categoryId}>
                            {category.categoryName}
                        </MenuItem>
                    )}
                </Select>

                <br></br>
                <br></br>

                <TextField
                    name="image"
                    label="Book Cover Image"
                    variant="outlined"
                    helperText="A link to the cover image"
                    type='url'
                    fullWidth
                    onChange={changeHandler}
                />

                <br></br>
                <TextField
                    name="description"
                    label="Book Description"
                    variant="outlined"
                    helperText="Description of the book"
                    type='text'

                    multiline
                    rows={6}
                    fullWidth
                    maxRows={6}
                    onChange={changeHandler}
                />

            </div>
        )
    else {
        <div>
            loading...
        </div>
    }
}
