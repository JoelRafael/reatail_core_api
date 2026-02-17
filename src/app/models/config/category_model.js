const {QueryTypes} = require("sequelize");
const sequelize = require("../../database/conexion");

const findAll = async () => {
    try {
        const categories = await sequelize.query( `SELECT 
                                                          key_id, 
                                                          name,
                                                          description,
                                                          slug,
                                                          active 
                                                   FROM category`, {   }, {
            type: QueryTypes.SELECT,
            raw: true,
        });
        return categories;
    }   catch (error) {                 
        console.error("Error fetching categories:", error);
        throw error;
    }}

const findCategoryById = async (id) => {
    try {
        const category = await sequelize.query( `SELECT category_id, name FROM category WHERE category_id = :id`, { }, {
            replacements: { id },
            type: QueryTypes.SELECT,    }     );
        return category;
    }   catch (error) {                 
        console.error("Error fetching category by ID:", error);
        throw error;
    }}

const categoryCreate = async (body) => { }  

const categoryUpdate = async (id, body) => { }

module.exports = {
    findAll,
    findCategoryById,
    categoryCreate,
    categoryUpdate
}   