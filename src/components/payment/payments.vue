<template>
  <form @submit="createOrder">
    <div>
      <input type="number" v-model="amount" />
      <input type="text" v-model="currency" />

      <!-- <button type="submit">Create Order</button> -->
      <button id="rzp-button1">Pay with Razorpay</button>
    </div>
  </form>
</template>
