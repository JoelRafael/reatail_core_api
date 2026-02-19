const {response} = require("express");
const { findAll, createCategory, updateCategory, findCategoryById} = require("../../models/config/category_model");
const { defaultResponse, defaulMessage } = require("../../helpers/script");

const getCategories = async (req, res = response) => {

    defaultResponse(res, await findAll(), "Categories found");     

};

const categoryCreate = async (req, res = response) => {

    const { name, description, slug, user_create, active } = req.body;
    
  
    const newCategory = {
        name,
        description,
        slug,
        user_create,
        active: active || true, // Default to true if not provided  
    };
   const createdCategory = await createCategory(newCategory); 

   if (!createdCategory) return defaultResponse(res, null, "Failed to create category", 500);

   defaultResponse(res, createdCategory, "Category created successfully");

}

const categoryUpdate = async (req, res = response) => {

    const { id } = req.params;
    const { name, description, slug, active } = req.body;
    
    const existingCategory = await findCategoryById(id);

    if (!existingCategory || existingCategory.length === 0) return defaulMessage(res, "Category not found", 404);

    const updatedCategory = await updateCategory(id, { name, description, slug, active });

    if (!updatedCategory) return defaulMessage(res, "Failed to update category", 500);

    defaulMessage(res, "Category updated successfully");
}

module.exports = {
    getCategories,
    categoryCreate,
    categoryUpdate
}