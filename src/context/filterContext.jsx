import { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "./productContext";
import reducer from "../reducer/filterReducer";

export const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
  },
};

export const FilterProvider = ({ children }) => {
  const { products } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  //set grid view
  const setGridview = () => {
    dispatch({ type: "SET_GRIDVIEW" });
  };
  //set list view
  const setListview = () => {
    dispatch({ type: "SET_LISTVIEW" });
  };

  //get the sorting value
  const sorting = (event) => {
    console.log(event.target.value);
    dispatch({ type: "GET_SORT_VALUE", payload: event.target.value });
  };

  //update filter value
  const updateFilterValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
  };

  //to sort the product & search a particular product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridview, setListview, sorting, updateFilterValue }}
    >
      {children}
    </FilterContext.Provider>
  );
};
