/* eslint-disable no-case-declarations */
const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case "SET_GRIDVIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LISTVIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProducts = [...all_products];
      const { text, category } = state.filters;

      if (text) {
        tempFilterProducts = tempFilterProducts.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text.toLowerCase());
        });
      }
      if (category !== "all") {
        tempFilterProducts = tempFilterProducts.filter(
          (curElem) => curElem.category === category
        );
      }
      return {
        ...state,
        filter_products: tempFilterProducts,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      const { filter_products, sorting_value } = state;
      let temp = [...filter_products];
      //let temp = [...action.payload]; //creating the copy of products
      if (sorting_value === "lowest") {
        newSortData = temp.sort(function (a, b) {
          return a.price - b.price;
        });
      }
      if (sorting_value === "highest") {
        newSortData = temp.sort(function (a, b) {
          return b.price - a.price;
        });
      }
      if (sorting_value === "a-z") {
        newSortData = temp.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sorting_value === "z-a") {
        newSortData = temp.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filter_products: newSortData,
      };
    default:
      state;
  }
};

export default filterReducer;
