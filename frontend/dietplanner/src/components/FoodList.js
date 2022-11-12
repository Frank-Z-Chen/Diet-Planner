import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";


const FoodList = props => {
    
    //hooks
    const [selected, setSelected] = useState(0);
    //useEffect(() => {deleteSelectedRows()});
    const onSelectClickedHandler = () => {
        const response = axios.delete('http://localhost:8000/planner/foods/' + selected + '/')
        console.log("deleted")
        return response.data
        console.log("button clicked")
    }


    //table columns
    const columns = [
        { field: 'foodid', headerName: 'ID', width: 90 },
        {
            field: 'foodname',
            headerName: 'Food Name',
            width: 150,
            editable: true,
        },
        {
            field: 'carb',
            headerName: 'Carb.',
            width: 150,
            editable: true,
        },
        {
            field: 'fat',
            headerName: 'Fat',
            width: 150,
            editable: true,
        },
        {
            field: 'protein',
            headerName: 'Protein',
            width: 150,
            editable: true,
        },
    ];

    //select handler
    const onRowsSelectionHandler = (e) =>{
        setSelected(e)
    };
    
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(r) => r.foodid}
                rows={props.foods}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={e => onRowsSelectionHandler(e)}
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
            />
            <div>
                <button onClick={() => (onSelectClickedHandler())}>Delete</button>

                
            </div>
        </Box>    
    );
};



export default FoodList;