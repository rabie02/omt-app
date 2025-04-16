import React, { useEffect } from 'react';

const Donate = () => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AZsY9wZUh2RNjuBRZW2qVZUNbMA5UpUIKyQQVSmj4QV8D7p8C26qK6YBKH_oAbqb7_6haJeuQXWGVSzf';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '30'
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            });
          }
        }).render('#paypal-button-container');
      };
    };

    loadPayPalScript();
  }, []);
  return (
    <div className="donate-container">
      <div className="center">
        <h3 className="donate">
          <div className="w3-card-4">
            <header className="w3-container w3-blue">
              <h1>DONATE</h1>
            </header>
            <div className="w3-container">
              <p>Donate for a great cause. Be a hero.</p>
              {/* PAYPAL BUTTONS HERE  */}
              <div id="paypal-button-container"></div>
            </div>
            <footer className="w3-container w3-blue">
              <h5>&copy; Store</h5>
            </footer>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default Donate;