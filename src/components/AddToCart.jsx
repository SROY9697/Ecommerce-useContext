/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

const AddToCart = ({ singleProduct }) => {
  const { id, colors, stock } = singleProduct;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const { addToCart } = useContext(CartContext);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : "";
  };
  const setIncrease = () => {
    stock > amount ? setAmount(amount + 1) : "";
  };

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <NavLink
        to="/cart"
        onClick={() => addToCart(id, color, amount, singleProduct)}
      >
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
  );
};

export default AddToCart;
