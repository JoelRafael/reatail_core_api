const {response} = require("express");
const { findAll, createCategory, updateCategory} = require("../../models/config/category_model");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getCategories = async (req, res = response) => {

    defaultResponse(res, await findAll(), "Categories found");     

};

const categoryCreate = async (req, res = response) => {

    const { name, description, slug, active } = req.body;
    
  
    const newCategory = {
        name,
        description,
        slug,
        active: active || true, // Default to true if not provided  
    };
   const createdCategory = await createCategory(newCategory); 

   if (!createdCategory) return defaultResponse(res, null, "Failed to create category", 500);

   defaultResponse(res, createdCategory, "Category created successfully");

}
module.exports = {
    getCategories,
    categoryCreate
}