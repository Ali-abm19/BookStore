import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function CreateCategory({ category, setCategory }) {

    function changeHandler(event) {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value })
    }

    // function fetchCategories() {
    //     axios.get("http://localhost:5125/api/v1/Categories")
    //         .then((response) => {
    //             setCategories(response.data);
    //             setLoadingCategories(false);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setLoadingCategories(false);
    //         })
    // }

    // useEffect(() => {
    //     fetchCategories();
    //     // eslint-disable-next-line
    // }, [loadingCategories]);

    // console.log(categories[0].categoryName);

    return (
        <div>
            <TextField
                name="categoryName"
                label="Name"
                variant="outlined"
                helperText="Enter the category name"
                type='text'
                onChange={changeHandler}
            />
            <TextField
                name="description"
                label="Category Description"
                variant="outlined"
                helperText="Enter the description"
                type='text'
                onChange={changeHandler}
            />
        </div>
    )
}
