import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function ProductsInDataGrid({ books, deleteHandler }) {
    const [selected, setSelected] = useState();

    function deleteSelectedItems() {
        selected.forEach(element => {
            deleteHandler(element);
        });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'author',
            headerName: 'Author',
            width: 170,
            editable: false,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 170,
            editable: false,
        },
        {
            field: 'isbn',
            headerName: 'ISBN',
            width: 150,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 70,
            editable: false,
        },
        {
            field: 'stockQuantity',
            headerName: 'Stock',
            width: 90,
            editable: false,
        },
        {
            field: 'image',
            headerName: 'Image Source',
            width: 150,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 120,
            editable: false,
        },
    ];
    const rows = books.map((book) => {
        return {
            id: book.bookId,
            author: book.author,
            title: book.title,
            isbn: book.isbn,
            price: book.price,
            stockQuantity: book.stockQuantity,
            image: book.image,
            category: book.category.categoryName,
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
