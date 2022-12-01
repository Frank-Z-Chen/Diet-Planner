import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import DataTable from "./DataTable";
import {useHistory} from 'react-router-dom';

const RecipeUpdate = () => {
  const [food, setFoods] = useState([]);
  const [foodids, setFoodIds] = useState(null);
  useEffect(()=>{
    setFoodIds("r.foodid");                                                                          
  },[food]);

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
  ];
  

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DataTable
            columns={foodColumns}
            API='http://localhost:8000/planner/foods/'
            data_id={foodids}
            deleteAllowed={false}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default RecipeUpdate;