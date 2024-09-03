import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('Create a new user success');
        } catch (error) {
            reject(error);
        }
    });
};

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId }, raw: true });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                },
                { where: { id: data.id } },
            );

            let allUsers = await db.User.findAll();
            resolve(allUsers);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });
            if (user) {
                await db.User.destroy({
                    where: { id: userId },
                });
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUserData,
    deleteUserById,
};
