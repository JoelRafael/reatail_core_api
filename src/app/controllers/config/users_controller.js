const { response } = require("express");
const { findAll, userCreate} = require("../../models/config/users_model");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getUsers = async (req, res = response) => {

defaultResponse(res, await findAll(), "Users found");

}

const createUser = async (req, res = response) => {

const {name, lastname, document, phone, location, username, password} = req.body;


const body = {
    name,
    lastname,
    document,
    phone,
    location,
    username,
    password : Buffer.from(password).toString("base64"),
}

    
const user = await userCreate(body);

if (!user) return defaulMessage(res, "Error creating user", 500);

defaulMessage(res, "User created", 201);

}

module.exports = {
  getUsers,
  createUser,
};  