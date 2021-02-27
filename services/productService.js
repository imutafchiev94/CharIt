const Product = require('../models/product');

async function getProductById(id) {
    const product = await (await Product.findById(id)).lean();

    return product;
} 

module.exports = {
    getProductById,
}