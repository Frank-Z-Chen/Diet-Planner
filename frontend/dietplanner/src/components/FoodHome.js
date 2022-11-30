import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import DataTable from "./DataTable";
import FoodForm from "./FoodForm";
import FoodFormUpdate from "./FoodFormUpdate";

const FoodHome = () => {
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

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DataTable
            columns={foodColumns}
            API='http://localhost:8000/planner/foods/'
            data_id={foodids}
            deleteAllowed
          />
          <FoodForm
            formName = "New Food"
          />
          <FoodFormUpdate/>
        </Col>
      </Row>
    </Container>
  );
}

export default FoodHome;