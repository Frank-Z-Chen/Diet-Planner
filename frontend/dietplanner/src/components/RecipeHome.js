import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import {useHistory} from 'react-router-dom';
import DataTable from "./DataTable";

const RecipeHome = () => {
  const [recipe, setRecipe] = useState([]);
  const [recipeids, setRecipeIds] = useState(null);
  const [reset, setReset] = useState(true); 
  useEffect(()=>{
    setRecipeIds("r.recipeId");                                                                          
  },[recipe]);

  //variables
  const recipeColumns = [
    { field: 'recipeId', headerName: 'ID', width: 90 },
    
    {
        field: 'recipeName',
        headerName: 'Recipe Name',
        width: 150,
        editable: true,
    },
   
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
  const goUpdateRecipe = () =>{
    history.push("/create_recipe");
    setReset(!reset);
  }
  const history = useHistory();

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DataTable
            columns={recipeColumns}
            API='http://localhost:8000/planner/users/10000/recipes/'
            data_id={recipeids}
            deleteAllowed
            resetStatus={reset}
          />
            <button onClick={goUpdateRecipe}>Add/Update Recipe</button>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeHome;