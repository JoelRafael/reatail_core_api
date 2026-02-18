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


  const findUserById = async (id) => {
    try {
        const user = await sequelize.query(
            `SELECT 
                user_id,
                name, 
                lastname, 
                document, 
                phone, 
                location, 
                username,
                password,
                status_id,
                date_born
            FROM users 
            WHERE user_id = ${id}`, {
                type: QueryTypes.SELECT,
                raw: true
            });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
  };

  const userCreate = async (body) => {
    try {
        const user = await sequelize.query(
            `INSERT INTO users (
                                 name, 
                                 lastname, 
                                 document, 
                                 phone, 
                                 location, 
                                 username, 
                                 password, 
                                 status_id, 
                                 date_born)
             VALUES (
                                :name, 
                                :lastname, 
                                :document, 
                                :phone, 
                                :location, 
                                :username, 
                                :password, 
                                :status_id, 
                                :date_born)`, {
                replacements: body,
         });
         return user;
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Error creating user" });
    }
}

const userUpdate = async (id, body) => {
    try {
        const user = await sequelize.query(
            `UPDATE users SET 
                          name = :name, 
                          lastname = :lastname, 
                          document = :document, 
                          phone = :phone, 
                          location = :location, 
                          username = :username, 
                          password = :password, 
                          status_id = :status_id, 
                          date_born = :date_born 
            WHERE user_id = ${id}`, {
                replacements: body,
         });
         return user;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

module.exports = {
  findAll,
  findUserById,
  userCreate,
  userUpdate
};