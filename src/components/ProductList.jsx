import React, { useContext } from "react";
import { FilterContext } from "../context/filterContext";
import GridView from "./Gridview";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useContext(FilterContext);
  // console.log(filter_products);
  if (grid_view) return <GridView products={filter_products} />;

  if (grid_view === false) return <ListView products={filter_products} />;
};

export default ProductList;
