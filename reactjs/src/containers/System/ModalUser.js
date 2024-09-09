import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });

    return () => {
      emitter.off("EVENT_CLEAR_MODAL_DATA");
    };
  };

  componentDidMount() {}

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

  handleAddNewUser = () => {
    let isValid = this.checkValidatedInput();
    if (isValid) {
      this.props.createNewUser(this.state);
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
          Create new user
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
              this.handleAddNewUser();
            }}
            className="px-3"
          >
            Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
