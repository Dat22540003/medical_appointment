import db from '../models';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD from server');
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs', { data });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', { user: userData });
    } else {
        return res.send('User not found');
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', { data: allUsers });
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
        return res.send('Delete done');
    } else {
        return res.send('User not found');
    }
};

module.exports = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
