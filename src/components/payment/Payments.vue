<!-- <template>
  <form @submit.prevent="createOrder"> -->
    <!-- Your form fields here -->
    <!-- <button type="submit">Create Order</button>
  </form>
</template> -->

<template>
  <form @submit="createOrder">
    <div>
      <input type="number" v-model="amount" />
      <input type="text" v-model="currency" />

      <button type="submit">Create Order</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: '',
      currency: 'USD',
      script: 'https://checkout.razorpay.com/v1/checkout.js',
    };
  },
  methods: {
    loadRazorPay() {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = this.script;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    },
    createOrder() {
      // Access the amount and currency properties
      const orderData = {
        amount: this.amount,
        currency: this.currency,
      };

      // Make the API call to create the order
      axios
        .post('http://localhost:3001/api/orders/createorder/', orderData)
        .then((response) => {
          // Retrieve the order details from the response
          const { order_id, amount, currency, key } = response.data;

          // Initialize the Razorpay instance
          const razorpay = new Razorpay({
            key: key,
            amount: amount,
            currency: currency,
            name: 'My Store',
            // Add more options as needed
          });

          // Open the Razorpay payment modal
          razorpay.on('payment.success', async (payment_id) => {
            // Handle the payment success event
          });

          razorpay.open();
        })
        .catch((error) => {
          // Handle the error
        });
    },
  },
  async mounted() {
    const result = await this.loadRazorPay();
    if (!result) {
      alert('Failed to load Razorpay script');
      return;
    }
  },
};
</script>
