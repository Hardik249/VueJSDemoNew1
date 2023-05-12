<template>
    <div class="main">
        <div class="filter">
            <range :max="max_price"></range>
            <titleFilter> CATEGORIES </titleFilter>
            <div class="categories">
                <!-- <categoriesList v-for="category in categories" :key="category" @click="sort_by_category(category)" :id="category" :name="category" :value="category" :for="category">
                {{ category }} </categoriesList> -->

                <button class="btn" id="clearAll" @click="clearAll" style="float: inline-end;">Clear All</button><br>
                <span id="selectedCategory" style="margin-left: 0;">{{ selected_category }}</span><br>
                <input type="checkbox" class="isActive" id="phone" name="phone" value="phone" @click="fetchData('phone')"> <label for="phone">Smartphones</label><br>
                <input type="checkbox" class="isActive" id="Laptop" name="Laptop" value="Laptop" @click="fetchData('Laptop')"> <label for="Laptop">Laptops</label><br>
                <input type="checkbox" class="isActive" id="sunglasses" name="sunglasses" value="sunglasses" @click="fetchData('sunglasses')"> <label for="sunglasses">Sunglasses</label><br>
                <input type="checkbox" class="isActive" id="furniture" name="furniture" value="furniture" @click="fetchData('furniture')"> <label for="furniture">Furniture</label><br>
                <input type="checkbox" class="isActive" id="home" name="home" value="home" @click="fetchData('home')"> <label for="home">home-decoration</label><br>
                <input type="checkbox" class="isActive" id="motorcycle" name="motorcycle" value="motorcycle" @click="fetchData('motorcycle')"> <label for="motorcycle">Motorcycle</label><br>
                <input type="checkbox" class="isActive" id="lighting" name="lighting" value="lighting" @click="fetchData('lighting')"> <label for="lighting">Lighting</label><br>
                <input type="checkbox" class="isActive" id="watch" name="watch" value="watch" @click="fetchData('watch')"> <label for="watch">Watch</label><br>
                <input type="checkbox" class="isActive" id="bags" name="bags" value="bags" @click="fetchData('bags')"> <label for="bags">Bags</label><br>
                <input type="checkbox" class="isActive" id="handbags" name="handbags" value="handbags" @click="fetchData('handbags')"> <label for="handbags">Hand Bags</label><br>
                <input type="checkbox" class="isActive" id="ring" name="ring" value="ring" @click="fetchData('ring')"> <label for="ring">Rings</label><br>
            </div>
        </div>
        <main>
            <h1> CATALOG </h1>
            <div class="searcharea">
                <search @searched_word="handle_search"></search>
            </div>
            <div class="products">
                <card v-for="product in filtered_products" :key="product.id" :url="product.thumbnail" :alt="product.title"
                    :title="product.title" :price="product.price" :category="product.category"
                    @handle_like="handle_like" @dis_like="remove_like" @item_clicked="add_item(product)" @click="moreDetails(product)">
                </card>
            </div>
            <div v-if="limit >= 6 && limit <= total" style="margin-bottom: 10%;margin-left: 50%;">
                <button class="btn btn-primary" href="" @click="loadMoreData">Load More</button>
            </div>
        </main>
    </div>
</template>

<script setup>

import { onMounted, ref, provide } from 'vue';
import search from './search.vue';
import axios from "axios";
import card from './card.vue';
import range from './Filter/range.vue';
import { check_max_price, hide_long_text } from '../services/utils/utils';
import { useCart } from '@/store/cart.store.js'
import { useSort } from '@/store/sort.store.js'
import categoriesList from './Filter/categories.vue'
import titleFilter from './Filter/titleFilter.vue';

const selected_category = ref('')
const products = ref([])
const selected_categories = ref([])
const initial_products = ref([])
const filtered_products = ref(products)
const nbr_favorites = ref(0)
const max_price = ref(0)
const store_cart = useCart()
const store_categories = useSort()
const categories = ref([])
let limit = ref(0);
let total = ref(0);
let totalProducts = ref(0);
let length = ref(0);
let items = ref([]);
let columns = ref([]);
let totalProductsLimit = ref(0);
let isActive = false;
let queries = ref(['products', 'phone', 'Laptop', 'sunglasses', 'furniture', 'home', 'motorcycle', 'lighting', 'watch', 'bags', 'handbags', 'ring']);


const sort_by_category = (e) => {
    store_categories.add_or_remove_selected(e)
    if (JSON.parse(JSON.stringify(store_categories.selected_categories)).length !== 0) {
        filtered_products.value = JSON.parse(JSON.stringify(products.value)).filter(el => {
            const val = e.toLowerCase();
            const title = el.category && el.category.toLowerCase();
            if (val && title.indexOf(val) !== -1) {
                return true
            }
            return false
        })

        // let url;
        // url = `https://dummyjson.com/products/category/${e}`;
        // axios.get(url, {
        //     method: 'GET',
        //     // method: 'POST',
        //     mode: 'no-cors',
        //     })
        // .then(resp => {
        //     // $('.container').html('')
        //     // limit.value = resp.data.limit;
        //     // alert(limit.value)
        //     // limit.value = limit.value + 6;
        //     total.value = resp.data.total;
        //     // limit.value > total.value ? limit.value = 6 : limit.value + 6;
        //     items.value = resp;
        //     products.value = resp.data.products
        //     // selected_products.value = products.value
        //     filtered_products.value = products.value
        //     columns.value = Object.keys(resp.data.products[0]);
        //     length.value = products.length;
        // })
        // .catch(error => {
        //     if (error.response != undefined) {
        //       if (error.response.status == 422) {
        //         // let messages = JSON.parse(error.response.data)
        //         // errors = JSON.parse(error.response.data)
        //         $('.error').html('')
        //         // this.nameError.append(error.response.data.name)
        //       } else if (error.response.status == 401) {
        //         // :class="{ 'active' : fetchData }"
        //         // document.getElementByClassName('error').remove()
        //         // document.getElementsByClassName('error').html('')
        //         $('.error').html('')
        //       }
        //     }
        // });
    }
    else {
        filtered_products.value = initial_products.value
    }
}

const handle_like = () => {
    nbr_favorites.value++
    send_to_home('send_like', nbr_favorites.value)
}

const remove_like = () => {
    nbr_favorites.value--
    send_to_home('send_like', nbr_favorites.value)
}

const handle_search = (e) => {
    /* console.log(e) */
    if (e.value !== '') {
        filtered_products.value = JSON.parse(JSON.stringify(initial_products.value)).filter(el => {
            const val = e.value.toLowerCase();
            const title = el.title && el.title.toLowerCase();
            if (val && title.indexOf(val) !== -1) {
                limit.value = 0
                return true
            }
            return false
        })
        /* console.log(JSON.parse(JSON.stringify(filtered_products.value))) */
    }
    else {
        filtered_products.value = initial_products.value
    }
}

const add_item = (e) => {
    console.log('e', e.id);
    console.log('if', sessionStorage.jwtToken != undefined)
    console.log('if0', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')

    const element = JSON.parse(JSON.stringify(e))
    /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    send_to_home('send_item', element)
    store_cart.add_item({ 'item': element, 'number': 1 })
    console.log(store_cart.getItems)

    // if (!sessionStorage.jwtToken) {
    //     const element = JSON.parse(JSON.stringify(e))
    //     /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    //     send_to_home('send_item', element)
    //     store_cart.add_item({ 'item': element, 'number': 1 })
    //     console.log(store_cart.getItems)
    // } else {
    //     console.log('else')
    //     send_to_home('send_item', e)
    //     let formData = new FormData();
    //     let product_id = e.id ? e.id : '';
    //     let user_id = sessionStorage.id ? sessionStorage.id : '';
    //     formData.append('product_id', product_id)
    //     formData.append('user_id', user_id)
    //     axios
    //     .post(`http://localhost:3001/api/carts/addtocart`, {
    //         'product_id': product_id,
    //         'user_id': user_id
    //     })
    //     .then(response => {
    //         console.log('response', response);
    //         // store_categories.add_all_categories(JSON.parse(JSON.stringify(response.data)))
    //         // categories.value = store_categories.getAllCategories
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
}

// const add_item = (e) => {
//     const element = JSON.parse(JSON.stringify(e))
//     /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
//     send_to_home('send_item', element)
//     store_cart.add_item({ 'item': element, 'number': 1 })
//     console.log(store_cart.getItems)
// }

const moreDetails = (e) => {
    const currentProduct = JSON.parse(JSON.stringify(e))
    console.log(currentProduct)
    
    provide('seeDetails', {product : currentProduct, openModal: true, nameComponent: ''})
}

const send_to_home = defineEmits('send_like', 'send_item')

onMounted(async () => {
    await axios
    .get('https://dummyjson.com/products?limit=6')
    .then(response => {
        console.log('djp', response.data.limit)
        products.value = response.data.products
        initial_products.value = products.value
        console.log(products)
        limit.value = 6;
        items.value = response;
        columns.value = Object.keys(response.data.products[0]);
        totalProducts.value = response.data;
        totalProductsLimit.value = response.data.limit
        total.value = response.data.total;
        console.log('total', total)
        length = products.value.length;
        max_price.value = check_max_price(products._rawValue)
        // max_price.value = check_max_price(products)
    });
    await axios
    .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
    .then(response => {
    console.log('gsvcp', response.data.data)
    // console.log('st', store_cart.total_amount())
    // store_cart.state.length = response.data.data.length;
    store_cart.length = response.data.data.length;
    store_cart.total_amount();
    })
    if (store_categories.getAllCategories.length === 0) {
        await axios
            .get('https://dummyjson.com/products/categories')
            .then(response => {
                store_categories.add_all_categories(JSON.parse(JSON.stringify(response.data)))
                categories.value = store_categories.getAllCategories
            })
    }
    else {
        categories.value = store_categories.getAllCategories
    }

})

const loadMoreData = () => {
    // alert(limit.value)
    // alert(totalProductsLimit.value)
    // alert(limit.value < totalProductsLimit.value)
    // alert(limit.value <= 30)
    // console.log(`limit ${limit.value} totalProductsLimit ${totalProductsLimit.value}`, limit.value > totalProductsLimit.value)
    // console.log('products.value[0].category', products.value[0].category)
    let query = products.value[0].category == 'mens-watches' ? 'watch' : 'ring';
    // alert(query)
    if (limit.value < totalProductsLimit.value) return;
    // limit = limit + 6;
    // limit = 6;
    limit.value == total.value ? limit.value = 6 : limit.value = limit.value + 6;
    let url;
    // products.value[0].category == 'smartphones' ? url = `https://dummyjson.com/products?limit=${limit.value}` : url = `https://dummyjson.com/products/search?limit=${limit.value}&q=watch&skip=${limit.value-6}`;
    products.value[0].category == 'smartphones' ? url = `https://dummyjson.com/products?limit=${limit.value}` : url = `https://dummyjson.com/products/search?limit=${limit.value}&q=${query}`;
    axios
      .get(url, {
      // .get(`https://dummyjson.com/products/search?limit=${this.limit}&skip=${this.limit}`, {
      // .get(`https://dummyjson.com/products/search?limit=${this.limit}&q=${query}`, {
      // .get(`https://dummyjson.com/products/search?limit=${this.limit}&q=${query}&skip=${this.limit}`, {
        mode: 'no-cors',
        headers: {
          // Authorization : `Bearer ${sessionStorage.jwtToken}` 
        }
      })
      .then(response => {
        // length = 6;
        // limit = response.data.isActivelimit;
        // limit = 6;
        // products = response.data.products.slice(0, this.limit);
        // columns;
        items.value = response;
        totalProducts.value = response.data;
        products.value = response.data.products;
        // columns = response.data.products ? Object.keys(response.data.products[0]) : '';
        // return products.slice(0, length);
        // products = totalProducts.slice(0, length);
      });
        // limit = limit + 6;
}

const fetchData = (query) => {
      // console.log('selectedCategory', selected_categories.value)
    store_categories.add_or_remove_selected(query)
    console.log(JSON.parse(JSON.stringify(store_categories.selected_categories)).length !== 0)
    if (JSON.parse(JSON.stringify(store_categories.selected_categories)).length !== 0) {
      isActive = true;
      $('.isActive').removeClass('active');
      console.log('', store_categories.selected_categories)
        // $('.isActive').prop('checked', false); // Unchecks it

        $('.isActive').prop('checked', false); // Unchecks it
      queries.value.forEach(function(key, value) {
        if (key == query) {
          $("#"+key).addClass('active');
        $("#"+key).prop('checked', true); // Checks it
        selected_category.value = key;
          // isActive.value = false;
        }
        // $('.isActive').prop('checked', false); // Unchecks it
        // $("#"+key).prop('checked', false); // Unchecks it
        // $("#"+key).prop('checked', true); // Checks it
        // $("#"+key).removeClass('active');
      })
      $('#selectedCategory').append(store_categories.value)
      // console.log('selectedCategory1', selected_categories.value)
      
      // $('.isActive').addClass('active');
      // if (isActive.value == true) {}
      limit.value = 6;
      let url;
      limit.value == total.value ? url = `https://dummyjson.com/products/search?limit=${limit.value}&q=${query}&skip=${limit.value}` : url = `https://dummyjson.com/products/search?limit=${limit.value}&q=${query}`;
      // axios.get('http://127.0.0.1:8000/api/auth/user-profile', {
      // axios.get(`https://dummyjson.com/products/search?q=${query}`, {
      // axios.get(`https://dummyjson.com/products/search?limit=${limit.value}&q=${query}`, {
      axios.get(url, {
        method: 'GET',
        // method: 'POST',
        mode: 'no-cors',
      })
      .then(resp => {
        // $('.container').html('')
        // limit.value = resp.data.limit;
        // alert(limit.value)
        // limit.value = limit.value + 6;
        total.value = resp.data.total;
        // limit.value > total.value ? limit.value = 6 : limit.value + 6;
        items.value = resp;
        products.value = resp.data.products
        filtered_products.value = products.value
        columns.value = Object.keys(resp.data.products[0]);
        length.value = products.length;
      })
      .catch(error => {
        if (error.response != undefined) {
          if (error.response.status == 422) {
            // let messages = JSON.parse(error.response.data)
            // errors = JSON.parse(error.response.data)
            $('.error').html('')
            // this.nameError.append(error.response.data.name)
          } else if (error.response.status == 401) {
            // :class="{ 'active' : fetchData }"
            // document.getElementByClassName('error').remove()
            // document.getElementsByClassName('error').html('')
            $('.error').html('')
          }
        }
      });
    }
    else {
        filtered_products.value = initial_products.value
        total.value = 100;
    }
}

const clearAll = () => {
    $('.isActive').prop('checked', false); // Unchecks it
    filtered_products.value = initial_products.value
    total.value = 100;
    selected_category.value = '';
}

</script>
    
<style scoped>
.main {
    z-index: 0;
    margin-top: 140px;
    display: grid;
}

.filter {
    position: fixed;
    width: 20%;
    border-right: 1px solid #ccc;
    height: calc(100vh - 140px);
    overflow-x: hidden;
}

main {
    position: absolute;
    margin-left: 20%;
    width: 80%;
}

main h1 {
    font-weight: bolder;
    margin: 30px 0px;
    margin-left: 50px;
}

.searcharea {
    display: grid;
    grid-template-columns: 2fr 1fr;
}

.products {
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 1500px) {
    .products {
        padding: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media screen and (max-width: 1200px) {
    .products {
        padding: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}


.categories {
    padding: 0px 20px;
}

.categories h4 {
    margin: 10px 0px;
    font-weight: bold;
}

.categories span {
    margin: 0px 15px;
}

input[type='checkbox'] {
    accent-color: var(--secondary);
}

</style>