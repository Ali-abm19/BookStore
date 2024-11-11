import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function OrdersInDataGrid({ orders, deleteHandler }) {
    const [selected, setSelected] = useState();

    function deleteSelectedItems() {
        // selected.forEach(element => {
        //     deleteHandler(element);
        // });
    }

    console.log(orders);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
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
            totalPrice: order.totalPrice,
            dateCreated: order.dateCreated,
            orderStatus: order.orderStatus,
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
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => deleteSelectedItems()}>Delete Selected</Button>
        </Box>


    );
}
