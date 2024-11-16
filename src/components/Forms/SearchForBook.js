import { TextField } from '@mui/material'
import React from 'react'

export default function SearchForBook({ setTitle, setAuthor, setLimit }) {
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
            <TextField
                id="limit"
                label="Books per page"
                variant="outlined"
                type='number'
                style={{width:'160px'}}
                onChange={(event) => setLimit(event.target.value)}
            />
        </div>
    )
}