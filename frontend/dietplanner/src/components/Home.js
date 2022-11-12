import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import FoodList from "./FoodList";
import axios from "axios";
import FoodModal from "./FoodModal";
//import { API_URL } from "../constants";

class Home extends Component {
  state = {
    foods: []
  };

  componentDidMount() {
    this.resetState();
  }

  getFoods = async () => {
    await axios.get('http://localhost:8000/planner/foods/')
    .then(res =>{ this.setState({foods : res.data});
    })
  };

  resetState = () => {
    this.getFoods();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <FoodList
              foods={this.state.foods}
              resetState={this.resetState}
            />
          </Col>
        </Row>

        {/*<Row>
          <Col>
            <FoodModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        */}
      </Container>
    
    );
  }
}

export default Home;