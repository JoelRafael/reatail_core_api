const {response} = require("express");
const { defaultResponse, defaulMessage } = require("../helpers/script");
const { findAll,findBySeacrh} = require("../models/orders_model");


const getOrders = async (req, res = response) => {

 defaultResponse(res, await findAll(), "Orders found"); 

};

const getOrdersBySearch = async (req, res = response) => {  
   
    const {key_id, code, ncf} = req.body;

    if (!key_id || !code || !ncf) return defaulMessage(res, "Search body is required with key_id, code and ncf", 400);

    const orders = await findBySeacrh({key_id, code, ncf});

    if(orders.length === 0 ) return defaulMessage(res, "This orders no found", 404);

    return defaultResponse(res, orders, "Orders found by search");
}






module.exports = {
    getOrders,
    getOrdersBySearch,
    //getOrdersById,
}