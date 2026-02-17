const { QueryTypes } = require("sequelize");
const sequelize = require("../../database/conexion");   



const findAll = async () => {
    try {
        const users = await sequelize.query( `SELECT status_id, name, group FROM status`, {
            type: QueryTypes.SELECT,
            raw: true,
        });
        return users;
    }   catch (error) {                 
        console.error("Error fetching users:", error);
        throw error;
    }}

    const findStatusId = async (body) => {
        try {
            const statusId = await sequelize.query(
                `SELECT status_id FROM status WHERE name = :name AND "group" = :group`, {
                    replacements: { group: body.group, 
                                    name: body.name },
                    type: QueryTypes.SELECT,
                    raw: true,
                }
            );
            return statusId.length > 0 ? statusId[0].status_id : null;
        } catch (error) {
            console.error("Error fetching status ID:", error);
            throw error;
        }
    }

    module.exports = {
        findAll,
        findStatusId,
    }