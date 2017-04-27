(function() {

'use strict';

Omise.setPublicKey('YOUR_PUBLIC_KEY');

var checkoutForm = document.getElementById('checkout-form')

checkoutForm.addEventListener('submit', submitHandler, false);

// Submit handler for checkout form.
function submitHandler(event) {
  event.preventDefault();

  // NOTE: Using `data-name` because we don't want to send any credit card information to the server.
  var cardInformation = {
    name:             document.querySelector('[data-name="nameOnCard"').value,
    number:           document.querySelector('[data-name="cardNumber"').value,
    expiration_month: document.querySelector('[data-name="expiryMonth"').value,
    expiration_year:  document.querySelector('[data-name="expiryYear"').value,
    security_code:    document.querySelector('[data-name="securityCode"').value
  };

  Omise.createToken('card', cardInformation, function(statusCode, response) {
    if (statusCode === 200) {
      // Success: send back the TOKEN_ID to your server. The TOKEN_ID can be
      // found in `response.id`.
      checkoutForm.token.value = response.id;

      checkoutForm.submit();
    }
    else {
      // Error: display an error message. Note that `response.message` contains
      // a preformatted error message. Also note that `response.code` will be
      // "invalid_card" in case of validation error on the card.
    }
  });
}

})();
