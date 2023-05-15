import { defineStore } from "pinia";
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
import axios from 'axios';

export const useCart = defineStore("cart_items", {
  state: () => {
    return {
      items: [],
      length: '',
      number: '',
      productId: '',
    };
  },
  getters: {
    getItems : (state) => {
      console.log(`state.items ${state.items}`)
      console.log('add_itemif', !sessionStorage.jwtToken)
      console.log('add_itemif', !sessionStorage.jwtToken && sessionStorage.jwtToken == '')
      // if (!sessionStorage.jwtToken) {
      //   state.items = JSON.parse(JSON.stringify(state.items))
      //   state.length = state.items.length
      //   // return JSON.parse(JSON.stringify(state.items))
      // } else {
      //   console.log('state', state);
      //   axios
      //   .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
      //   .then(response => {
      //     console.log('gsvcp', response.data.data)
      //     // products.value = response.data.products
      //     // cart_products.value = response.data
      //     // limit.value = 6;
      //     // let productId;
      //     // if (response.data) {
      //     //   // productId = response.data.data[0].product_id
      //     //   productId = response.data.product_id
      //     // }
      //     // productId = '';
      //     // let ids;
      //     let ids = new Array();
      //     let quantity;
      //     response.data.data.forEach(function(key, value) {
      //         // ids = key.product_id;
      //         ids.push(key.product_id);
      //         quantity = key.quantity
      //         state.number = key.quantity
      //     })
      //     let productId = response.data ? ids : '';
      //     // let productId = response.data ? response.data.product_id : '';
      //     // console.log(response.data.data[0].product_id)
      //     axios
      //     .get(`http://localhost:3001/api/products/productslist?array=[${productId}]`)
      //     .then(response => {
      //       console.log('products', response.data)
      //       state.items = response.data.data;
      //       state.length = response.data.length
      //       // this.items = response;
      //     })
      //     // console.log(products)
      //     // columns.value = response.data.data ? Object.keys(response.data.data[0]) : '';
      //     // totalProducts.value = response.data;
      //     // totalProductsLimit.value = response.data.limit
      //     // total.value = response.data.total;
      //     // console.log('items.value', this.items)
      //     // length = response.data.value.length;
      //     // max_price.value = check_max_price(response.data.products._rawValue)
      //     // max_price.value = check_max_price(products)
      //   });
      // }
          console.log('items.value', state.items)
    },
    nbr_items : (state) => {
      // return state.items.length
      if (!sessionStorage.jwtToken) {
        return state.items.length
      } else {
        console.log('state', state)
        console.log('state-items', state.length)
        // state.items.length = state.items.length;
        // state.length = state.items.length;
        // return state.items.length
        // return state.items ? state.items.length : state.length;
        return state.length ? state.length : state.items.length;
      }
    }
  },
  actions: {
    add_item(new_item) {
      console.log('new_item', new_item);
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
        let quantity = new_item.number ? new_item.number : '';
        let user_id = sessionStorage.id ? sessionStorage.id : '';
        formData.append('product_id', product_id)
        formData.append('quantity', quantity)
        formData.append('user_id', user_id)
        axios
        .post(`http://localhost:3001/api/carts/addtocart`, {
            'product_id': product_id,
            'quantity': quantity,
            'user_id': user_id,
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
            this.number = response.data.data.quantity ? response.data.data.quantity : '';
            // console.log(response.data.data[0].product_id)
            axios
            .get(`http://localhost:3001/api/products/productslist?array=[${productId}]`)
            .then(response => {
                console.log('products', response);
                // cart_products.value = response.data
                // length.value= response.data.length

                // alert(number)
                alert(this.number)

                // this.items.push(response.data.data);
                let item = { 'item': response.data.data, 'number': this.number }
                this.items.push(item);

                // this.number = new_item.number
                // this.number = this.items.length;
                // console.log('length', this.items.length)
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
      //   console.log('d', position)
      //   console.log('di', this.items.splice(position, 1))
      // }
    },
    increase_number(position) {
      if (!sessionStorage.jwtToken) {
        console.log('p0-', position)
        this.items[position].number++
        console.log(this.items)
      } else {
        this.items[position].quantity++
        console.log('p-', position)
        let id = position.id
        console.log('products0', this.items[position].quantity)
        console.log('product0', this.items[position].product.id)
        // console.log('productsi', position.id)
        // console.log('productsn', position.number)
        // let product;
        // this.items.forEach(function(key, value) {
        //   if (key.id == position.id) {
        //     product = position.id;
        //   }
        // })
        // console.log('product', product)
        // console.log('products1', this.items[position.id])
        // console.log('products2', this.items[position].number)
        // console.log('products3', this.items[position].number++)
        // console.log('products4', this.items[position].number)
        // this.items[position].number++
        // position.number++
        //   position.quantity++
        // position.number+
        // alert(position.quantity);
        // console.log('in_', position)
        axios
        .put(`http://localhost:3001/api/carts/updatequantity/${this.items[position].product.id}`, {
          // 'quantity': position.number,
          'quantity': this.items[position].quantity,
          // 'product_id': product_id,
          // 'user_id': user_id,
        })
        .then(response => {
          console.log('r_', response.data)
          // position.number = response.data.data.quantity
          // this.number = response.data.data.quantity;
          console.log('quantity', this.items)
          // let qty;
          // this.items.forEach(function(key, value) {
          //     console.log(`key ${key.productId} value ${position.productId}`)
          //     if (key.productId = position.productId) {
          //         // productId = key.productId;
          //         qty = key.quantity;
          //         // cartId = key.id
          //     }
          // })
          // this.number = qty;

          
          // let cartProducts = JSON.parse(JSON.stringify(response.data.data))
          // console.log('console', cartProducts)
          // let qty;
          // JSON.parse(JSON.stringify(response.data.data)).forEach(function(key, value) {
          //     console.log(`key ${key} value ${value}`)
          //     if (key.product_id = e.id) {
          //         qty = key.product_id;
          //     }
          // })
          // // store_cart.number = response.data.data[e.id].quantity;
          // store_cart.number = qty;
          // console.log('t_', store_cart.number)
          // store_cart.decrease_number(store_cart.number)

          // total.value = response.data.total;
          // console.log('t_', response.data.data.quantity)
          // this.number = response.data.data.quantity;
          // console.log('t_', this.number)
          // this.number = response.data.data.quantity ? response.data.data.quantity : '';
          // length = response.data.value.length;
          // max_price.value = check_max_price(response.data.products._rawValue)
          // max_price.value = check_max_price(products)
        });
      }
    },
    decrease_number(position) {
      // console.log('decrease_number', this.items[position].number)
      if (!sessionStorage.jwtToken) {
        if (this.items[position].number >= 2) {
          this.items[position].number--
          console.log(this.items)
        }
      } else {
        console.log('dn', position)
        console.log('if', this.items[position].quantity >= 2)
        if (this.items[position].quantity >= 2) {
          console.log('p0', this.items[position])
          console.log('products0', this.items[position].quantity)
          console.log('product0', this.items[position].product.id)
          this.items[position].quantity--
          // position.number--
          // position.quantity--
          // position.number-
          // alert(position.quantity);
          console.log(position)
          axios
          .put(`http://localhost:3001/api/carts/updatequantity/${this.items[position].product.id}`, {
            // 'quantity': position.number,
            'quantity': this.items[position].quantity,
            // 'product_id': product_id,
            // 'user_id': user_id,
          })
          .then(response => {
            console.log('t_', response.data.data)
            // position.number = response.data.data.quantity
            // this.number = response.data.data.quantity;
            console.log('quantity', this.items)
            // let qty;
            // this.items.forEach(function(key, value) {
            //     console.log(`key ${key.productId} value ${position.id}`)
            //     if (key.productId = position.productId) {
            //         // productId = key.productId;
            //         qty = key.quantity;
            //         // cartId = key.id
            //     }
            // })
            // this.number = qty;
            

            // let qty;
            // response.data.data.forEach(function(key, value) {
            //     console.log(`key ${key} value ${value}`)
            //     if (key.product_id = e.id) {
            //         qty = key.product_id;
            //     }
            // })
            // store_cart.number = qty;
            // // store_cart.number = response.data.data[e.id].quantity;
            // console.log('t_', store_cart.number)
            // store_cart.decrease_number(store_cart.number)
            
            // total.value = response.data.total;
            // console.log('t_', response.data.data.quantity)
            // this.number = response.data.data.quantity;
            // console.log('t_', this.number)
            // this.number = response.data.data.quantity ? response.data.data.quantity : '';
            // length = response.data.value.length;
            // max_price.value = check_max_price(response.data.products._rawValue)
            // max_price.value = check_max_price(products)
          });
        }
      }
    },
    total_amount() {
      let total = 0
      let length = this.getItems ? this.getItems.length : ''
      console.log('total_amount0', length)
      // alert(this.length)
      for (let i = 0; i < this.items.length; i++) {
      console.log('total_amountif', this.number)
        // alert(this.items[i].number)
        // total = !sessionStorage.jwtToken ? total + this.getItems[i].item.price*this.getItems[i].number : ''
        total = !sessionStorage.jwtToken ? total + this.items[i].item.price*this.items[i].number : total + this.items[i].product.price*this.items[i].quantity
        // total = total + this.getItems[i].item.price*this.getItems[i].number
        // total = total + this.items[i].item.price*this.items[i].number
      } 
      return total
    }
  },
});
// onMounted(async () => {
//   await axios
//   .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
//   .then(response => {
//     console.log('vcp', response.data.data)
//     // products.value = response.data.products
//     cart_products.value = response.data
//     limit.value = 6;
//     items.value = response;
//     // columns.value = response.data.data ? Object.keys(response.data.data[0]) : '';
//     totalProducts.value = response.data;
//     totalProductsLimit.value = response.data.limit
//     total.value = response.data.total;
//     // number.value = response.data.data.quantity;
//     // this.number = response.data.data.quantity ? response.data.data.quantity : '';
//     // console.log('total', this.number)
//     // length = response.data.value.length;
//     // max_price.value = check_max_price(response.data.products._rawValue)
//     // max_price.value = check_max_price(products)
//   });
// })
