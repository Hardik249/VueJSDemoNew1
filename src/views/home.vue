<template>
    <div class="home">
        <navbar></navbar>
        <topbar></topbar>
        <modal></modal>
        <content @send_like="handle_like" ></content>
    </div>
</template>
    
<script setup>
import modal from '@/components/modal.vue';
import { provide, ref, watchEffect } from 'vue';
import content from '@/components/content.vue';
import navbar from '@/components/navbar.vue';
import topbar from '@/components/topbar.vue';
import { check_plural } from '@/services/utils/utils.js'

const count_likes = ref(0)
const words_favorite = ref('Favorite')

const handle_like = (e) => {
    /* console.log(e) */
    // count_likes.value = e
    // words_favorite.value = check_plural(e, 'Favorite')
    let cartProductIds = [];
    axios
    .get(`http://localhost:3001/api/wishes/viewwishes/${sessionStorage.id}`)
    .then(response => {
        // console.log(response)
        count_likes.value = response.data.data.length;
        words_favorite.value = check_plural(response.data.data.length, 'Favorite')
        // this.items = response.data.data
            // this.items.forEach(function(key, value) {
            //   cartProductIds.push(key.productId)
        // })
    })
    .catch(error => {
     // console.log(error)
    })
}

let wishProducts = new Array();
let wishProduct;
/* Watcheffect to do the change just one time ... increase performance */
watchEffect(() => {
    axios
    .get(`http://localhost:3001/api/wishes/viewwishes/${sessionStorage.id}`)
    .then(response => {
        // console.log(response)
        count_likes.value = response.data.data.length;
        words_favorite.value = check_plural(response.data.data.length, 'Favorite')
        console.log('#wish-', $('#wish-'+wishProduct))
        console.log('#wish', $('#wish'))
        console.log('fill', $('#deleteItem').attr('fill'))
        console.log('fillsvg', $('#deleteItem').attr('fillsvg'))
        this.items = response.data.data
        response.data.data.forEach(function(key, value) {
            wishProduct.push(key.productId)
            wishProduct = key.productId;
        })
        console.log('#wish-', wishProduct)
    })
    .catch(error => {
     // console.log(error)
    })
    provide('mot', words_favorite)
}
);
provide('nbr_likes', count_likes)

</script>
    
<style scoped>
</style>