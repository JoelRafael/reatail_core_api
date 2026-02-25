const { QueryTypes } = require("sequelize");
const sequelize = require("../database/conexion");

const findAll = async () => {
    try {
        const orders = await sequelize.query( `SELECT o.order_id,
                                                      o.code, 
                                                      o.ncf,
                                                      o.ncf_expire,
                                                      o.bill_date,
                                                      o.sub_total,
                                                      o.tax,
                                                      o.total,
                                                      o.status_id,
                                                      o.user_create,
                                                      o.key_id,
                                                      s.name
                                                FROM orders o
                                                JOIN status s ON o.status_id = s.status_id`, 
                                                     { type: QueryTypes.SELECT,
                                                        raw: true
                                                      }); 
        return orders;

}
    catch (error) {                 
        console.error("Error fetching orders:", error);
        throw error;
    }

}    

const findBySeacrh = async (body) => {
    try {
        const orders = await sequelize.query(` SELECT   o.order_id,
                                                        o.code,
                                                        o.ncf,
                                                        o.ncf_expire,
                                                        o.bill_date,
                                                        o.sub_total,
                                                        o.tax,
                                                        o.total,
                                                        o.status_id,
                                                        o.user_create,
                                                        o.key_id,
                                                        s.name
                                                     FROM orders o
                                                     JOIN status s ON o.status_id = s.status_id
                                                     WHERE o.key_id = :key_id AND o.code = :code AND o.ncf = :ncf`, 
                                                     { type: QueryTypes.SELECT,
                                                        replacements: { key_id: body.key_id, code: body.code, ncf: body.ncf},
                                                        raw: true
                                                      }); 
        return orders;
    } catch (error) {
        console.error("Error fetching order by id:", error);
        throw error;
    }
}
            
module.exports = {
    findAll,
    findBySeacrh
}