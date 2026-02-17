const { QueryTypes } = require("sequelize");
const sequelize = require("../../database/conexion");

const findAll = async () => {
  try {
    const users = await sequelize.query(
        `SELECT 
        name, 
        lastname, 
        document, 
        code, 
        phone, 
        location, 
        username 
        FROM users`, {      
            type: QueryTypes.SELECT,
            raw: true,      
    });
   return users;
    
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Error fetching users" });
  }};

const userCreate = async (body) => {
    try {
        const user = await sequelize.query(
            `INSERT INTO users (name, lastname, document, phone, location, username, password)
             VALUES (:name, :lastname, :document, :phone, :location, :username, :password)`, {
                replacements: body,
         });
         return user;
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ msg: "Error creating user" });
    }
}

module.exports = {
  findAll,
  userCreate,
};