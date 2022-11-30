import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import DataTable from "./DataTable";

const RecipeUpdate = () => {
   //hooks
  const [food, setFoods] = useState([]);
  const [foodids, setFoodIds] = useState(null);
  //variables
  const foodColumns = [
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
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'fat',
        headerName: 'Fat',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'protein',
        headerName: 'Protein',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'amount',
        headerName : 'Amount(gram)',
        type: 'number',
        width: 150,
        editable: true
    }
  ];

  //useEffect
  useEffect(()=>{
    getFoods();
    setFoodIds("r.foodid");                                                                          
  },[food]);

  //get API
  const getFoods = async () => {
    await axios.get('http://localhost:8000/planner/foods/')
    .then( (res) =>{ setFoods(res.data)})
    .catch((error =>{console.log(error)}));
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DataTable
            data={food}
            columns={foodColumns}
            DELETE_API='http://localhost:8000/planner/foods/'
            data_id={foodids}
            deleteAllowed={false}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default RecipeUpdate;