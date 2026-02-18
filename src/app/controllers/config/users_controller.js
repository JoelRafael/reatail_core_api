const { response } = require("express");
const { findAll, findUserById, userCreate, userUpdate} = require("../../models/config/users_model");
const { findStatusId } = require("../../models/config/status_model");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getUsers = async (req, res = response) => {

defaultResponse(res, await findAll(), "Users found");

}

const createUser = async (req, res = response) => {

const {name, lastname, document, phone, location, username, password, date_born} = req.body;


const body = {
    name,
    lastname,
    document,
    phone,
    location,
    username,
    password : Buffer.from(password).toString("base64"),
    status_id : await findStatusId({name: "Activo", group: "USERS"}),  
    date_born,
}

    
const user = await userCreate(body);

if (!user) return defaulMessage(res, "Error creating user", 500);

defaulMessage(res, "User created", 201);

}

const updateUser = async (req, res = response) => {

const { id } = req.params;
const { name, lastname, document, phone, location, username, password, date_born, status_id } = req.body;

const existingUser = await findUserById(id);

if (!existingUser || existingUser.length === 0) return defaulMessage(res, "User not found", 404);

const body = {
    name,
    lastname,       
    document,
    phone,
    location,
    username,
    password : Buffer.from(password).toString("base64"),
    date_born,
    status_id
}

const user = await userUpdate(id, body);

if (!user) return defaulMessage(res, "Error updating user", 500);
defaulMessage(res, "User updated", 200);

}


module.exports = {
  getUsers,
  createUser,
  updateUser
};  