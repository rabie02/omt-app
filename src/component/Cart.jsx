import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delCart, increaseQuantity, decreaseQuantity } from "../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Cart() {
  const state = useSelector((state) => state?.handleCart || []);
  const userState = useSelector((userState) => userState.handleUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalUSDForPageChange, setTotalUSDForPageChange] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  

  useEffect(() => {
    // Calculate total whenever the cart items change
    const newTotalUSD = state.reduce(
      (acc, item) => acc + parseFloat(item.prix) * item.qty,
      0
    );
    setTotalUSD(newTotalUSD);
    setTotalUSD(newTotalUSD);
    setTotalUSDForPageChange(newTotalUSD);
  }, [state]);
  const removeFromCart = (item) => {
    dispatch(delCart(item));
  };

  const increaseProductQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const decreaseProductQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const proceedCheckout = () => {
    if (userState !== null) {
      navigate("/checkout", { state: { totalUSD: totalUSDForPageChange } });
    } else {
      toast("Please login first!");
      navigate("/Login");
    }
  };
  const cartItems = (product) => {
    return (
      <div key={product.id_product} className="px-4 my-5 bg-light rounded-3">
        <div className="container py-4">
          <button
            onClick={() => removeFromCart(product)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={`/assets/${product.photo}`}
                alt={product.description}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{product.description}</h3>
              <p className="lead fw-bold">${product.prix}</p>
              <div className="d-flex align-items-center">
              <button
  onClick={() => decreaseProductQuantity(product.id_product)}
  className="btn btn-secondary me-2"
>
  -
</button>
<span>{product.qty}</span>
<button
  onClick={() => increaseProductQuantity(product.id_product)}
  className="btn btn-secondary ms-2"
>
  +
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutButton = ({ totalUSD, proceedCheckout }) => {
    return (
      <div className="container">
        <div className="row">
          <button
            onClick={proceedCheckout}
            className="btn btn-dark mb-5 w-25 mx-auto"
          >
            Proceed To Checkout (${totalUSD.toFixed(2)} USDT)
          </button>
          <ToastContainer />
        </div>
      </div>
    );
  };
  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && <CheckoutButton totalUSD={totalUSD} proceedCheckout={proceedCheckout} />}

    </>
  );
}
export default Cart;
