import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function CreateCategory({ category, setCategory }) {

    function changeHandler(event) {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value })
    }

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
