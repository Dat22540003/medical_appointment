import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const handleGetAllUsersApi = (id) => {
  return axios.get(`/api/get-all-users/?id=${id}`);
};

const handleCreateNewUserApi = (data) => {
  return axios.post("/api/create-new-user", data);
};

const handleDeleteUserApi = (id) => {
  return axios.delete("/api/delete-user", { data: { id } });
};

const handleEditUserApi = (data) => {
  return axios.put("/api/edit-user", data);
};

export {
  handleLoginApi,
  handleGetAllUsersApi,
  handleCreateNewUserApi,
  handleDeleteUserApi,
  handleEditUserApi,
};
