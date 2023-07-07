<template>

    <div class="modal" v-if="isOpen">

        <div>
            <div class="topmodal">
                <button @click="isOpen = false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                            fill="red" />
                    </svg>
                </button>
                <div class="cartIcon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44771 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM12 12C9.23858 12 7 9.31371 7 6H9C9 8.56606 10.6691 10 12 10C13.3309 10 15 8.56606 15 6H17C17 9.31371 14.7614 12 12 12Z"
                            fill="var(--secondary)" />
                    </svg>
                </div>
                <div class="details">
                    <h2><strong> 
                        <!-- MON PANIER  -->
                        MY CART
                    </strong></h2>
                    <p style="color: gray;"> 
                        <!-- À noter qu'aucun article ne sera retourné au delà de 30 jours à compter de la date de livraison effective. --> 
                        Note that no item will be returned beyond 30 days from the actual delivery date.
                    </p>
                    <p style="color: gray;"> 
                        <!-- Conctactez le <a href="">service client</a> pour toute information
                        supplémentaire -->
                        Contact <a href="">customer service</a> for any additional information
                    </p>
                </div>
            </div>
            <hr>
            <!-- {{store_cart.getItems}} -->
            <div class="empty" v-if="store_cart.items.length === 0">
                <img src="@/assets/empty.svg" alt="Empty cart">
                <h4 style="color: var(--secondary);"> Your cart is empty </h4>
                <small> Add somthing to make me happy for real :-) </small>
            </div>
            <!-- <modalCard v-for="item_in_cart in cart_products.data" :image="item_in_cart.thumbnail"
                :quantity="item_in_cart.number" :computedPrice="item_in_cart.number * item_in_cart.price">
                {{ item_in_cart.title }}
                <template v-slot:reduceQuantity>
                    <button class="handleQuantity" @click="reduceQuantity(item_in_cart)"> - </button>
                </template>
                <template v-slot:addQuantity>
                    <button class="handleQuantity" @click="addQuantity(item_in_cart)"> + </button>
                </template>
                <template v-slot:btnDelete>
                    <svg @click="deleteItem(item_in_cart)" class="trashIcon" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                            fill="currentColor" />
                        <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                        <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                    </svg>
                </template>
            </modalCard> -->
            <!-- {{store_cart}} -->
            <!-- {{store_cart.items}} -->
            <!-- v-if="store_cart.getItems ? " -->
            <!-- {{ store_cart.items.length }} -->
            <!-- {{ store_cart.number }} -->
            <modalCard v-for="(item_in_cart, index) in
            store_cart.items" :image="item_in_cart.item ?
            item_in_cart.item.thumbnail :
            item_in_cart.product.thumbnail" :productId="'product-' + product.id"
                :quantity="item_in_cart.number ? item_in_cart.number : item_in_cart.quantity" :computedPrice="item_in_cart.item ? item_in_cart.number * item_in_cart.item.price : item_in_cart.quantity * item_in_cart.product.price" :id="'product-'+item_in_cart.productId">
                <!-- {{ productId }} -->
                <!-- {{ item_in_cart.productId }} -->
                <!-- {{ store_cart.productId }} -->
                <!-- {{ item_in_cart }} -->
                <!-- {{ item_in_cart.item }} -->
                <!-- {{ item_in_cart.product }} -->
                <!-- {{ item_in_cart.product.title }} -->
                <!-- {{ store_cart }} -->
                <!-- {{ item_in_cart.number }} -->
                <!-- {{ store_cart.number }} -->
                <!-- {{ number }} -->
                <div v-if="item_in_cart.item">
                    {{ item_in_cart.item.title }}
                </div>
                <div v-else>
                    {{ item_in_cart.product.title }}
                </div>
                <div>
                    <span :id="'stock-'+index">
                        <!-- {{ stockmsg }} -->
                        {{ stockmsg[index] }}
                    </span>
                </div>
                <template v-slot:reduceQuantity>
                    <button class="handleQuantity" @click="reduceQuantity(item_in_cart)"> - </button>
                </template>
                <template v-slot:addQuantity>
                    <button class="handleQuantity" @click="addQuantity(item_in_cart)"> + </button>
                </template>
                <template v-slot:btnDelete>
                    <svg @click="deleteItem(item_in_cart)" class="trashIcon" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                            fill="currentColor" />
                        <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                        <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                    </svg>
                </template>
            </modalCard>
            <div class="total" v-if="store_cart.items.length !== 0">
                <h5> Total <span class="amount"> {{ total }}€ </span> </h5>
            </div>
            <div class="promo" v-if="store_cart.items.length !== 0">
                <!-- <input type="checkbox" class="isActive" id="ring" name="ring" value="ring" @click="fetchData('ring')"> <label for="ring">Rings</label><br> -->
                <span><input type="checkbox" v-model="have_promo" id="have_promo"> <label for="have_promo"> I have a promo code </label></span><br>
                <input type="text" v-if="have_promo" placeholder="Code promo" v-model="promo_value"
                    @input="check_promo_code">
            </div>

            <button class="pay" @click="goPayement" v-if="store_cart.items.length !== 0">
                <svg class="iconLock" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                        fill="currentColor" />
                </svg>
                <!-- Make payment -->
                Buy Now
            </button>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
import modalCard from './modalCard.vue';
import { useCart } from '@/store/cart.store.js'
import { element_index_in_array } from '@/services/utils/utils'
import axios from 'axios';
// import modal from './modal.vue';

let limit = ref(0);
// let productId = ref(0);
let totalProducts = ref(0);
let length = ref(0);
let quantity = ref([]);
let items = ref([]);
// let columns = ref([]);
let totalProductsLimit = ref(0);

let cart_products = ref([]);
let products = ref([]);
// let stockmsg = ref("");
const stockmsg = ref([]);

const store_cart = useCart()
const isOpen = inject('dataModalCart')
// let productId = store_cart.productId;

const have_promo = ref(false)
const total = ref(0)
const promo_value = ref("")

const deleteItem = (e) => {
   // console.log('deleteItemif', !sessionStorage.jwtToken)
   // console.log('deleteItemif', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')
      if (!localStorage.jwtToken) {
        store_cart.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
      } else {
     // console.log('store_cart.length', store_cart.length)
     // console.log('e-', e)
        // alert('e')
        axios
        .delete(`http://localhost:3001/api/carts/removefromcart/${e.id}`)
        .then(function(response) {
         // console.log('e-deleteItem', response)
            store_cart.items.map(e => e.id)
            store_cart.length = store_cart.items.length;
         // console.log('store_cart.getItems.length', store_cart.length)
         // console.log('sid', JSON.parse(JSON.stringify(store_cart)).items)
         // console.log('sit', e)
            // store_cart.delete_item()
            // store_cart.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e.id))
            store_cart.delete_item(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
        })
        .catch(function(error) {
            console.error(error)
        })
      }
}
const addQuantity = (e) => {
 // console.log('q0', JSON.parse(JSON.stringify(store_cart)).items)
 // console.log('q1', e)
    store_cart.increase_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    // if (!localStorage.jwtToken) {
    //     store_cart.increase_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    //     total.value = store_cart.total_amount()
    // } else {
    //     store_cart.increase_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    //  // console.log('t_', e)
    //  // console.log('t_', JSON.parse(JSON.stringify(store_cart)).items)
    //     axios
    //     .get(`http://localhost:3001/api/carts/viewcarts/${localStorage.id}`)
    //     .then(response => {
    //      // console.log('t_', response.data.data)
    //      // console.log('o_', e)
    //         let productId;
    //         let qty;
    //         let cartId;
    //         response.data.data.forEach(function(key, value) {
    //          // console.log(`key ${key} value ${value}`)
    //             if (key.product_id = e.id) {
    //                 productId = key.productId;
    //                 qty = key.quantity;
    //                 cartId = key.id
    //             }
    //         })
    //         store_cart.number = qty;
    //         // alert(e.id)
    //         // store_cart.number = response.data.data[e.id].quantity;
    //      // console.log('t_', store_cart.number)
    //         let data = {
    //             'productId': productId,
    //             'id': cartId,
    //             'quantity': qty,
    //             'number': qty,
    //             // 'number': store_cart.number,
    //         }
    //      // console.log('dt_', data)
    //         // store_cart.increase_number(data)
    //         // length = response.data.value.length;
    //         // max_price.value = check_max_price(response.data.products._rawValue)
    //         // max_price.value = check_max_price(products)
    //     });
    // }
}
const reduceQuantity = (e) => {
    store_cart.decrease_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    // if (!localStorage.jwtToken) {
    //     store_cart.decrease_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    // } else {
    //  // console.log('reduceQuantity', e)
    //  // console.log('reduceQuantitye', JSON.parse(JSON.stringify(store_cart)).items)
    //     store_cart.decrease_number(element_index_in_array(JSON.parse(JSON.stringify(store_cart)).items, e))
    //     axios
    //     .get(`http://localhost:3001/api/carts/viewcarts/${localStorage.id}`)
    //     .then(response => {
    //      // console.log('t_', response.data.data)
    //         // products.value = response.data.products
    //         let productId;
    //         let qty;
    //         let cartId;
    //         response.data.data.forEach(function(key, value) {
    //          // console.log(`key ${key} value ${value}`)
    //             if (key.product_id = e.id) {
    //                 productId = key.productId;
    //                 qty = key.quantity;
    //                 cartId = key.id
    //             }
    //         })
    //         store_cart.number = qty;
    //         // alert(e.id)
    //         // store_cart.number = response.data.data[e.id].quantity;
    //      // console.log('t_', store_cart.number)
    //         let data = {
    //             'productId': productId,
    //             'id': cartId,
    //             'quantity': qty,
    //             'number': qty,
    //             // 'number': store_cart.number,
    //         }
    //      // console.log('dt_', data)
    //         // store_cart.decrease_number(data)
    //         // length = response.data.value.length;
    //         // max_price.value = check_max_price(response.data.products._rawValue)
    //         // max_price.value = check_max_price(products)
    //     });
    // }
}
const check_promo_code = () => {
    //if(promo_value.length ==)
    // Checker' l'exactiture du code promo 3 secondes eprès l'entree ... en attendant, faire apparaitre un loader.... 
 // console.log(promo_value)
}


cart_products.value = store_cart.getItems ? store_cart.getItems : store_cart.items;
// console.log('t', cart_products.value);
// this.cart_products = store_cart.getItems ? store_cart.getItems : store_cart.items;
// console.log('t', this.cart_products);

// onMounted(async () => {
//     await axios
//         .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
//         .then(response => {
//          // console.log('vcp', response.data.data)
//             // products.value = response.data.products
//             cart_products.value = response.data
//             limit.value = 6;
//             items.value = response;
//             // columns.value = response.data.data ? Object.keys(response.data.data[0]) : '';
//             totalProducts.value = response.data;
//             totalProductsLimit.value = response.data.limit
//             total.value = response.data.total;
//          // console.log('total', total)
//             // length = response.data.value.length;
//             // max_price.value = check_max_price(response.data.products._rawValue)
//             // max_price.value = check_max_price(products)
//         });
//         // if (store_categories.getAllCategories.length === 0) {
//         //     await axios
//         //         .get('https://dummyjson.com/products/categories')
//         //         .then(response => {
//         //             store_categories.add_all_categories(JSON.parse(JSON.stringify(response.data)))
//         //             categories.value = store_categories.getAllCategories
//         //         })
//         // }
//         // else {
//         //     categories.value = store_categories.getAllCategories
//         // }
// })


watchEffect(() => {
 // console.log(`store_cart.total_amount() ${store_cart.total_amount()}`)
    // total.value = store_cart.total_amount() != 0 ? store_cart.total_amount().toFixed(2) : store_cart.total_amount()
    total.value = store_cart.total_amount().toFixed(2)
 // console.log(isOpen + "zfzfzefzefez")
})
onMounted(async () => {
    await axios
    // .get('https://dummyjson.com/products?limit=6')
    .get('http://localhost:3001/api/products/productslist')
    .then(response => {
     console.log('rdp', response.data);
        products.value = response.data.products ? response.data.products : response.data.data;
    });
})
// const goPayement = async () => {
//     if (!localStorage.jwtToken) {
//         window.location = '#/auth'
//     } else {
//         let isStock = false;
//         let stock = new Array();
//         let stockmsg;
//         // let isStock;
//         store_cart.items.forEach(async function(index, item) {
//             // console.log(`${index.quantity} ${item}`);
//             console.log(`${index.productId} ${item}`);
//             await axios
//             // .get('https://dummyjson.com/products?limit=6')
//             .get(`http://localhost:3001/api/products/product/${index.productId}`)
//             .then(response => {
//                 console.log('response', response);
//                 // console.log('s', response.data.data.stock);
//                 // console.log('condition', response.data.data.stock > 2);
//                 // if (response.data.data.stock >= 2) {
//                 //     window.location = '#/checkout'
//                 // }
//                 stockmsg = response.data.data.stock >= 2 ? 'out of stock' : '';
//                 isStock = response.data.data.stock >= 2 ? true : false;
//                 stock.push(response.data.data.stock);
//                 // stock['stock'] = response.data.data.stock;
//             });
//             // console.log('is', isStock);
//             if (isStock === true) {
//                 window.location = '#/checkout'
//             } else {
//                 // window.location = '#/'
//                 $('#stock').append(stockmsg);
//             }
//             // stock.forEach(function(key, value) {
//             //     console.log(`${key} ${value}`);
//             //     console.log(key);
//             // })
//         })
//                 $('#stock').append(stockmsg);
//         // console.log(stock);
//         // console.log('ist', isStock);
//         // await axios
//         // // .get('https://dummyjson.com/products?limit=6')
//         // .get('http://localhost:3001/api/products/productslist')
//         // .then(response => {
//         //     console.log('quantity', response.data.data);
//         //     console.log(store_cart.items);
//         //     response.data.data.forEach(function(key, value) {
//         //         // console.log(`${key.stock} ${value}`);
//         //         console.log('condition', key.stock > 2);
//         //     })
//         //     store_cart.items.forEach(function(index, item) {
//         //         console.log(`${index.quantity} ${item}`);
//         //     })
//         // });
//     }
// }

const goPayement = async () => {
  if (!localStorage.jwtToken) {
    window.location = '#/auth';
  } else {
    let isStock = false;
    let stock = new Array();
let stockmsg1;
    for (const index in store_cart.items) {
      const item = store_cart.items[index];
      // console.log(index);
      try {
        const response = await axios.get(`http://localhost:3001/api/products/product/${item.productId}`);
        console.log('response', response);
        if (response.data.data.stock >= 2) {
          stockmsg.value[index] = ''; // Empty stock message if stock is sufficient
        } else {
          stockmsg.value[index] = 'Out of stock';
        }
        stockmsg1 = response.data.data.stock >= 2 ? '' : $('#stock'+index).append('out of stock');
        // $('#stock'+index).append('out of stock')
        isStock = response.data.data.stock >= 2 ? false : true;
        stock.push(response.data.data.stock);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    // console.log(stockmsg1);
    if (isStock === false) {
        window.location = '#/checkout';
    }
  }
};
</script>

<style scoped>
.modal {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.568);
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal>div {
    background-color: #fff;
    width: 60%;
    height: 90%;
    padding: 50px;
    border-radius: 10px;
    overflow-y: scroll;
    position: relative;

}

.topmodal {
    display: inline-flex;
    flex-direction: row;
    gap: 25px;
}

.topmodal button {
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    border: 1px solid var(--secondary);
    border-radius: 50%;
    background-color: transparent;
}

.empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.empty img {
    height: 150px;
}

.empty h4 {
    margin-top: 40px;
}

.cartIcon {
    flex-basis: 200px;
    width: 120px;
    height: 90px;
    background-color: transparent;
    display: grid;
    place-items: center;
}

.details {
    width: 60%;
}

hr {
    margin: 40px 0px;
    border-top: 0px;
    border-color: var(--fourth);
}

.trashIcon {
    margin: 0px 25px;
}

.trashIcon:hover {
    cursor: pointer;
    color: var(--secondary);
}

.handleQuantity {
    padding: 8px 15px;
    border: 1px solid var(--secondary);
    color: var(--secondary);
    background-color: transparent;
    transition: all 100ms;
}

.handleQuantity:hover {
    cursor: pointer;
    border: 1px solid var(--secondary);
    background-color: var(--secondary);
    color: white;
}

.promo {
    padding: 5px;
    width: 30%;
}

.promo input[type="text"] {
    padding: 0px 20px;
    border: 1px solid var(--secondary);
    border-radius: 5px;
    outline: none;
    height: 50px;
}

.total {
    float: inline-end;
    padding: 25px 0px;
}

.amount {
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: var(--fourth);
    color: var(--secondary);
    padding: 10px 20px;
    margin: 0px 15px;
    font-weight: bolder;
    font-size: 1.3em;
}

.pay {
    border: 1px solid var(--secondary);
    border-radius: 10px;
    background-color: var(--secondary);
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 0px;
    transition: all 150ms;
}

.pay:hover {
    cursor: pointer;
    border: 1px solid var(--secondary);
    background-color: transparent;
    color: var(--secondary);
}

.pay .iconLock {
    margin: 0px 15px;
}
</style>