import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function ProductsInDataGrid({ books, deleteHandler, updateHandler }) {
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
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 170,
            editable: true,
        },
        {
            field: 'isbn',
            headerName: 'ISBN',
            width: 150,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 70,
            editable: true,
        },
        {
            field: 'stockQuantity',
            headerName: 'Stock',
            width: 90,
            editable: true,
        },
        {
            field: 'image',
            headerName: 'Image Source',
            width: 150,
            editable: true,
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
                processRowUpdate={(updatedRow, oldRow) => {
                    updateHandler(updatedRow);
                    return updatedRow;
                }
                }

            />
            <br></br>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => deleteSelectedItems()}>Delete Selected</Button>
        </Box>


    );
}
