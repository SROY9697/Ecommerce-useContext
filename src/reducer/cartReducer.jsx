/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, singleProduct } = action.payload;
    // console.log(singleProduct);

    //if same item is added in the cart more than one time, then only increase the quantity of the item
    let existingProduct = state.cart.find((ele) => ele.id === id + color);
    //console.log(existingProduct);

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id == id + color) {
          let newAmount = curElem.amount + amount;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      //if no existing item, then add a new item in cart
      let cartProduct = {
        id: id + color,
        name: singleProduct.name,
        max: singleProduct.stock,
        color,
        amount,
        price: singleProduct.price,
        image: singleProduct.image[0].url,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "SET_INCREASE") {
    let updatedProduct = state.cart.map((ele) => {
      if (ele.id === action.payload) {
        let finalAmount = ele.amount + 1;

        if (finalAmount >= ele.max) {
          finalAmount = ele.max;
        }

        return {
          ...ele,
          amount: finalAmount,
        };
      } else {
        return {
          ...ele,
        };
      }
    });

    return {
      ...state,
      cart: updatedProduct,
    };
  }

  if (action.type === "SET_DECREASE") {
    let updatedProduct = state.cart.map((ele) => {
      if (ele.id === action.payload) {
        let finalAmount = ele.amount - 1;

        if (finalAmount <= 1) {
          finalAmount = 1;
        }

        return {
          ...ele,
          amount: finalAmount,
        };
      } else {
        return {
          ...ele,
        };
      }
    });

    return {
      ...state,
      cart: updatedProduct,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem;

      initialVal = initialVal + amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let updatedPrice = state.cart.reduce((initialVal, curElm) => {
      let { amount, price } = curElm;
      initialVal = initialVal + amount * price;
      return initialVal;
    }, 0);
    console.log(updatedPrice);

    return {
      ...state,
      total_price: updatedPrice,
    };
  }
};

export default cartReducer;
