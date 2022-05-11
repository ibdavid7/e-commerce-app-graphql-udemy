const {v4: uuid} = require('uuid');

exports.Mutation = {
    addCategory: (parent, {input}, {db}) => {

        const {name} = input;

        const newCategory = {
            id: uuid(),
            name
        }
        db.categories.push(newCategory);
        return newCategory;
    },
    addProduct: (parent, {input}, {db}) => {
        const {
            name,
            description,
            quantity,
            price,
            image,
            onSale,
            categoryId,
        } = input;

        const newProduct = {
            id: uuid(),
            name,
            description,
            quantity,
            price,
            image,
            onSale,
            categoryId
        }

        db.products.push(newProduct);

        return newProduct;

    },
    addReview: (parent, {input}, {db}) => {

        const {title, comment, rating, productId} = input;

        const newReview = {
            id: uuid(),
            date: new Date(Date.now()).toISOString().split("T")[0],
            title,
            comment,
            rating,
            productId
        }

        db.reviews.push(newReview);

        return newReview;

    },
    deleteCategory: (parent, {id}, {db}) => {

        if (db.categories.map(category => category.id).includes(id)) {

            db.categories = db.categories.filter(category => category.id !== id);
            db.products = db.products.map(product => {
                if (product.categoryId === id) {
                    return {
                        ...product,
                        categoryId: null,
                    }
                }
                return product;
            })
            return true;
        }
        return false;
    },
    deleteProduct: (parent, {id}, {db}) => {
        if (db.products.map(product => product.id).includes(id)) {
            db.products = db.products.filter(product => product.id !== id);
            db.reviews = db.reviews.filter(review => review.productId !== id);
            return true;
        }

        return false;
    },
    deleteReview: (parent, {id}, {db}) => {
        if (db.reviews.map(review => review.id).includes(id)) {
            db.reviews = db.reviews.filter(review => review.id !== id);
            return true;
        }
        return false;
    },
    updateCategory: (parent, {id, input}, {db}) => {
        const index = db.categories.findIndex(category => category.id === id);

        if (index < 0) return null;

        db.categories[index] = {
            ...db.categories[index],
            ...input,
        }

        return db.categories[index];
    },
    updateProduct: (parent, {id, input}, {db}) => {
        const index = db.products.findIndex(product => product.id === id);
        if (index < 0) return null;
        db.products[index] = {
            ...db.products[index],
            ...input,
        }

        return db.products[index];
    },
    updateReview: (parent, {id, input}, {db}) => {
        const index = db.reviews.findIndex(review => review.id === id);
        if (index < 0) return null;
        db.reviews[index] = {
            ...db.reviews[index],
            ...input,
        }

        return db.reviews[index];
    }
}