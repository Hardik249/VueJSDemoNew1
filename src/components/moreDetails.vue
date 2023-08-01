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
            <button @click="add_item(product)" class="cart-btn" v-if="stockmsg == ''">Add to cart</button>
            <span v-else>{{stockmsg}}</span>
          </div>
        </div>
      </main>
    </div>
    <h2 class="text-center">Customer Reviews</h2>
    <div v-for="(review, index) in productReviews" :key="index" class="verified_customer_section">
      <div class="image_review">
          <div class="customer_image">
            <!-- {{ 'public/files/'+review.image ? 'public/files/'+review.image : 'https://cdn.shopify.com/s/files/1/0664/2191/5900/t/8/assets/screenshot-20221121-alle-191353-1669054447602.png?v=1669054450' }} -->
            <img :src="getImageSource(review.image)" alt="customer image">
          </div>
          <div class="customer_name_review_status">
            <div class="customer_name">{{ review.user ? review.user.name : '' }}</div>
            <div class="customer_review"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <div class="customer_status">
              <div class="customer_bage">
                <img src="https://cdn.shopify.com/s/files/1/0566/8241/4246/t/11/assets/icon-verified-1662629893290.png?v=1662629894" alt="">
              </div>
              <div class="customer_status_content">
                Verified Customer
              </div>
            </div>
          </div>
      </div>
      <div class="customer_comment">
        {{ review.review }}
      </div>
    </div>
    <!-- {{ limit >= 5 && limit <= total }} -->
    <div v-if="limit >= 5 && limit <= total" style="margin-top: 1%;margin-left: 45%;">
      <button id="moreReviews" @click="moreReviews" class="btn btn-primary">More Reviews</button>
    </div>
    <div class="reviewContainerForm" v-if="isValid">
      <form id="feedback" action="">
        <div class="pinfo">Write your feedback.</div>
        <div class="form-group">
          <div class="col-md-6 inputGroupContainer">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
              <textarea class="form-control" id="review" rows="3"></textarea>
            </div>
            <div>
              <span class="error" id="reviewError"></span>
            </div>
            <button type="button" id="reviewSubmit" class="btn btn-primary" style="margin-top: 2%;">Submit</button>
          </div>
        </div>
      </form>
    </div>
    <!-- https://www.w3schools.com/w3images/bandmember.jpg -->
    <!-- Chris Fox. -->
    <!-- CEO at Mighty Schools. -->
    <!-- John Doe saved us from a web disaster. -->
    <!-- https://www.w3schools.com/howto/img_avatar2.png -->
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
import { useRoute } from "vue-router";
import { useCart } from '@/store/cart.store.js'
import { check_plural } from '@/services/utils/utils.js'

const count_likes = ref(0)
const total = ref(0);
const limit = ref(6);
const words_favorite = ref('Favorite')
const product = ref({})
const store_cart = useCart()
let bannerImage = ref();
let activeClass = ref();
const productImages = ref([])
const reviews = ref([]);
const productReviews = ref(reviews);
let stockmsg = ref("");

let isValid = localStorage.jwtToken != undefined ? true : false;
console.log(isValid);

let productId = useRoute() ? useRoute().params.id : '';
console.log('obj', useRoute().params.id);

// 1690889715422--test.png

let getImageSource = (imagePath) => {
  // console.log('i', new XMLHttpRequest('public/files/' + imagePath));
  var http = new XMLHttpRequest()
  http.open('HEAD', 'public/files/' + imagePath, false)
  http.send()
  if (http.status === 200) {
    console.log('This file exist!');
    return 'public/files/' + imagePath;
  } else {
    console.log('This file does not exist!');
    return 'https://cdn.shopify.com/s/files/1/0664/2191/5900/t/8/assets/screenshot-20221121-alle-191353-1669054447602.png?v=1669054450';
  }
}

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
  .get(`http://localhost:3001/api/products/product/${productId}`)
  .then(response => {
    // console.log('djp', response.data.images);
    // products.value = response.data.products
    // initial_products.value = products.value
    product.value = response.data.data;
    stockmsg.value = response.data.data.stock < 2 ? 'Out of stock' : '';
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
  await axios
  .get(`http://localhost:3001/api/reviews/reviewsList/${productId}`)
  .then(response => {
    console.log('response1', response.data);
    console.log('total', response.data.total);
    console.log('limit', response.data.limit);
    reviews.value = response.data.data != undefined ? response.data.data : '';
    total.value = response.data.total;
    limit.value = response.data.limit;
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

let moreReviews = async () => {
  console.log(reviews.value);
  // alert('msg');
  let page = 1;
  // if (limit.value < total.value) return;
  limit.value == total.value ? limit.value = 5 : limit.value = limit.value + 5;
  limit.value == total.value ? '' : page = page + 1;
  console.log(page);
  console.log('total', total.value);
  console.log('limit', limit.value);
  await axios
  .get(`http://localhost:3001/api/reviews/reviewsList/${productId}?page=${page}`)
  .then(response => {
    console.log('response', response.data.data);
    console.log('b', productReviews.value);
    // reviews.value = response.data.data != undefined ? response.data.data : '';
    // productReviews.value.push(response.data.data);
    response.data.data.forEach(function(key, value) {
      reviews.value.push(key);
    });
    console.log('a', productReviews.value);
    console.log('total', response.data.total);
    total.value = response.data.total;
    // limit.value = response.data.limit;
  });
  console.log(reviews.value);
}
$(document).ready(function() {
// feedback
  console.log('u', useRoute());
  // const route = useRoute();
  // const id = useRoute.params.id;
  $('#reviewSubmit').click(async function() {
    let review = $('#review').val();
    console.log(review);
    let urlFormData = new URLSearchParams();
    urlFormData.append('review', review);

    console.log(urlFormData);
    await axios.post(
    `http://localhost:3001/api/reviews/addreview/${productId}`,
    urlFormData,
    {
      headers: {
        Authorization: `${localStorage.jwtToken}`,
      },
    })
    .then(response => {
      console.log('response2', response.data);
      if (response.data.status == 'reviews Validation Fail') {
        let reviewError = response.data.message ? response.data.message : '';
        $('#reviewError').append(reviewError);
      }
      // axios
      // .get(`http://localhost:3001/api/reviews/reviewsList/${productId}?page=2`)
      // .then(response => {
      //   console.log('response3', response.data);
      //   productReviews.value = response.data.data != undefined ? response.data.data : '';
      // });
    });
  })
  // $('#moreReviews').click(async function() {
  //   console.log(this);
  // })
  // const logout = async () => {}

  $('.color-choose input').on('click', function() {
      var headphonesColor = $(this).attr('data-image');

      $('.active').removeClass('active');
      $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
      $(this).addClass('active');
  });

});

console.log('p', productReviews);

</script>


<style scoped>


.verified_customer_section{
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 10px;
  border: 1px solid #746dff;
  background-color: #746dff1a;
  padding: 5px;
  max-width: 540px;
  min-height: 180px;
  margin: auto;
  margin-top: 1%;
}

.image_review{
  padding-top: 10px;
  padding-left: 5px;
}

.image_review i{
  font-size: 16px;
  color: gold;
  margin-left: 0;
  margin-right: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
}


.customer_image{
  max-width: 80px;
  max-width: 80px;
}

.customer_image img{
  height: 100%;
  width: 100%;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}


.customer_name{
  font-family: Poppins;
  font-weight: 700;
  font-size: 16px;
  margin-top: 0;
  text-align: left;
  color: #2e2a39;
  margin-bottom: 0;
}


.customer_bage{
  float: left;
  padding-right: 5px;
}

.customer_status .customer_bage img{
    width: 12px;
    height: 15px;
}


.customer_status_content{
  padding-left: 5px;
  margin-bottom: 0;
  font-family: Poppins;
  font-weight: 400;
  font-size: 13px;
  margin-top: 2px;
  color: rgb(91, 191, 138);
}

.customer_comment{
  padding-left: 5px;
  padding-top: 10px;
  margin-bottom: 0;
  font-size: 15px;
  color: #2e2a39;
  margin-top: 3px;
  font-family: Poppins;
  font-weight: 300;
  padding-right: 5px;
  text-align: left;
  font-style: italic;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.main {
  z-index: 0;
  margin-top: 140px;
  display: grid;
}


.error {
  color: red;
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

 /* Style the reviewContainer with a rounded border, grey background and some padding and margin */
.reviewContainer {
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;
  margin: 16px 0;
  width: 65%;
  margin-left: 10%;
}

/* Clear floats after reviewContainers */
.reviewContainer::after {
  content: "";
  clear: both;
  display: table;
}

/* Float images inside the reviewContainer to the left. Add a right margin, and style the image as a circle */
.reviewContainer img {
  float: left;
  margin-right: 20px;
  border-radius: 50%;
}

/* Increase the font-size of a span element */
.reviewContainer span {
  font-size: 20px;
  margin-right: 15px;
}

/* Add media queries for responsiveness. This will center both the text and the image inside the reviewContainer */
@media (max-width: 500px) {
  .reviewContainer {
    text-align: center;
  }

  .reviewContainer img {
    margin: auto;
    float: none;
    display: block;
  }
}

#feedback {
  max-width: 65%;
  width: 65%;
  margin: 10px 10%;
  padding: 20px;
  border: solid 1px #f1f1f1;
  background: #fbfbfb;
  box-shadow: #e6e6e6 0 0 4px ;
  border-radius: 0.25rem;
}

@media (max-width: 720px) {
  #feedback{
    max-width: 90%;
  }
}

@media (max-width: 500px) {
  #feedback{
    padding: 10px;
  }
}

#fh2{
 padding: 2px 15px;
 color: #ff4d4d;
 text-align: center;
}

@media (max-width: 400px) {
  #fh2{
    font-size: 20px;
  }
}


#fh6 {
 padding: 2px 15px;
 color: #4d0er;
 text-align: center;
 font-weight: normal;
}

@media (max-width: 400px) {
  #fh6{
    font-size: 12px;
  }
}

.pinfo {
 margin: 8px auto;
 font-weight: bold;
 line-height: 1.5;
 color: #0d0d0d;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: bold;
  color: #6C6262;
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #696060;
  background-color: #fff;
  border-color: #5cb3fd;
  outline: none;
}

.form-control::-webkit-input-placeholder {
  color: #F34949;
  opacity: 1;
}

.form-control::-moz-placeholder {
  color: brown;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: blue;
  opacity: 1;
}

.form-control::placeholder {
  color: white;
  opacity: 1;
}

.form-control:disabled, .form-control[readonly] {
  background-color: red;
  opacity: 1;
}

.form-control:disabled {
  cursor: not-allowed;
}

select.form-control:not([size]):not([multiple]) {
  height: calc(2.25rem + 2px);
}

select.form-control:focus::-ms-value {
  color: green;
  background-color: #fff;
}

.form-control-file,
.form-control-range {
  display: block;
}

.input-group {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}

.input-group .form-control {
  position: relative;
  z-index: 2;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
          flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {
  z-index: 3;
}

.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.input-group-addon,
.input-group-btn {
  white-space: nowrap;
  vertical-align: middle;
}

.input-group-addon {
  width: 45px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.25;
  color: #2e2e2e;
  text-align: center;
  background-color: #eceeef;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.input-group-addon.form-control-sm,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .input-group-addon.btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.input-group-addon.form-control-lg,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .input-group-addon.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}

.input-group .form-control:not(:last-child),
.input-group-addon:not(:last-child),
.input-group-btn:not(:last-child) > .btn,
.input-group-btn:not(:last-child) > .btn-group > .btn,
.input-group-btn:not(:last-child) > .dropdown-toggle,
.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.input-group-addon:not(:last-child) {
  border-right: 0;
}

.input-group .form-control:not(:first-child),
.input-group-addon:not(:first-child),
.input-group-btn:not(:first-child) > .btn,
.input-group-btn:not(:first-child) > .btn-group > .btn,
.input-group-btn:not(:first-child) > .dropdown-toggle,
.input-group-btn:not(:last-child) > .btn:not(:first-child),
.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.form-control + .input-group-addon:not(:first-child) {
  border-left: 0;
}

.btn {
  display: inline-block;
  font-weight: normal;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.btn:focus, .btn:hover {
  text-decoration: none;
}

.btn:focus, .btn.focus {
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
}

.btn.disabled, .btn:disabled {
  cursor: not-allowed;
  opacity: .65;
}

.btn:active, .btn.active {
  background-image: none;
}

a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}

.btn-primary {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-primary:hover {
  color: #fff;
  background-color: #025aa5;
  border-color: #01549b;
}

.btn-primary:focus, .btn-primary.focus {
  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
  background-color: #0275d8;
  border-color: #0275d8;
}

.btn-primary:active, .btn-primary.active,
.show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #025aa5;
  background-image: none;
  border-color: #01549b;
}

</style>
