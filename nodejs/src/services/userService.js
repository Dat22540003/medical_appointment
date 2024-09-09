import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            // if useer already exist
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User is not exist';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your email is not exist in our system. Please try again';
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {};
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                    raw: true,
                });
            }
            if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id },
                    attributes: {
                        exclude: ['password'],
                    },
                    raw: true,
                });
            }
            resolve(users);
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Please try another email',
                });
            } else {
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
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || data.id === '') {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter',
                });
            }

            let user = await db.User.findOne({ where: { id: data.id } });

            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'User is not exist',
                });
            }

            await db.User.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                },
                { where: { id: data.id } },
            );

            resolve({
                errCode: 0,
                message: 'Update user succeed',
            });
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id } });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User is not exist',
                });
            }

            await db.User.destroy({
                where: { id },
            });

            resolve({
                errCode: 0,
                message: 'Delete user succeed',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
