<template>
  <!-- <div class="container-fluid px-0 bg-black">
    <div class="container px-0">
      <nav class="tanga-header navbar navbar-toggleable-sm justify-content-center">
        <div class="navbar-collapse text-center">
          <a class="navbar-brand mr-4" href="#">
            <img src="https://dealqueue.tanganetwork.com/images/logo-506c0d3ed2d6fe57bd44a49118fd1939.png" width="" height="30" alt="">
          </a>
        </div>
      </nav>
    </div>
  </div> -->
  <navbar></navbar>
  <topbar></topbar>
  <modal></modal>
  <div style="margin-top: 10%;">
    <div class="container mt-3 mt-md-5" v-if="userId">
      <!-- {{ myorders }} -->
      <h2 class="text-charcoal hidden-sm-down">Your Orders</h2>
      <h5 class="text-charcoal hidden-md-up">Your Orders</h5>
      <!-- <input type="" name=""> -->
      <!-- <select class="mb-3">
        <option>Past 3 Months</option>
        <option>Past 7 Days</option>
        <option>Past 30 Days</option>
      </select> -->
      Filter :
      <select class="mb-3" id="filter">
        <option value="">Select Month</option>
        <option value="1">Jan</option>
        <option value="2">Feb</option>
        <option value="3">Mar</option>
        <option value="4">Apr</option>
        <option value="5">May</option>
        <option value="6">Jun</option>
        <option value="7">Jul</option>
        <option value="8">Aug</option>
        <option value="9">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>
      <!-- {{ myorders != undefined }} -->
      <!-- {{ myorders.length != 0 }} -->
      <!-- {{ myorders.length }} -->
      <div class="row" v-if="myorders != undefined">
        <div class="col-12" v-for="order in myorders">
          <!-- {{ dateFormat(order.createdAt) }} -->
          <!-- {{ order.user.userAddress }} -->
          <div class="list-group mb-5">
            <div class="list-group-item p-3 bg-snow" style="position: relative;">
              <div class="row w-100 no-gutters">
                <div class="col-6 col-md">
                  <h6 class="text-charcoal mb-0 w-100">Order Number</h6>
                  <a :href="'#/orderDetails/'+order.id" class="text-pebble mb-0 w-100 mb-2 mb-md-0">{{ order.id }}</a>
                </div>
                <div class="col-6 col-md">
                  <h6 class="text-charcoal mb-0 w-100">Date</h6>
                  <p class="text-pebble mb-0 w-100 mb-2 mb-md-0">{{ dateFormat(order.createdAt) }}</p>  
                </div>
                <div class="col-6 col-md"> 
                  <h6 class="text-charcoal mb-0 w-100">Total</h6>
                  <p class="text-pebble mb-0 w-100 mb-2 mb-md-0">${{ order.total }}</p> 
                </div>
                <div class="col-6 col-md"> 
                  <h6 class="text-charcoal mb-0 w-100">Shipped To</h6>
                  <p class="text-pebble mb-0 w-100 mb-2 mb-md-0" :title="order.user ? order.user.userAddress.address+', '+order.user.userAddress.country+', '+order.user.userAddress.state+', '+order.user.userAddress.city+', '+order.user.userAddress.zip : ''">{{ order.firstName + ' ' + order.lastName }}</p> 
                </div>
                <div class="col-12 col-md-3">
                  <a :href="'#/orderDetails/'+order.id" class="btn btn-primary w-100">View Order</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          you haven't placed an order
        </div>
      </div>
    </div>
    <!-- <div v-else> -->
      <div class="container-fluid" v-else>
        <div class="container">
        <h2 class="text-charcoal hidden-sm-down">Your Orders</h2>
        <h5 class="text-charcoal hidden-md-up">Your Orders</h5>
          <div class="row">
            <div>
              <div class="card mb-4">
                <div class="card-body">
                  <h3 class="h6">
                    {{ status }}
                  </h3>
                    {{ message }} 
                    <a href="#/auth" class="btn btn-primary">
                      Login
                    </a>
                    <!-- to view your order details or order -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<style scoped>
</style>

<script setup>
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
import modal from '@/components/modal.vue';
import navbar from '@/components/navbar.vue';
import topbar from '@/components/topbar.vue';

import axios from 'axios';
let userId = localStorage.id ? localStorage.id : '';
let message = ref('');
let status = ref('');

let orderDate = ref('');
let orderId = ref('');
let totalAmount = ref(''); 
let username = ref(''); 
let userAddress = ref(''); 
let myorders = ref([]);

// http://localhost:3001/api/orderDetails/orderDetails/27
onMounted(async () => {
  await axios
  // .get(`http://localhost:3001/api/orderDetails/orderDetailsList/${sessionStorage.id}`)
  .get(`http://localhost:3001/api/orders/ordersList/${localStorage.id}`)
  .then(response => {
    console.log('myorders', response.data.data);
    message.value = response.data.message;
    status.value = response.data.status;
    myorders.value = response.data.data;
  });
})

let dateFormat = (datetime) => {
  // var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // return orderDate.value = date.toJSON().slice(0,10).replace(/-/g,'/');
  let date = new Date(datetime);
  // let dateString = `${date.getFullYear}/${date.getMonth() + 1}/${date.getDate}`
  // console.log(date.getMonth().toString())
  // console.log(date.toLocaleString("en-US", { month: 'short' }))
  // console.log(`${date.toLocaleString("en-US", { month: 'short' })} ${date.getDate()}th, ${date.getFullYear()}`)

  // return date
  return `${date.toLocaleString("en-US", { month: 'short' })} ${date.getDate()}th, ${date.getFullYear()}`;
}
// console.log($('#filter').attr());
$( document ).ready(function() {
  // console.log( "ready!" );
  $('#filter').change(function() {
    // console.log($(this).val());
    // console.log($(this).val() != '');
    if ($(this).val() != '') {
      axios
      // .get(`http://localhost:3001/api/orderDetails/orderDetailsList/${sessionStorage.id}`)
      .get(`http://localhost:3001/api/orders/ordersListByMonth/${localStorage.id}/${$(this).val()}`)
      .then(response => {
        // console.log('myorders', response.data.data);
        message.value = response.data.message;
        status.value = response.data.status;
        myorders.value = response.data.data;
      });
    } else {
      // myorders.value;
      // console.log(myorders.value);
      axios
      // .get(`http://localhost:3001/api/orderDetails/orderDetailsList/${sessionStorage.id}`)
      .get(`http://localhost:3001/api/orders/ordersList/${localStorage.id}`)
      .then(response => {
        // console.log('myorders', response.data.data);
        message.value = response.data.message;
        status.value = response.data.status;
        myorders.value = response.data.data;
      });
    }
  });
});
</script>
