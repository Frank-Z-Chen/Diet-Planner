import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";
import {useHistory} from 'react-router-dom';

/*PROPS
props.data: display data/rows for the table DEPRECIATED!!!
props.column: display column name for the table
props.delete_api: api used to send delete request DEPRECIATED!!!
props.data_id: the id/key name in data
props.deleteOn: toggle the display of delete button
props._recipeName: the name of recipe
*/

const DataTable = (props) => {
    const [selected, setSelected] = useState([]); //store selected column id
    const [amount, setAmount] =useState(0); //store amount entered
    const [idsAmount, setidsAmount] = useState([]); //store a pair of foodid and amount
    const [_data, setData] = useState([]);//GET data
    const [_recipeName, setRecipeName] = useState("my_recipe");
    const [reset, setReset] = useState(true);
    useEffect(() => {
        getData();
    },[]);

    useEffect( () => {
        getData();
    },[reset]);
    const history = useHistory();
    //*****handlers*****
    const onRowsSelectionHandler = (ids) =>{
        setSelected(ids);
        const selectedRowsData = ids.map((id) => _data.find((row) => row.foodid === id));
        console.log(selectedRowsData);
        console.log(amount);
    };
    const onDeleteClickedHandler = () => {
        selected.map( (id) =>
            axios.delete(props.API + id + '/')
                .then((res) => {console.log(res)})
        );
        setReset(!reset);
    };
    const onAddClickedHandler = () => {
        const pair = {
            foodId: parseInt(selected),
            weight: parseInt(amount)
        };
        setidsAmount(current => [...current,pair]);
        
        
    };
    const onCompleteClickedHandler =  async () => {
        const data = {
            recipeName : _recipeName,
            foodWeights : idsAmount
        };
        history.push("/recipe");
        await axios.post('http://localhost:8000/planner/users/10000/recipes/',data)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        });
        
    }

    //*****functions*****
    const getData = async () => {
        await axios.get(props.API)
        .then( (res) =>{ setData(res.data)})
        .catch((error =>{console.log(error)}));
      };
    
    //*****parts*****
    const deleteButton = (
        <button onClick={() => (onDeleteClickedHandler())}>Delete</button>
    );//delete button part
    const addButton = (
        <button onClick={() => (onAddClickedHandler())}>Add</button>
    );//add select record part
    const dataTable = (
        <DataGrid
                rows={_data}
                getRowId={ (r)=>eval(props.data_id) }
                columns={props.columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                /*checkboxSelection*/
                onSelectionModelChange={ (ids) => {
                    onRowsSelectionHandler(ids);
                }}
                components={{ Toolbar: GridToolbar }}
                SelectionMode="Single"
            />
    );//table display part
    const amountField = (
        <label>
            Amount(g);
            <input
            type = "number"
            value = {amount}
            onChange = { (e) => {setAmount(e.target.value)}}
            />
        </label>
    );//amount entry part
    const currentSelected = (
        idsAmount.map( (item) => (
        <li> FoodID: {item.foodId} Amount: {item.weight}</li>
    ))
    );//display current selected recipe part
    const completeButton = (
        <button onClick={() => (onCompleteClickedHandler())}>Complete!</button>
    );
    const recipenameField = (
        <label>
            RecipeName(default:my_recipe);
            <input
            type = "string"
            value = {_recipeName}
            onChange = { (e) => {setRecipeName(e.target.value)}}
            />
        </label>
    );

    //*****returns*****
    if (props.deleteAllowed===true) {
        return (
            <div>
                <Box sx={{ height: 400, width: '100%' }}>
                    {dataTable}
                </Box>
                    {deleteButton}
            </div>
        );
    }else{
        return (
            <Box sx={{ height: 400, width: '100%' }}>
                    {dataTable}
                    {recipenameField}
                    {amountField}
                    {addButton}
                    {currentSelected}
                    {completeButton}
            </Box>
        );
    }
};



export default DataTable;