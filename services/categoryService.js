const Category = require('../models/category');
const Product = require('../models/product');

function getAllCategories() {
    return Category.find({deletedAt: null}, (err, categories) => {
        if(err) {
            console.log(err);
        }
        return categories;
    })
}

async function getCategoryFromProductId(id) {

    var product = await Product.findById(id).populate("category").lean();
    var category = product.category;

    return category;

}

async function getCategoryById(id) {
    var category = await Category.findById(id).lean();
    return category;
}

async function addProductToCategory(categoryId, productId) {
    var category = await Category.findById(categoryId)
    var product = await Product.findById(productId)

    await category.products.push(product);

    return await category.save();
}

module.exports = {
    getAllCategories,
    getCategoryFromProductId,
    getCategoryById,
    addProductToCategory
}