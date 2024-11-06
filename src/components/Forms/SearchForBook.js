import { TextField } from '@mui/material'
import React from 'react'

export default function SearchForBook({ setTitle, setAuthor }) {
    return (
        <div>
            <TextField
                id="title"
                label="Title"
                variant="outlined"
                helperText="Enter the book title"
                type='text'
                onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
                id="author"
                label="Author"
                variant="outlined"
                helperText="Enter the author's name"
                type='text'
                onChange={(event) => setAuthor(event.target.value)}
            />
        </div>
    )
}