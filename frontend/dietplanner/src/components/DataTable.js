import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";

/*PROPS
props.data: display data/rows for the table
props.column: display column name for the table
props.delete_api: api used to send delete request
props.data_id: the id/key name in data
props.deleteOn: toggle the display of delete button
props.recipeName: the name of recipe
*/

const DataTable = (props) => {
    
    //hooks
    const [selected, setSelected] = useState([]);
    const [idsWeight, setidsWeight] = useState([]);
    
    //handlers
    const onRowsSelectionHandler = (e) =>{
        setSelected(e);
    };
    const onDeleteClickedHandler = () => {
        selected.map( (id) =>
            axios.delete(props.DELETE_API + id + '/')
                .then((res) => {console.log(res)})
        );
    };
    const onConfirmClickedHandler = async (e) => {
        e.preventDefault();
        
        const data = {
            userid: 1,
            recipeName: props.recipeName,
            foodWeight:idsWeight
        };
        
        await axios.post('http://localhost:8000/planner/foods/',data)
        .then(res =>{
        console.log(res)
        })
        .catch(err =>{
        console.log(err)
        });
    };
    
    //delete button
    const deleteButton = 
        <button onClick={() => (onDeleteClickedHandler())}>Delete</button>;
    //comfirm select record
    const confirmButton = 
        <button onClick={() => (onConfirmClickedHandler())}>Confirm</button>;
    //table display
    const dataTable = (
        <DataGrid
                rows={props.data}
                getRowId={ (r)=>eval(props.data_id) }
                columns={props.columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={ (ids) => {
                    onRowsSelectionHandler(ids);
                    const selectedIDs = new Set(ids);
                    const selectedRowData = props.data.filter((row) =>
                        selectedIDs.has(row.amount.toString()));
                    console.log(selectedRowData);
                }}
                components={{ Toolbar: GridToolbar }}
            />
    );
    if (props.deleteAllowed===true) {
        return (
            <Box sx={{ height: 400, width: '100%' }}>
                    {dataTable}
                    {deleteButton}
            </Box>
        );
    }else{
        return (
            <Box sx={{ height: 400, width: '100%' }}>
                    {dataTable}
            </Box>
        );
    }
};



export default DataTable;