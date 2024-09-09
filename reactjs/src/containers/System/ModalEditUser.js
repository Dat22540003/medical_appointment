import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    this.setState({ password: "password", ...user });
  }

  toggle = () => {
    this.props.toggleModal();
  };

  handleOnChangeInput = (event, id) => {
    let newState = { ...this.state };
    newState[id] = event.target.value;
    this.setState({ ...newState });
  };

  checkValidatedInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(arrInput[i] + " is required");
        break;
      }
    }

    return isValid;
  };

  handleEditUser = () => {
    let isValid = this.checkValidatedInput();
    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                type="text"
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                type="password"
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                type="text"
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                type="text"
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                type="text"
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleEditUser();
            }}
            className="px-3"
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
