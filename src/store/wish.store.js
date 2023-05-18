import { defineStore } from "pinia";
import { onMounted, ref, inject, watchEffect, watch } from 'vue';
import axios from 'axios';

export const useWish = defineStore("wish_items", {
  state: () => {
    return {
      items: [],
      length: '',
      number: '',
      productId: '',
      count: '',
      quantity: '',
      isProduct: false,
    };
  },
  getters: {
    getItems : (state) => {
    },
    nbr_items : (state) => {
      if (!sessionStorage.jwtToken) {
        return state.items.length
      } else {
        axios
          .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
          .then(response => {
        })
        return state.length ? state.length : state.items.length;
      }
    }
  },
  actions: {
    add_item(new_item) {
      if (!sessionStorage.jwtToken) {
        if (this.items.find((element) => element.item.id === new_item.item.id)) {
          alert("Item already added to the cart")
          this.isProduct = true;
        }
        else {
          this.items.push(new_item);
        }
      } else {
        let cartProductIds = [];
        axios
        .get(`http://localhost:3001/api/carts/viewcarts/${sessionStorage.id}`)
        .then(response => {
          this.items = response.data.data
          response.data.data.forEach(function(key, value) {
            cartProductIds.push(key.productId)
          })
          if (cartProductIds.find((element) => element === new_item.item.id)) {
            alert("Item already added to the cart")
          } else {
            let formData = new FormData();
            let product_id = new_item.item.id ? new_item.item.id : '';
            let quantity = new_item.number ? new_item.number : '';
            let user_id = sessionStorage.id ? sessionStorage.id : '';
            formData.append('product_id', product_id)
            formData.append('quantity', quantity)
            formData.append('user_id', user_id)
            axios
            .post(`http://localhost:3001/api/carts/addtocart/${sessionStorage.id}`, {
                'productId': product_id,
                'quantity': quantity,
                'user_id': user_id,
            })
            .then(response => {
                let productId = response.data ? response.data.data.productId : '';
                this.number = response.data.data.quantity ? response.data.data.quantity : '';
                axios
                .get(`http://localhost:3001/api/products/productslist?array=[${productId}]`)
                .then(response => {
                    let item = { 'product': response.data.data, 'number': this.number }
                    this.items.push(item);
                    this.total_amount();
                })
            })
            .catch(error => {
             // console.log(error)
            })
          }
        })
      }
    },
    delete_item(position) {
      this.items.splice(position, 1)
    },
    increase_number(position) {
      if (!sessionStorage.jwtToken) {
        this.items[position].number++
      } else {
        this.items[position].quantity++
        let id = position.id
        axios
        .put(`http://localhost:3001/api/carts/updatequantity/${this.items[position].product.id}`, {
          'quantity': this.items[position].quantity,
        })
        .then(response => {
        });
      }
    },
    decrease_number(position) {
      if (!sessionStorage.jwtToken) {
        if (this.items[position].number >= 2) {
          this.items[position].number--
        }
      } else {
        if (this.items[position].quantity >= 2) {
          this.items[position].quantity--
          axios
          .put(`http://localhost:3001/api/carts/updatequantity/${this.items[position].product.id}`, {
            'quantity': this.items[position].quantity,
          })
          .then(response => {
          });
        }
      }
    },
    total_amount() {
      let total = 0
      let length = this.getItems ? this.getItems.length : ''
      for (let i = 0; i < this.items.length; i++) {
        total = !sessionStorage.jwtToken ? total + this.items[i].item.price*this.items[i].number : total + this.items[i].product.price*this.items[i].quantity
      } 
      return total
    }
  },
});
