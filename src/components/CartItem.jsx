import React, { useContext } from "react";
import CartAmountToggle from "./CartAmountToggle";
import FormatPrice from "../Helper/FormatPrice";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../context/cartContext";

const CartItem = ({ ele }) => {
  const { id, name, image, color, price, amount } = ele;
  //console.log(ele);

  const { removeItem, setDecrease, setIncrease } = useContext(CartContext);

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={ele.amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          {" "}
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
