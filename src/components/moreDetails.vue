<template>
    <navbar></navbar>
    <topbar></topbar>
    <modal></modal>
    <div class="main">
        <main class="container">

          <!-- Left Column / Headphones Image -->
          <div class="left-column">
            <img data-image="black" src="images/black.png" alt="">
            <img data-image="blue" src="images/blue.png" alt="">
            <img data-image="red" class="active" :src="product.thumbnail" :alt="product.title">
            <!-- <img data-image="red" class="active" src="https://designmodo.com/wp-content/uploads/2017/03/screenshot-1920x1010.png" alt=""> -->
          </div>


          <!-- Right Column -->
          <div class="right-column">

            <!-- Product Description -->
            <div class="product-description">
              <span>{{product.category}}</span>
              <h1>{{product.title}}</h1>
              <p>{{product.description}}</p>
            </div>


            <!-- Product Pricing -->
            <div class="product-price">
              <span> {{ product.price }} € </span>
              <button @click="add_item(product)" class="cart-btn">Add to cart</button>
            </div>
          </div>
        </main>
    </div>
    <!-- <div>
        <p>zfrzfez</p>
    </div> -->
</template>


<script setup>
import modal from '@/components/modal.vue';
import navbar from '@/components/navbar.vue';
import topbar from '@/components/topbar.vue';
import { onMounted, ref, provide } from 'vue';
import axios from "axios";
import {useRoute} from "vue-router";
import { useCart } from '@/store/cart.store.js'

const product = ref({})
const store_cart = useCart()

// console.log(this.$route.params)

const add_item = (e) => {
    const element = JSON.parse(JSON.stringify(e))
    /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    // send_to_home('send_item', element)
    store_cart.add_item({ 'item': element, 'number': 1 })
    console.log(store_cart.getItems)
}

onMounted(async () => {
   const route = useRoute();
   const id = route.params.id;
   console.log(useRoute().params.id)
    await axios
    .get(`http://localhost:3001/api/products/product/${id}`)
    .then(response => {
        console.log('djp', response.data);
        // products.value = response.data.products
        // initial_products.value = products.value
        product.value = response.data.data;
        console.log(product.value);
        // let images = product.images
        // console.log(products)
        // limit.value = 6;
        // items.value = response;
        // columns.value = Object.keys(response.data.products[0]);
        // totalProducts.value = response.data;
        // totalProductsLimit.value = response.data.limit
        // total.value = response.data.total;
        // console.log('total', total)
        // length = products.value.length;
        // max_price.value = check_max_price(products._rawValue)
        // max_price.value = check_max_price(products)
    });
})
$(document).ready(function() {

  $('.color-choose input').on('click', function() {
      var headphonesColor = $(this).attr('data-image');

      $('.active').removeClass('active');
      $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
      $(this).addClass('active');
  });

});
</script>


<style scoped>
.main {
    z-index: 0;
    margin-top: 140px;
    display: grid;
}

/* Basic Styling */
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
}


/* Columns */
.left-column {
  width: 65%;
  position: relative;
}

.right-column {
  width: 35%;
  margin-top: 60px;
}


/* Left Column */
.left-column img {
  width: 75%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: all 0.3s ease;
}

.left-column img.active {
  opacity: 1;
}


/* Product Description */
.product-description {
  border-bottom: 1px solid #E1E8EE;
  margin-bottom: 20px;
}
.product-description span {
  font-size: 12px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
}
.product-description h1 {
  font-weight: 300;
  font-size: 52px;
  color: #43484D;
  letter-spacing: -2px;
}
.product-description p {
  font-size: 16px;
  font-weight: 300;
  color: #86939E;
  line-height: 24px;
}


/* Product Color */
.product-color {
  margin-bottom: 30px;
}

.color-choose div {
  display: inline-block;
}

/*.color-choose input[type=&amp;quot;radio&amp;quot;] {
  display: none;
}

.color-choose input[type=&amp;quot;radio&amp;quot;] + label span {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
}

.color-choose input[type=&amp;quot;radio&amp;quot;] + label span {
  border: 2px solid #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.33);
}

.color-choose input[type=&amp;quot;radio&amp;quot;]#red + label span {
  background-color: #C91524;
}
.color-choose input[type=&amp;quot;radio&amp;quot;]#blue + label span {
  background-color: #314780;
}
.color-choose input[type=&amp;quot;radio&amp;quot;]#black + label span {
  background-color: #323232;
}

.color-choose input[type=&amp;quot;radio&amp;quot;]:checked + label span {
  background-image: url(images/check-icn.svg);
  background-repeat: no-repeat;
  background-position: center;
}*/


/* Product Price */
.product-price {
  display: flex;
  align-items: center;
}

.product-price span {
  font-size: 26px;
  font-weight: 300;
  color: #43474D;
  margin-right: 20px;
}

.cart-btn {
  display: inline-block;
  background-color: #7DC855;
  border-radius: 6px;
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
  padding: 12px 30px;
  transition: all .5s;
}
.cart-btn:hover {
  background-color: #64af3d;
}
</style>
