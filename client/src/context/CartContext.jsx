import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const loadCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) return;

        try {

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {
        loadCart();
    }, []);

    const addToCart = async (productId) => {

        const token = localStorage.getItem("token");

        await api.post("/cart/add",
            {
                productId,
                quantity: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        loadCart();

    };

    return (

        <CartContext.Provider value={{
            cart,
            addToCart,
            loadCart
        }}>

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);