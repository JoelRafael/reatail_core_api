const { QueryTypes } = require("sequelize");
const sequelize = require("../../database/conexion");


const findAll = async () => {
    try {
        const products = await sequelize.query( `SELECT name, 
                                                        description,
                                                        internal_id,
                                                        bar_code,
                                                        price_sale,
                                                        price_buy,
                                                        price_origin,
                                                        unit,
                                                        stock,
                                                        unit_tax,
                                                        status_id,
                                                        category_id,
                                                        images
                                                FROM products`, 
            { type: QueryTypes.SELECT,
                raw: true
            } 
        );
    return products;

}   

        catch (error) {                 
        console.error("Error fetching products:", error);
        throw error;
    }

}

const findProductsBySearch = async (search) => {
    try {
        const products = await sequelize.query( `SELECT name, 
                                                        description,
                                                        internal_id,
                                                        bar_code,
                                                        price_sale,
                                                        price_buy,
                                                        price_origin,
                                                        unit,
                                                        stock,
                                                        unit_tax,
                                                        status_id,
                                                        category_id,
                                                        images
                                                FROM products 
                                                WHERE name = '%${search.name}%'
                                                OR internal_id = '${search.internal_id}'
                                                OR bar_code = '${search.bar_code}'`
                                                , 
                                                { type: QueryTypes.SELECT,
                                                    raw: true
                                                } );
                                            
    return products;}   
    
                                                
    catch (error) {                 
        console.error("Error fetching products by search:", error);
        throw error;
    }
}

    const productCreate = async (newProduct) => {
        try {
            const createdProduct = await sequelize.query({
                query: `INSERT INTO products (
                    name,
                    description,
                    internal_id,
                    bar_code,
                    price_sale,
                    price_buy,
                    price_origin,
                    unit,
                    stock,
                    unit_tax,
                    status_id,
                    category_id,
                    images
                ) VALUES (
                    :name, 
                    :description, 
                    :internal_id, 
                    :bar_code, 
                    :price_sale, 
                    :price_buy, 
                    :price_origin, 
                    :unit, 
                    :stock, 
                    :unit_tax, 
                    :status_id, 
                    :category_id, 
                    :images
                ) RETURNING *`,
                replacements: newProduct
            });
            return createdProduct[0];
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    };
    module.exports = {
        findAll,
        findProductsBySearch,
        productCreate,
    }