import { TextField } from '@mui/material'
import React from 'react'

export default function SearchForBook({ setSearchTerm }) {
    return (
        <div>
            <TextField
                id="max"
                label="Search"
                variant="outlined"
                helperText="Enter the book title"
                type='text'
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    )
}