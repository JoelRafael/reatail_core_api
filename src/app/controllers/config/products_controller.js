const {response} = require("express");
const { defaultResponse, defaulMessage } = require("../../helpers/script");
const { findAll, findProductsBySearch, productCreate} = require("../../models/config/products_model")

const getProducts = async (req, res = response) => {

 defaultResponse(res, await findAll(), "Products found");     

};

const getProductsBySearch = async (req, res = response) => {

    const json = req.body;

    if (!json) return defaulMessage(res, "Search body is required", 400);

    defaultResponse(res, await findProductsBySearch(json), "Products found by search");
};

const createProduct = async (req, res = response) => {

 const newProduct = {
name: req.body.name,
bar_code: req.body.bar_code,
internal_id: req.body.internal_id,
category_id: req.body.category_id,
price_buy: req.body.price_buy,
price_sale: req.body.price_sale,      
price_origin: req.body.price_origin,    
unit: req.body.unit, 
stock: req.body.stock, 
unit_tax: req.body.unit_tax, 
status_id: req.body.status_id, 
description: req.body.description, 
images: req.body.images, 
user_create: req.body.user_create, 
creation_date: req.body.creation_date
}

const findPorduct = await findProductsBySearch({ name: newProduct.name, internal_id: newProduct.internal_id, bar_code: newProduct.bar_code });

if (findPorduct.length > 0) return defaulMessage(res, "Product with the same name, internal_id or bar_code already exists", 400);

const productCreated = await productCreate(newProduct); 

if (!productCreated) return defaultResponse(res, null, "Failed to create product", 500);

defaulMessage(res,"Product created successfully");

}
module.exports = {
    getProducts,
    getProductsBySearch,
    createProduct
}
