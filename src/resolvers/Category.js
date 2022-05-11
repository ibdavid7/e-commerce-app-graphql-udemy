const {Query} = require("./Query");
exports.Category = {
    products: (parent, {filter}, {db}) => {

        let filteredProducts = db.products.filter(product => {
            return product.categoryId === parent.id;
        });

        if (filter) {

            const {onSale, avgRating} = filter;

            if (onSale) {
                filteredProducts = filteredProducts.filter(product => product.onSale === filter.onSale);
            }

            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter(product => {
                    let productReviews = db.reviews.filter(review => review.productId === product.id);
                    let sum = productReviews.reduce((acc, cur) => acc + cur.rating, 0);
                    return sum / productReviews.length >= avgRating;
                });
            }
        }

        return filteredProducts;
    },
}