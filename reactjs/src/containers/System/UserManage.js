import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  handleGetAllUsersApi,
  handleCreateNewUserApi,
  handleDeleteUserApi,
  handleEditUserApi,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEditData: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await handleGetAllUsersApi("ALL");

    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };

  toggleUserEditModal = () => {
    this.setState({ isOpenEditModal: !this.state.isOpenEditModal });
  };

  createNewUser = async (data) => {
    try {
      let response = await handleCreateNewUserApi(data);

      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await handleDeleteUserApi(user.id);
      if (response.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenEditModal: true,
      userEditData: user,
    });
  };

  editUser = async (user) => {
    try {
      let response = await handleEditUserApi(user);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          toggleModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditModal && (
          <ModalEditUser
            isOpenModal={this.state.isOpenEditModal}
            toggleModal={this.toggleUserEditModal}
            currentUser={this.state.userEditData}
            editUser={this.editUser}
          />
        )}

        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            <i className="fas fa-plus pe-1"></i>
            Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsers.length > 0 &&
                arrUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          this.handleDeleteUser(item);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
