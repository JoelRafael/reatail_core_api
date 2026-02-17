const {response} = require("express");
const { findAll, findCategoryById, categoryCreate, categoryUpdate} = require("../../models/config/category_model");
const { findStatusId } = require("../../models/config/status_model");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getCategories = async (req, res = response) => {

    defaultResponse(res, await findAll(), "Categories found");     

};

module.exports = {
    getCategories,
}