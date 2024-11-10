import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

export default function CategoriesInDataGrid({ categories }) {
    const [selected, setSelected] = useState();

    // function deleteSelectedItems() {
    //     // selected.forEach(element => {
    //     //     deleteHandler(element);
    //     // });
    // }

    console.log(categories);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'categoryName',
            headerName: 'Name',
            width: 170,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 220,
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
        <Box sx={{ height: 400, width: '100%' }}>
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
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rows) => setSelected(rows)}

            />
            {/* <Button color='F5EDF0' variant="outlined" onClick={() => deleteSelectedItems()}>Delete Selected</Button> */}
        </Box>


    );
}
