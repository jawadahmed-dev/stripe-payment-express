(async () => {
    
    const stripe = Stripe('pk_test_51NJxHkFyYmI2tpCj8pSd2z16aAeGjCuALM2iGJFkau7DIBiEy5LJbdFxmx5wT0oXbZJSlWYczwsSWnnysoYxlTuY00kL7zO5dc'); // Replace with your publishable key
    const savedCardsDropdown = document.getElementById('saved-cards');
    const message = document.getElementById('message');
    const newCardSection = document.getElementById('new-card-section');

    let selectedPaymentMethodId = null;

    // Initialize Stripe Elements
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    // Show new card section
    document.getElementById('show-new-card').addEventListener('click', () => {
      newCardSection.style.display = 'block';
    });

    // Load saved cards (fetch from your backend)
    async function loadSavedCards() {
      const res = await fetch('/get-saved-payment-methods');
      const methods = await res.json();

      savedCardsDropdown.innerHTML = '';

      methods.forEach((method) => {
        const option = document.createElement('option');
        option.value = method.id;
        option.textContent = `${method.card.brand.toUpperCase()} ending in ${method.card.last4}`;
        savedCardsDropdown.appendChild(option);
      });

      selectedPaymentMethodId = methods[0]?.id || null;
    }

    savedCardsDropdown.addEventListener('change', (e) => {
      selectedPaymentMethodId = e.target.value;
    });

    // Pay with saved card
    document.getElementById('pay-with-saved').addEventListener('click', async () => {
      if (!selectedPaymentMethodId) return alert('No card selected');

      const res = await fetch('/one-click-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: selectedPaymentMethodId })
      });

      const result = await res.json();

      message.textContent = result.success ? '✅ Payment Successful' : `❌ ${result.error}`;
    });

    // Pay with new card
    document.getElementById('new-card-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. Create PaymentIntent on your backend
      const res = await fetch('/api/payments/create-intent', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          amount: 100,
          customerId: 'cus_OSDnIE2c0eSgJn',
          currency: 'usd',
          idempotencyKey: crypto.randomUUID()
        })
      });

      const response = await res.json();
      const { clientSecret } = response.data;

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Jenny Rosen' } // Replace with dynamic data
        }
      });

      if (result.error) {
        message.textContent = `❌ ${result.error.message}`;
      } else {
        message.textContent = '✅ Card saved and charged!';
        loadSavedCards(); // Refresh saved cards
        newCardSection.style.display = 'none';
      }
    });

    // On page load
    loadSavedCards();
  
})();
