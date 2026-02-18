const {response} = require("express");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getProducts = async (req, res = response) => {

defaultResponse(res, [], "Products found");     }