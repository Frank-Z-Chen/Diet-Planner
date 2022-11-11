import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FoodForm from "./FoodForm"

class FoodModal extends Component {
    state = {
      modal: false
    };
  
    toggle = () => {
      this.setState(previous => ({
        modal: !previous.modal
      }));
    };
  
    render() {
      const create = this.props.create;
  
      var title = "Editing Food";
      var button = <Button onClick={this.toggle}>Edit</Button>;
      if (create) {
        title = "Creating New Food";
  
        button = (
          <Button
            color="primary"
            className="float-right"
            onClick={this.toggle}//!!!!!!!!!!!!!!!
            style={{ minWidth: "200px" }}
          >
            Create New
          </Button>
        );
      }
  
      return (
        <Fragment>
          {button}
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
  
            <ModalBody>
              <FoodForm
                resetState={this.props.resetState}
                toggle={this.toggle}
                food={this.props.food}
              />
            </ModalBody>
          </Modal>
        </Fragment>
      );
    }
  }
  
  export default FoodModal;
