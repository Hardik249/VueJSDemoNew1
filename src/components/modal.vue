<template>
    <div class="root">
        <teleport to="body">
            <!-- v-if="isOpen.visible" -->
            <component :is="currentComponent" :id="id"></component>
        </teleport>
    </div>
</template>

<script setup>
import { inject } from 'vue';

import modalCart from './Cart/modalCart.vue';
import modalWish from './Wish/modalWish.vue';
import moreDetails from './moreDetails.vue'

/* Inject to take currentComponent */
//const isOpen = inject('modalCart')
const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    // currentComponent: {
    //     type: String,
    //     default: '',
    // },
})

const components = {
    modalCart,
    modalWish
}
const isOpen = inject('dataModal')
// let isOpen = localStorage.getItem('dataModal')
// console.log(props.id)
// console.log(props.currentComponent)
console.log(isOpen)
// const currentComponent = modalWish;
const currentComponent = props.id == 1 ? modalCart : modalWish;

</script>