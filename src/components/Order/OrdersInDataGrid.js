import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function OrdersInDataGrid({ orders, deleteHandler, setFetchedUsers, fetchedUsers }) {
    const [selected, setSelected] = useState();

    function deleteSelectedItems() {
        selected.forEach(element => {
            deleteHandler(element);
        });
    }

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 150 },
        {
            field: 'user',
            headerName: 'User',
            width: 170,
            editable: false,
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 170,
            editable: false,
        },
        {
            field: 'dateCreated',
            headerName: 'Created',
            width: 220,
            editable: false,
        },
        {
            field: 'orderStatus',
            headerName: 'Status',
            width: 170,
            editable: false,
        },
    ];

    const rows = orders.map((order) => {
        return {
            id: order.orderId,
            user: fetchedUsers.find(u => order.userId === u.userId) ? fetchedUsers.find(u => order.userId === u.userId).name : 'error fetching name',
            totalPrice: order.totalPrice,
            dateCreated: order.dateCreated,
            orderStatus: order.orderStatus,
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
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rows) => setSelected(rows)}

            />
            <br></br>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => deleteSelectedItems()}>Delete Selected</Button>
        </Box>


    );
}
