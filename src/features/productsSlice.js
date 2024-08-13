import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    products: {name: "computers", price: 1200.00, quantity: 6000, expiryDate: new Date(2025, 5, 15), image: ""},
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        createProducts: (state, action) => {
            const { name, price, quantity, expiryDate, image } = action.payload;

            const newProduct = {
                name,
                price,
                quantity,
                expiryDate: new Date(expiryDate),
                image: image, 
            };

            state.products.push(newProduct);
        },
        
        updateProducts: (state, action) => {
            const { id, name, price, quantity, expiryDate, image } = action.payload;
            const product = state.products.find(product => product.id === id);

            if (product) {
                product.name = name;
                product.price = price;
                product.quantity = quantity;
                product.expiryDate = new Date(expiryDate);
                product.image = image;
            }
        },

        deleteProducts: (state, action) => {
            const { id } = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        }
    }
});

export const {createProducts , updateProducts, deleteProducts} = productsSlice.actions;
export default productsSlice.reducer;

