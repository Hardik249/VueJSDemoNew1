import { defineStore } from "pinia";
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
import axios from 'axios';

export const useCart = defineStore("cart_items", {
  state: () => {
    return {
      items: [],
      length: '',
    };
  },
  getters: {
    getItems : (state) => {
      console.log(`state.items ${state.items}`)
      console.log('add_itemif', !sessionStorage.jwtToken)
      console.log('add_itemif', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')
      if (!sessionStorage.jwtToken) {
        return JSON.parse(JSON.stringify(state.items))
      } else {
        console.log('state', state);
        axios
        .get('http://localhost:3000/api/carts/viewcarts')
        .then(response => {
          console.log('gsvcp', response.data.data)
          // products.value = response.data.products
          // cart_products.value = response.data
          // limit.value = 6;
          // let productId;
          // if (response.data) {
          //   // productId = response.data.data[0].product_id
          //   productId = response.data.product_id
          // }
          // productId = '';
          // let ids;
          let ids = new Array();
          response.data.data.forEach(function(key, value) {
              // ids = key.product_id;
              ids.push(key.product_id);
          })
          let productId = response.data ? ids : '';
          // let productId = response.data ? response.data.product_id : '';
          // console.log(response.data.data[0].product_id)
          axios
          .get(`http://localhost:3000/api/products/productslist?array=[${productId}]`)
          .then(response => {
            console.log('products', response.data)
            state.items = response.data.data;
            state.length = response.data.length
            // this.items = response;
          })
          console.log('items.value', state.items)
          // console.log(products)
          // columns.value = response.data.data ? Object.keys(response.data.data[0]) : '';
          // totalProducts.value = response.data;
          // totalProductsLimit.value = response.data.limit
          // total.value = response.data.total;
          // console.log('items.value', this.items)
          // length = response.data.value.length;
          // max_price.value = check_max_price(response.data.products._rawValue)
          // max_price.value = check_max_price(products)
        });
      }
    },
    nbr_items : (state) => {
      return state.items.length
    }
  },
  actions: {
    add_item(new_item) {
      console.log('add_itemif', !sessionStorage.jwtToken)
      console.log('add_itemif', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')
      if (!sessionStorage.jwtToken) {
        if (this.items.find((element) => element.item.id === new_item.item.id)) {
          alert("Item already added to the cart")
        }
        else {
          this.items.push(new_item);
        }
      } else {
        console.log('new_item', new_item);
        let formData = new FormData();
        // let product_id = e.id ? e.id : '';
        let product_id = new_item.item.id ? new_item.item.id : '';
        let user_id = sessionStorage.id ? sessionStorage.id : '';
        formData.append('product_id', product_id)
        formData.append('user_id', user_id)
        axios
        .post(`http://localhost:3000/api/carts/addtocart`, {
            'product_id': product_id,
            'user_id': user_id
        })
        .then(response => {
            console.log('response', response);
            // items.value = response.data
            // let ids = new Array();
            // response.data.data.forEach(function(key, value) {
            //     // ids = key.product_id;
            //     ids.push(key.product_id);
            // })
            // let productId = response.data ? ids : '';
            let productId = response.data ? response.data.data.product_id : '';
            // console.log(response.data.data[0].product_id)
            axios
            .get(`http://localhost:3000/api/products/productslist?array=[${productId}]`)
            .then(response => {
                console.log('products', response);
                // cart_products.value = response.data
                // length.value= response.data.length
                this.items.push(response.data.data);
                console.log('items', this.items)
                console.log('getItems', this.getItems)
                // this.items.push(new_item);
            })
            // store_categories.add_all_categories(JSON.parse(JSON.stringify(response.data)))
            // categories.value = store_categories.getAllCategories
        })
        .catch(error => {
            console.log(error)
        })
      }
    },
    delete_item(position) {
      console.log('delete_itemif', !sessionStorage.jwtToken)
      console.log('delete_itemif', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')
      this.items.splice(position, 1)
      // if (!sessionStorage.jwtToken) {
      //   this.items.splice(position, 1)
      // } else {
      //   alert('else')
      // }
    },
    increase_number(position) {
      this.items[position].number++
      console.log(this.items)
    },
    decrease_number(position) {
      if (this.items[position].number >= 2) {
        this.items[position].number--
      }
    },
    total_amount() {
      let total = 0
      let length = this.getItems ? this.getItems.length : ''
      for (let i = 0; i < length; i++) {
        total = !sessionStorage.jwtToken ? total + this.getItems[i].item.price*this.getItems[i].number : ''
      } 
      return total
    }
  },
});
onMounted(async () => {
  await axios
  .get('http://localhost:3000/api/carts/viewcarts')
  .then(response => {
    console.log('vcp', response.data.data)
    // products.value = response.data.products
    cart_products.value = response.data
    limit.value = 6;
    items.value = response;
    // columns.value = response.data.data ? Object.keys(response.data.data[0]) : '';
    totalProducts.value = response.data;
    totalProductsLimit.value = response.data.limit
    total.value = response.data.total;
    console.log('total', total)
    // length = response.data.value.length;
    // max_price.value = check_max_price(response.data.products._rawValue)
    // max_price.value = check_max_price(products)
  });
})
