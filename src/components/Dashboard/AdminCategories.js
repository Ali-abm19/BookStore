import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';

import CategoriesInDataGrid from '../Categories/CategoriesInDataGrid';
import CreateCategory from '../Forms/CreateCategory';
import { enqueueSnackbar } from 'notistack';

export default function AdminCategories() {
    const [fetchedCats, setFetchedCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);
    const url = `http://localhost:5125/api/v1/Categories`;
    const token = localStorage.getItem("token");

    function fetchListFromAPI() {
        axios.get(url,)
            .then((response) => {
                setFetchedCats(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch the categories");
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchListFromAPI();
    }, []);

    function createCateHandler() {
        axios.post("http://localhost:5125/api/v1/Categories", category,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => { enqueueSnackbar(`Category was Created`, { variant: 'success' }) })
            .catch((error) => { enqueueSnackbar(`Category creation failed`, { variant: 'error' }) })

    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Admin Categories View</h1>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Create Category
                </AccordionSummary>
                <AccordionDetails>
                    <CreateCategory
                        category={category}
                        setCategory={setCategory} >
                    </CreateCategory>

                    <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => { createCateHandler() }} >Create Category</Button>

                </AccordionDetails>
            </Accordion>

            <CategoriesInDataGrid categories={fetchedCats} />
        </div>
    )

}