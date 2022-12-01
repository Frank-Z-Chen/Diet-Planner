import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import DataTable from "./DataTable";
import RecipeUpdate from "./RecipeUpdate";

const RecipeHome = () => {
  const [recipe, setRecipe] = useState([]);
  const [recipeids, setRecipeIds] = useState(null);
  useEffect(()=>{
    setRecipeIds("r.recipeId");                                                                          
  },[recipe]);

   //variables
   const recipeColumns = [
    { field: 'recipeId', headerName: 'ID', width: 90 },
    /*
    {
        field: 'planname',
        headerName: 'Recipe Name',
        width: 150,
        editable: true,
    },
    */
    {
        field: 'total_carb',
        headerName: 'Recipe Carb.',
        width: 150,
        editable: true,
    },
    {
        field: 'total_fat',
        headerName: 'Recipe Fat',
        width: 150,
        editable: true,
    },
    {
        field: 'total_protein',
        headerName: 'Recipe Protein',
        width: 150,
        editable: true,
    },
  ];

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DataTable
            columns={recipeColumns}
            API='http://localhost:8000/planner/users/10000/recipes/'
            data_id={recipeids}
            deleteAllowed
          />
          {<RecipeUpdate />}
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeHome;