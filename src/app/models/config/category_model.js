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
             raw: true
        });
        return categories;
    }   catch (error) {                 
        console.error("Error fetching categories:", error);
        throw error;
    }}

const findCategoryById = async (id) => {
    try {
        const category = await sequelize.query( `SELECT 
                                                       category_id, 
                                                       name,
                                                       description,
                                                       slug,
                                                       active 
                                                       FROM category 
                                                       WHERE category_id = ${id}`, {
                type: QueryTypes.SELECT,
                raw: true
            });

        return category;
        
    }   catch (error) {                 
        console.error("Error fetching category by ID:", error);
        throw error;
    }}

const createCategory = async (body) => { 
    try {
        const category = await sequelize.query(
            `INSERT INTO category (
                                     name, 
                                     description, 
                                     slug,
                                     user_create, 
                                     active)

             VALUES (                :name, 
                                     :description,
                                     :user_create, 
                                     :slug, 
                                     :active)`,
            {
                replacements: body,
                type: QueryTypes.INSERT,
            }
        );
        return category[0];
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }           
}  

const updateCategory = async (id, body) => {
    try {
        const category = await sequelize.query(`
            UPDATE category SET 
                            name = :name, 
                            description = :description, 
                            slug = :slug, 
                            active = :active 
                            WHERE category_id = :id RETURNING *`, {
            replacements: { id, ...body }
            
        });
        return category[0];
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }}

module.exports = {
    findAll,
    findCategoryById,
    createCategory,
    updateCategory
}   