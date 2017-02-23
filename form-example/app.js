(function() {

'use strict';

Omise.setPublicKey('YOUR_PUBLIC_KEY');

var cardForm     = document.getElementById('card-form');
var checkoutForm = document.getElementById('checkout-form')

cardForm.addEventListener('submit', submitHandler, false);

// Submit handler for checkout form.
function submitHandler(event) {
  event.preventDefault();

  var cardInformation = {
    name:             cardForm.nameOnCard.value,
    number:           cardForm.cardNumber.value,
    expiration_month: cardForm.expiryMonth.value,
    expiration_year:  cardForm.expiryYear.value,
    security_code:    cardForm.securityCode.value
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
