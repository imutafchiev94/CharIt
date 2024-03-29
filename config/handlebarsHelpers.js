module.exports = {
    isCharityAuthor: (user, charityId) => {
        return user.charities.includes(charityId);
    },
    isProductAuthor: (user, productId) => {
        return user.products.includes(productId);
    },
    sum: (price, quantity) => {
        return (price * quantity).toFixed(2);
    },
    formatPrice: (price) => {
        return price.toFixed(2);
    }
}