import { Pagination } from '@mui/material'
import React from 'react'

export default function CustomPagination({ handleChange, limit, page, count }) {
    return (
        <div>
            <Pagination count={Math.ceil(count / limit)} variant="outlined" shape="rounded" page={page} onChange={handleChange}
                style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }} />
        </div>
    )
}
