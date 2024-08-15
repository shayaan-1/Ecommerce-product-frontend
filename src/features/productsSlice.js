import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';  
import { current } from '@reduxjs/toolkit';


//converted to ISO String to make it serializable
const initialState = { 
    products: [
        {id: 1 , name: "clock", price: 1200.00, quantity: 6000, expiryDate: new Date(2025, 5, 15).toISOString(), image: "https://plus.unsplash.com/premium_photo-1682125784386-d6571f1ac86a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvY2tzfGVufDB8fDB8fHww"},
    ]
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        createProduct: (state, action) => {
            const { name, price, quantity, expiryDate, image } = action.payload;

            const newProduct = {
                id: Date.now(),  
                name,
                price,
                quantity,
                expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,  
                image, 
            };
            console.log(typeof(newProduct.id))
            state.products.push(newProduct);
        },

        updateProduct: (state, action) => {
            const { id, name, price, quantity, expiryDate, image } = action.payload;
            const product = state.products.find(product => product.id == id);
            if (product) {
                product.name = name;
                product.price = price;
                product.quantity = quantity;
                product.expiryDate = expiryDate ? new Date(expiryDate).toISOString() : null;
                product.image = image;
            }
            console.log(current(product)); // This will print the plain object instead of the proxy
        },

        deleteProduct: (state, action) => {
            const { id } = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        }
    }
});

export const {createProduct , updateProduct, deleteProduct} = productsSlice.actions;
export default productsSlice.reducer;

