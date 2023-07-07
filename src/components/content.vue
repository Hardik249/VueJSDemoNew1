<template>
    <div class="main">
        <div class="filter">
            <range :max="max_price"></range>
            <titleFilter> CATEGORIES </titleFilter>
            <div class="categories">
                <!-- <categoriesList v-for="category in categories" :key="category" @click="sort_by_category(category)" :id="category" :name="category" :value="category" :for="category">
                {{ category }} </categoriesList> -->

                <button class="btn" id="clearAll" @click="clearAll" style="float: inline-end;">Clear All</button><br>
                <div style="margin-left: 0px;background-color: lightgray;color: black;width: 61%;" v-if="selected_category ? selected_category : ''">
                    <span id="selectedCategory" @click="clearAll" style="cursor: pointer;">
                        {{ mark }} {{ selected_category }}
                    </span><br>
                </div>

                <!-- <div class="categories" v-for="category in categories" :key="category">
                    <input type="checkbox" class="isActive" :id="category" :name="category" :value="category" @click="productsByCategory(category)"> <label :for="category">{{category}}</label><br>
                </div> -->

                <!-- <div class="categories" v-for="category in categories" :key="category">
                    <input type="checkbox" class="isActive" :id="category" :name="category" :value="category" @click="productsListByCategory(category)"> <label :for="category">{{category}}</label><br>
                </div> -->

                <!-- <div class="categories" v-for="category in categories" :key="category">
                    <input type="checkbox" class="isActive" :id="category" :name="category" :value="category" @click="fetchData(category)"> <label :for="category">{{category}}</label><br>
                </div> -->

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
                <card v-for="product in filtered_products" :key="product.id" :url="product.thumbnail" :alt="product.title" :stock="product.stock"
                    :title="product.title" :price="product.price" :category="product.category"
                    @handle_like="handle_like" @dis_like="remove_like" @item_clicked="add_item(product)" @product_clicked="add_wish(product)" :id="product.id">
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
import { useWish } from '@/store/wish.store.js'
import { useSort } from '@/store/sort.store.js'
import categoriesList from './Filter/categories.vue'
import titleFilter from './Filter/titleFilter.vue';
import modal from './modal.vue'
import moreDetails from './moreDetails.vue'
import { element_index_in_array } from '@/services/utils/utils'

const selected_category = ref('')
const products = ref([])
const selected_categories = ref([])
const initial_products = ref([])
const filtered_products = ref(products)
const nbr_favorites = ref(0)
const max_price = ref(0)
const store_cart = useCart()
const store_wish = useWish()
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
let mark = ref('')
// let categories = ref([]);

let productsByCategory = async (category) => {
    await axios
    .get(`https://dummyjson.com/products/category/${category}`)
    .then(response => {
        console.log('categories', response.data)
        // categories.value = response.data.data;
        // filtered_products.value = response.data.data;
        products.value = response.data.products;
        // console.log('st', store_cart.total_amount())
        // store_cart.state.length = response.data.data.length;
        // store_cart.length = response.data.data.length;
        // store_cart.total_amount();
    });
}

let productsListByCategory = async (category) => {
    // store_categories.add_or_remove_selected(query);
    // store_categories.addOrRemoveSelected(query);
    store_categories.addRemoveSelected(query);
    if (JSON.parse(JSON.stringify(store_categories.selected_categories)).length !== 0) {
        $('.isActive').prop('checked', false); // Unchecks it
        // $('#'+category).prop('checked', true); // Checks it
        // selected_category.value = category;
        // mark.value = 'x';
        queries.value.forEach(function(key, value) {
            if (key == category) {
            console.log(key);
            $("#"+key).prop('checked', true); // Checks it
              $("#"+key).addClass('active');
            selected_category.value = key;
            mark.value = 'x'
              // isActive.value = false;
            }
        })
        $('#selectedCategory').append(store_categories.value)
        await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then(response => {
            // console.log('categories', response.data)
            products.value = response.data.products;
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
 // console.log('e', e.id);
 // console.log('if', localStorage.jwtToken != undefined)
 // console.log('if0', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')

    const element = JSON.parse(JSON.stringify(e))
    /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    send_to_home('send_item', element)
    store_cart.add_item({ 'item': element, 'number': 1 })
 // console.log(store_cart.getItems)

    // if (!localStorage.jwtToken) {
    //     const element = JSON.parse(JSON.stringify(e))
    //     /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
    //     send_to_home('send_item', element)
    //     store_cart.add_item({ 'item': element, 'number': 1 })
    //  // console.log(store_cart.getItems)
    // } else {
    //  // console.log('else')
    //     send_to_home('send_item', e)
    //     let formData = new FormData();
    //     let product_id = e.id ? e.id : '';
    //     let userId = localStorage.id ? localStorage.id : '';
    //     formData.append('product_id', product_id)
    //     formData.append('userId', userId)
    //     axios
    //     .post(`http://localhost:3001/api/carts/addtocart`, {
    //         'product_id': product_id,
    //         'userId': userId
    //     })
    //     .then(response => {
    //      // console.log('response', response);
    //         // store_categories.add_all_categories(JSON.parse(JSON.stringify(response.data)))
    //         // categories.value = store_categories.getAllCategories
    //     })
    //     .catch(error => {
    //      // console.log(error)
    //     })
    // }
}

// const add_item = (e) => {
//     const element = JSON.parse(JSON.stringify(e))
//     /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
//     send_to_home('send_item', element)
//     store_cart.add_item({ 'item': element, 'number': 1 })
//  // console.log(store_cart.getItems)
// }

// const moreDetails = (e) => {
//     const currentProduct = JSON.parse(JSON.stringify(e))
//  // console.log(currentProduct)
    
//     provide('seeDetails', {product : currentProduct, openModal: true, nameComponent: ''})
// }


const add_wish = (e) => {
    // console.log(!sessionStorage.jwtToken)
    if (!localStorage.jwtToken) {
        // window.location = '#/auth';
        alert('you are not logged in, can you please log in ?');
    } else {
        let productsId;
        // console.log('s', store_wish.items)
        // console.log('e', e.id)
        // alert(e.id)
        if (store_wish.items.find((element) => element.productId === e.id)) {
            // console.log('e', e)
            // alert(e.id)
            let wishProductIds = [];
            axios
            .get(`http://localhost:3001/api/wishes/viewwishes/${localStorage.id}`)
            .then(response => {
                store_wish.items = response.data.data
                console.log(store_wish.items)
                store_wish.items.forEach(function(key, value) {
                    if (key.productId == e.id) {
                        // alert(key.productId)
                        productsId = key.id;
                    }
                    wishProductIds.push(key.productId)
                })
                // console.log('p', productsId)
                // alert(productsId)
                axios
                .delete(`http://localhost:3001/api/wishes/removefromwishes/${productsId}`)
                .then(function(response) {
                    store_wish.items.map(e => e.id)
                    store_wish.length = store_wish.items.length;
                    store_wish.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_wish)).items, e))
                })
                .catch(function(error) {
                    console.error(error)
                })
            })
        } else {
            // console.log('', store_wish.isProduct)
            const element = JSON.parse(JSON.stringify(e))
            // console.log(element)
            /* JSON.parse(JSON.stringify(e)) to get de target in a proxy */
            send_to_home('send_item', element)
            store_wish.add_item({ 'item': element, 'number': 1 })
        }
    }
    // alert(store_wish.isProduct.value)
    // console.log(store_wish.items)
    // console.log(store_wish.items.find((element) => element.item.id === e.id))
    // console.log(store_wish.isProduct.value)
    // console.log(store_wish.isProduct.value == false)
    // store_wish.isProduct.value == true ? store_wish.delete_item({ 'item': element, 'number': 1 })
}

const send_to_home = defineEmits('send_like', 'send_item')

let productsId;
let wishProductIds = [];
onMounted(async () => {
    await axios
    // .get('https://dummyjson.com/products?limit=6')
    .get('http://localhost:3001/api/products/productsList')
    .then(response => {
     console.log('rdp', response.data);
        products.value = response.data.products ? response.data.products : response.data.data
        initial_products.value = products.value
     // console.log(products)
        limit.value = 6;
        items.value = response;
        columns.value = Object.keys(response.data.products ? response.data.products[0] : response.data.data[0]);
        totalProducts.value = response.data;
        totalProductsLimit.value = response.data.limit
        total.value = response.data.total;
     // console.log('total', total)
        length = products.value.length;
        max_price.value = check_max_price(products._rawValue)
        // max_price.value = check_max_price(products)
    });
    await axios
    .get(`https://dummyjson.com/products/categories`)
    .then(response => {
        console.log('categories', response.data.data)
        categories.value = response.data.data;
        // console.log('st', store_cart.total_amount())
        // store_cart.state.length = response.data.data.length;
        // store_cart.length = response.data.data.length;
        // store_cart.total_amount();
    });
    await axios
    .get(`http://localhost:3001/api/carts/viewcarts/${localStorage.id}`)
    .then(response => {
        // console.log('gsvcp', response.data.data)
        // console.log('st', store_cart.total_amount())
        // store_cart.state.length = response.data.data.length;
        store_cart.length = response.data.data.length;
        store_cart.total_amount();
    });
    await axios
    .get(`http://localhost:3001/api/wishes/viewwishes/${localStorage.id}`)
    .then(response => {
        // console.log('gsvcp', response.data.data)
        // console.log('st', store_cart.total_amount())
        // store_cart.state.length = response.data.data.length;
        store_wish.length = response.data.data.length;
        store_wish.items.forEach(function(key, value) {
            // if (key.productId == e.id) {
            //     // alert(key.productId)
            //     productsId = key.id;
            // }
            productsId = key.productId;
            wishProductIds.push(key.productId)
            // $('body'). attr('data-body','');
        })
        // console.log('props', productsId)
        $('wish-'+productsId).attr('fill-rule', '')
        // $('wish-'+productsId).click()
        // $('wish-'+productsId).trigger()
        // console.log('props$', $('wish-'+productsId))
        // store_wish.total_amount();
    });
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
          // Authorization : `Bearer ${localStorage.jwtToken}`
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
    // store_categories.add_or_remove_selected(query);
    // store_categories.addOrRemoveSelected(query);
    store_categories.addRemoveSelected(query);
    // console.log(JSON.parse(JSON.stringify(store_categories.selected_categories)));
    if (JSON.parse(JSON.stringify(store_categories.selected_categories)).length !== 0) {
      isActive = true;
      $('.isActive').removeClass('active');
      $('.isActive').prop('checked', false); // Unchecks it
        queries.value.forEach(function(key, value) {
            if (key == query) {
                $("#"+key).prop('checked', true); // Checks it
                $("#"+key).addClass('active');
                selected_category.value = key;
                mark.value = 'x'
            }
        })
        $('#selectedCategory').append(store_categories.value)
        limit.value = 6;
        let url;
        limit.value == total.value ? url = `https://dummyjson.com/products/search?limit=${limit.value}&q=${query}&skip=${limit.value}` : url = `https://dummyjson.com/products/search?limit=${limit.value}&q=${query}`;
        axios.get(url, {
            method: 'GET',
            mode: 'no-cors',
        })
        .then(resp => {
            total.value = resp.data.total;
            items.value = resp;
            products.value = resp.data.products
            filtered_products.value = products.value
            columns.value = Object.keys(resp.data.products[0]);
            length.value = products.length;
        })
        .catch(error => {
            if (error.response != undefined) {
              if (error.response.status == 422) {
                $('.error').html('')
              } else if (error.response.status == 401) {
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