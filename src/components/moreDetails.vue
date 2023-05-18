<template>
    <navbar></navbar>
    <topbar></topbar>
    <modal></modal>
    <div class="main">
        <main class="container">

          <div class="container-space">
              <div class="row">
                  <div class="col-md-6">
                    <img class="img-fluid" :src="bannerImage" alt="" />
                    <div class="product-thumbnails">
                      <!-- {{ productImages.length}}  -->
                      <!-- {{ productImages.length >= 4 }} -->
                      <ul>
                        <li v-for="(image, index) in productImages.slice(0, 4)" :key="index">
                          <!-- {{ image == null }} -->
                          <img :class="[activeClass == index ? 'thumbnail-active': '']" v-if="image != null" @click="currentThumnail(image, index)" :src="image" alt=""  style="margin-right: 10px;"/>
                        </li>
                      </ul>
                    </div>
                    <!-- {{ productImages }} -->
                    <!-- {{ productImages.slice(5, -1)}}  -->
                    <!-- {{ productImages.slice(4, -1)}}  -->
                    <!-- {{ productImages.slice(5, -1)}}  -->
                    <!-- {{ productImages.length >= 4 }} -->
                    <div class="product-thumbnails">
                      <ul>
                        <li v-for="(image, index) in productImages.slice(5, -1)" :class="[activeClass == index ? 'thumbnail-active': '']" :key="index">
                          <img v-if="image != null" @click="currentThumnail(image, index)" :src="image" alt=""  style="margin-right: 10px;"/>
                        </li>
                      </ul>
                    </div>
                  </div>
              </div>
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
import { onMounted, ref, provide, watchEffect } from 'vue';
import axios from "axios";
import {useRoute} from "vue-router";
import { useCart } from '@/store/cart.store.js'
import { check_plural } from '@/services/utils/utils.js'

const count_likes = ref(0)
const words_favorite = ref('Favorite')
const product = ref({})
const store_cart = useCart()
let bannerImage = ref();
let activeClass = ref();
const productImages = ref([])
// const productImages = [
//   {
//     id: 3435,
//     imageUrl: "https://i.imgur.com/Nmuu6Jh.jpg"
//   },
//   {
//     id: 3436,
//     imageUrl: "https://i.imgur.com/VFcTYyU.jpg"
//   }
// ]

// console.log(this.$route.params)

const add_item = (e) => {
    const element = JSON.parse(JSON.stringify(e))
    /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    // send_to_home('send_item', element)
    store_cart.add_item({ 'item': element, 'number': 1 })
 // console.log(store_cart.getItems)
}

onMounted(async () => {
   const route = useRoute();
   const id = route.params.id;
// console.log(useRoute().params.id)
    await axios
    .get(`http://localhost:3001/api/products/product/${id}`)
    .then(response => {
     // console.log('djp', response.data.images);
        // products.value = response.data.products
        // initial_products.value = products.value
        product.value = response.data.data;
     // console.log(product.value);
        bannerImage.value = response.data.data.thumbnail;
        productImages.value = response.data.images;
     // console.log(productImages.value);
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

const currentThumnail = (image, index) => {
  bannerImage.value = image;
  activeClass.value = index;
}


const handle_like = (e) => {
    /* console.log(e) */
    count_likes.value = e
    words_favorite.value = check_plural(e, 'Favorite')
}


/* Watcheffect to do the change just one time ... increase performance */
watchEffect(() => {
    provide('mot', words_favorite)
});

provide('nbr_likes', count_likes)

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


/* imgs */
.container-space {
  margin-top: 2rem;
}
.product-thumbnails {
  display: flex;
  margin-top: 2rem;
}
.product-thumbnails > ul {
  display: flex;
  list-style: none;
  padding-left: 0;
}
.product-thumbnails > li {
  margin-right: 10px;
}
.product-thumbnails > ul > li > img {
  width: 100px;
  cursor: pointer;
  height: 75%;
}
.thumbnail-active {
  border: 2px solid #000;
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
