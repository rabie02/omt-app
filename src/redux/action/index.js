//For Add item to Cart
export const addCart = (product) => {
    return {
      type: "ADDITEM",
      payload: product,
    };
  };
  

  
  export const delCart = (product) => {
    return {
      type: "DELITEM",
      payload: product,
    };
  };
  
  export const emptyCart = (product) => {
    return {
      type: "EMPTYCART",
    };
  };
  
  export const signIn = (user) => {
    return {
      type: "LOGIN",
      payload: user,
    };
  };
  
  export const signOut = () => {
    return {
      type: "SIGNOUT",
      payload: null,
    };
  };
  export const increaseQuantity = (productId) => {
    return {
      type: "INCREASE_QUANTITY",
      payload: productId,
    };
  };
  
  export const decreaseQuantity = (productId) => {
    return {
      type: "DECREASE_QUANTITY",
      payload: productId,
    };
  };