import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function UsersInDataGrid({ users, deleteHandler }) {
    const [selected, setSelected] = useState();

    function deleteSelectedItems() {
        selected.forEach(element => {
            deleteHandler(element);
        });
    }
    console.log(users);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'name',
            headerName: 'Name',
            width: 170,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 170,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 170,
            editable: false,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 170,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 170,
            editable: false,
        },
    ];

    const rows = users.map((user) => {
        return {
            id: user.userId,
            name: user.name,
            address: user.address,
            email: user.email,
            phone: user.phone,
            role: user.role, 
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
            <Button color='F5EDF0' variant="outlined" onClick={() => deleteSelectedItems()}>Delete Selected</Button>
        </Box>


    );
}
