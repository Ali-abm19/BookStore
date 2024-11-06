import { TextField } from '@mui/material'
import React from 'react'

export default function MinMaxPrice({ setMinPrice, setMaxPrice }) {
    return (
        <div>

            <TextField
                id="min"
                label="Minimum"
                variant="outlined"
                helperText="Enter the minimum price"
                type='number'
                onChange={(event) => setMinPrice(event.target.value)}
            />
            <TextField
                id="max"
                label="Maximum"
                variant="outlined"
                helperText="Enter the maximum price"
                type='number'
                onChange={(event) => setMaxPrice(event.target.value)}
            />
        </div>
    )
}
