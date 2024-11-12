import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

export default function CategoriesInDataGrid({ categories }) {
    const [selected, setSelected] = useState();

    console.log(categories);

    const columns = [
        { field: 'id', headerName: 'ID', width: 380 },
        {
            field: 'categoryName',
            headerName: 'Name',
            width: 180,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 400,
            editable: false,
        },
    ];

    const rows = categories.map((cat) => {
        return {
            id: cat.categoryId,
            categoryName: cat.categoryName,
            description: cat.description
        }
    })

    return (
        <Box sx={{ height: 400, width: '100%' }} style={{ marginBottom: '25px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rows) => setSelected(rows)}

            />
        </Box>


    );
}
