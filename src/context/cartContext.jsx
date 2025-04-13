import { createContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

export const CartContext = createContext({});

const initialState = {
  //cart: [],
  //adding localstorage value to the cart
  cart: JSON.parse(localStorage.getItem("MyCart")) || [],
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, singleProduct) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, color, amount, singleProduct },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREASE", payload: id });
  };

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREASE", payload: id });
  };

  //adding cart to localstorage whenever cart changes
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEM" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("MyCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
