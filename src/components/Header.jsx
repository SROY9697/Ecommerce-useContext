import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 8rem;
  }
`;

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img alt="logo" src="./images/download.jpg" className="logo" />
      </NavLink>
      <Navbar />
    </MainHeader>
  );
};

export default Header;
