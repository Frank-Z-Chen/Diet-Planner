import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import DataTable from "./DataTable";
import RecipeUpdate from "./RecipeUpdate";

const RecipeHome = () => {
  //hooks
  const [recipe, setRecipe] = useState([]);
  const [recipeids, setRecipeIds] = useState(null);
  //variables
  const recipeColumns = [
    { field: 'planid', headerName: 'ID', width: 90 },
    {
        field: 'planname',
        headerName: 'Recipe Name',
        width: 150,
        editable: true,
    },
    {
        field: 'carb',
        headerName: 'Recipe Carb.',
        width: 150,
        editable: true,
    },
    {
        field: 'fat',
        headerName: 'Recipe Fat',
        width: 150,
        editable: true,
    },
    {
        field: 'protein',
        headerName: 'Recipe Protein',
        width: 150,
        editable: true,
    },
  ];

  //useEffect
  useEffect(()=>{
    getRecipes();
    setRecipeIds("r.recipeid");                                                                          
  },[recipe]);

  //get API
  const getRecipes = async () => {
    /*await axios.get('http://localhost:8000/planner/foods/')
    .then( (res) =>{ setRecipe(res.data)})
    .catch((error =>{console.log(error)}));*/
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          {/*<DataTable
            data={plan}
            columns={planColumns}
            DELETE_API='http://localhost:8000/planner/plans/'
            data_id={planids}
            deleteAllowed
          />*/}
          <RecipeUpdate />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeHome;