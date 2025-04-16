import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    sameAddress: false,
    saveInfo: false,
    paymentMethod: "Paypal", // Valeur par défaut pour le champ Paiement
  });
  // Date et heure par défaut au moment de l'initialisation du composant
  const currentDate = new Date();
  const defaultDate = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  const defaultTime = "12:00"; // Heure par défaut (12:00 PM)
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:44328/api/Commande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.username,
          email: formData.email,
          adresse: formData.address,
          ville: formData.state,
          code_postal: formData.zip,
          produits: "", // À remplir avec les produits réels
          id: null,
          paiement: formData.paymentMethod,
          date_commande: date,
          heure_commande: time,
          etat_commande: "En attente",
        }),
      });

      if (response.ok) {
        window.location.href = '/Donate';
        const result = await response.json();
        alert(result);
        
      } else {
        const result = await response.text();
        alert("Error: " + result);
      }
    } catch (error) {
      alert("An error occurred during registration: " + error.message);
    }
  };
  const state = useSelector((state) => state.addItem);
  const location = useLocation();
  const totalUSDFromCart = location.state.totalUSD;
  const totalUSD = props.location?.state?.totalUSD || 0;
  const itemList = (item) => {
    return (
      <li
        className="list-group-item d-flex justify-content-between lh-sm"
        key={item.id}
      >
        <div>
          <h6 className="my-0">{item.nom}</h6>
        </div>
        <span className="text-muted">${item.prix}</span>
      </li>
    );
  };

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state && Array.isArray(state) && state.map(itemList)}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalUSDFromCart.toFixed(2)}</strong>
              </li>
              <checkoutButton totalUSD={totalUSD} />
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" novalidate="">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="you@example.com"
                 
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                 username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Username"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  placeholder="Apartment or suite"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="United States">United States</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  City
                </label>
                <select
                  className="form-select"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="zip" className="form-label">
                  Code Postal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder=""
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <hr className="my-4" />

              <h4>Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    value="Credit card"
                    checked={formData.paymentMethod === "Credit card"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    value="Debit card"
                    checked={formData.paymentMethod === "Debit card"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    value="Paypal"
                    checked={formData.paymentMethod === "Paypal"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3"></div>

              <hr className="my-4" />

              <Link
                to="/Donate"
                className="w-100 btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                Continue to checkout
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
