const {response} = require("express");
const { defaultResponse, defaulMessage } = require("../helpers/script");
const { findAll,findBySeacrh, findOrderDetailsByOrderId} = require("../models/orders_model");


const getOrders = async (req, res = response) => {

 defaultResponse(res, await findAll(), "Orders found"); 

};

const getOrdersBySearch = async (req, res = response) => {  
   
    const {key_id, code, ncf} = req.body;

    if (!key_id && !code && !ncf) return defaulMessage(res, "Search body is required with key_id, code and ncf", 400);

    const orders = await findBySeacrh({key_id, code, ncf});

    if(orders.length === 0 ) return defaulMessage(res, "This orders no found", 404);

    return defaultResponse(res, orders, "Orders found by search");
}

const getOrdersDetails = async (req, res = response) => {

    const {key_id, code, ncf} = req.body;

    if (!key_id && !code && !ncf) return defaulMessage(res, "Search body is required with key_id, code and ncf", 400);
 
    const orders = await findBySeacrh({key_id, code, ncf});

    if(orders.length === 0 ) return defaulMessage(res, "This orders no found", 404);

    const orderDetails = await findOrderDetailsByOrderId(orders[0].order_id);

    if(orderDetails.length === 0 ) return defaulMessage(res, "This order details no found", 404);

    const objetResponse = {
        order: orders[0],
        details:orderDetails
    }
    return defaultResponse(res, objetResponse, "Order details found");

}

const createOrder = async (req, res = response) => {

 if (!req.body) return defaulMessage(res, "Order body is required", 400);

 const status_id = await findStatusId({ action: "order.bill", group: "Order" });

 if (!status_id) return defaulMessage(res, "Status bill no found", 404);

    const newOrder = {
        ncf: null,
        ncf_expire: null,
        method_payment: req.body.method_payment,
        user: req.body.user,
        sub_total: req.body.sub_total,
        tax: req.body.tax,
        total: req.body.total,
        status_id: status_id,
        items: req.body.items,
    }


    // const orderCreated = await orderCreate(newOrder);    

}





module.exports = {
    getOrders,
    getOrdersBySearch,
    getOrdersDetails
}