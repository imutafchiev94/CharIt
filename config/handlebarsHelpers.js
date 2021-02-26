module.exports = {
    isCharityAuthor: (user, charityId) => {
        return user.charities.includes(charityId);
    },
    isProductAuthor: (user, productId) => {
        return user.products.includes(productId);
    }
}