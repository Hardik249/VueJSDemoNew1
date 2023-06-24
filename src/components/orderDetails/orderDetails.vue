<template>
  <navbar></navbar>
  <topbar></topbar>
  <modal></modal>
  <div style="margin-top: 10%;">
    <div class="container-fluid" v-if="userId">
      <div class="container">
        <!-- Title -->
        <!-- {{ myorder }} -->
        <div class="d-flex justify-content-between align-items-center py-3">
          <h2 class="h5 mb-0"><a href="#" class="text-muted"></a> Order {{ orderId }}</h2>
        </div>

        <!-- Main content -->
        <div class="row">
          <div class="col-lg-8">
            <!-- Details -->
            <div class="card mb-4">
              <div class="card-body">
                <div class="mb-3 d-flex justify-content-between">
                  <div>
                    <span class="me-3">{{ dateFormat(orderTime) }}</span>
                    <span class="me-3">{{ orderId }}</span>
                    <span class="me-3">Visa -1234</span>
                    <span class="badge rounded-pill bg-info">SHIPPING</span>
                  </div>
                  <div class="d-flex">
                    <button class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"><i class="bi bi-download"></i> <span class="text">Invoice</span></button>
                    <div class="dropdown">
                      <button class="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Edit</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i> Print</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <table class="table table-borderless">
                  <!-- {{orderedProducts}} -->
                  <tbody v-for="myorder in myorder">
                    <tr>
                      <!-- {{quantities}} -->
                      <td>
                        <div class="d-flex mb-2">
                          <div class="flex-shrink-0">
                            <img :src="myorder.product ? myorder.product.thumbnail : ''" alt="https://www.bootdey.com/image/280x280/87CEFA/000000" width="35" class="img-fluid">
                          </div>
                          <div class="flex-lg-grow-1 ms-3">
                            <h6 class="small mb-0"><a :href="myorder.product ? '#/product/'+ myorder.product.id : ''" class="text-reset">{{ myorder.product ? myorder.product.title : '' }}</a></h6>
                            <!-- <span class="small">Color: Black</span> -->
                          </div>
                        </div>
                      </td>
                      <td>{{ myorder.quantity ? myorder.quantity : '' }}</td>
                      <td class="text-end">${{ myorder.product ? myorder.totalPrice : '' }}</td>
                    </tr>
                    <!-- <tr>
                      <td>
                        <div class="d-flex mb-2">
                          <div class="flex-shrink-0">
                            <img src="https://www.bootdey.com/image/280x280/FF69B4/000000" alt="" width="35" class="img-fluid">
                          </div>
                          <div class="flex-lg-grow-1 ms-3">
                            <h6 class="small mb-0"><a href="#" class="text-reset">Smartwatch IP68 Waterproof GPS and Bluetooth Support</a></h6>
                            <span class="small">Color: White</span>
                          </div>
                        </div>
                      </td>
                      <td>1</td>
                      <td class="text-end">$79.99</td>
                    </tr> -->
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2">Subtotal</td>
                      <td class="text-end">${{ myorder.product ? myorder.totalAmount : totalAmount }}</td>
                    </tr>
                    <!-- <tr>
                      <td colspan="2">Shipping</td>
                      <td class="text-end">$20.00</td>
                    </tr>
                    <tr>
                      <td colspan="2">Discount (Code: NEWYEAR)</td>
                      <td class="text-danger text-end">-$10.00</td>
                    </tr> -->
                    <tr class="fw-bold">
                      <td colspan="2">TOTAL</td>
                      <td class="text-end">${{ myorder.totalAmount ? myorder.totalAmount : totalAmount }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <!-- Payment -->
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <h3 class="h6">Payment Method</h3>
                    <p>{{ paymentMethod ? paymentMethod : 'Visa -1234' }} <br>
                    Total: ${{ myorder.totalAmount }} <span class="badge bg-success rounded-pill">PAID</span></p>
                  </div>
                  <div class="col-lg-6">
                    <h3 class="h6">Billing address</h3>
                    <address>
                      <strong>{{ username ? username : '' }}</strong><br>
                      {{  addressLine1 }}<br>
                      {{  addressLine2 }}<br>
                      <abbr title="Phone">P:</abbr> {{  contact ? contact : '' }} 
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <!-- Customer Notes -->
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h6">Customer Notes</h3>
                <p>
                	{{ username ? username : '' }}
                	<!-- Sed enim, faucibus litora velit vestibulum habitasse. Cras lobortis cum sem aliquet mauris rutrum. Sollicitudin. Morbi, sem tellus vestibulum porttitor. -->
                </p>
              </div>
            </div>
            <div class="card mb-4">
              <!-- Shipping information -->
              <div class="card-body">
                <h3 class="h6">Shipping Information</h3>
                <strong>FedEx</strong>
                <span><a href="#" class="text-decoration-underline" target="_blank">FF1234567890</a> <i class="bi bi-box-arrow-up-right"></i> </span>
                <hr>
                <h3 class="h6">Address</h3>
                <address>
                  <strong>{{ username ? username : '' }}</strong><br>
	                {{ addressLine1 }}<br>
	                {{ addressLine2 }}<br>
                  <abbr title="Phone">P:</abbr> {{ contact ? contact : '' }} 
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else> -->
      <div class="container-fluid" v-else>
        <div class="container">
          <div class="row">
            <div>
              <div class="card mb-4">
                <div class="card-body">
                  <h3 class="h6">
                    {{ status }}
                  </h3>
                    {{ message }} or 
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


<script setup>
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
// import modalCard from './modalCard.vue';
import modal from '@/components/modal.vue';
import navbar from '@/components/navbar.vue';
import topbar from '@/components/topbar.vue';
import { useWish } from '@/store/wish.store.js'
import { element_index_in_array } from '@/services/utils/utils';
import axios from 'axios';
import {useRoute} from "vue-router";
let userId = localStorage.id ? localStorage.id : '';
let message = ref('');
let status = ref('');

let orderTime = ref('');
let orderId = ref('');
let productName = ref(''); 
let productPrice = ref('');
let totalPrice = ref(''); 
let totalAmount = ref(''); 
let discount = ref(''); 
let userAddressId = ref(''); 
let orderUserId = ref(''); 
let username = ref(''); 
let address = ref('');
let city = ref('');
let country = ref('');
let state = ref('');
let zip = ref('');
let addressLine1 = ref('');
let addressLine2 = ref('');
let contact = ref('');
let myorder = ref([]);
let orderedProducts = ref([]);
let orderedProductsImgs = ref([]);
let quantities = ref([]);
let paymentMethod = localStorage.paymentMethod;

onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;
  await axios
  .get(`http://localhost:3001/api/orderDetails/orderDetail/${id}`)
  .then(response => {
    console.log('orders', response.data.data);
    message.value = response.data.message;
    status.value = response.data.status;
    myorder.value = response.data.data;
    userAddressId.value = response.data.data[0] ? response.data.data[0].order.addressId : '';
    // orderUserId.value = response.data.data[0].userId;
  	axios
  	.get(`http://localhost:3001/api/userAddress/address/${userAddressId.value}`)
  	.then(response => {
  		// console.log('addressId', response.data.data);
      address.value = response.data.data.address
      city.value = response.data.data.city
      country.value = response.data.data.country
      state.value = response.data.data.state
      zip.value = response.data.data.zip
      addressLine1.value = response.data.data ? address.value+', '+city.value : '';
      addressLine2.value = response.data.data ? country.value+', '+state.value+', '+zip.value : '';
  	})
    response.data.data.forEach(function(key, value) {
      // console.log(key);
      orderedProducts.value.push(key.product);
      orderedProductsImgs.value.push(key.product.thumbnail);
      // orderedProducts.value.push(key.product, key.quantity, key.price, key.totalPrice, key.totalAmount);
      quantities.value.push(key.quantity);
      // orderedProducts.value.push(key.price);
      // orderedProducts.value.push(key.totalPrice);
      // orderedProducts.value.push(key.totalAmount);
      orderTime.value = key.createdAt;
      totalPrice.value = key.totalPrice;
      orderId.value = key.orderId;
      totalAmount.value = key.totalAmount;
      username.value = key.order.firstName +' '+ key.order.lastName;
      contact.value = key.order.contact;
    })
    // console.log(orderedProducts.value.length);
  });
  // console.log('orderId', orderTime.value.split()[0]);
})

let dateFormat = (datetime) => {
  let date = new Date(datetime);
  return `${date.toLocaleString("en-US", { month: 'short' })} ${date.getDate()}th, ${date.getFullYear()}`;
}
</script>
