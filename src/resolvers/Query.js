// const {products, categories} = require("../db");
exports.Query = {
    hello: () => ['Hello', 'my', 'good', 'friend'],
    products: (parent, {filter}, {db}) => {

        let filteredProducts = db.products;

        if (filter) {

            const {onSale, avgRating} = filter;

            if (onSale) {
                filteredProducts = filteredProducts.filter(product => product.onSale === filter.onSale);
            }

            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter(product => {
                    let productReviews = db.reviews.filter(review => review.productId === product.id);
                    let sum = productReviews.reduce((acc, cur) => acc + cur.rating, 0);
                    // console.log(sum, product.name);
                    return sum / productReviews.length >= avgRating;
                });
            }
        }

        // let {onSale = undefined, avgRating = undefined} = filter;
        return filteredProducts;
    },
    product: (parent, {id}, {db}) => db.products.find(product => product.id === id),
    categories: (parent, args, {db}) => db.categories,
    category: (parent, {id}, {db}) => db.categories.find(category => category.id === id),
}