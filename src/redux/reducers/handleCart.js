
const handleCart =  (state = [], action) => {
  const product = action.payload;

  switch (action.type) {
    case "ADDITEM":
      const isProductInCart = state.some(
        (item) => item.id_product === product.id_product
      );

      if (!isProductInCart) {
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      } else {
        return state;
      }

    case "DELITEM":
      // Find the index of the product to be removed
      const productIndex = state.findIndex((item) => item.id === product.id);

      // If the product is found in the cart, remove it
      if (productIndex !== -1) {
        const updatedCart = [
          ...state.slice(0, productIndex),
          ...state.slice(productIndex + 1),
        ];
        return updatedCart;
      }

      // If the product is not found, return the current state
      return state;

    case "EMPTYCART":
      return [];

      case "INCREASE_QUANTITY":
        return state.map((item) =>
          item.id_product === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
      
      case "DECREASE_QUANTITY":
        return state.map((item) =>
          item.id_product === action.payload
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
      );
    default:
      return state;
  }
};

export default handleCart;
