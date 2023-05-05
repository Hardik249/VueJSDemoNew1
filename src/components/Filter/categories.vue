<template>
    <div class="categories">
        <input type="checkbox" :id="id" :name="name" :value="value">
        <label :for="for"><slot></slot> </label>
        <!-- <span :for="for"><slot></slot> </span> -->
    </div>
</template>

<script setup>
/* defineProps({
    check: {
        type: Function,
        required: true
    }
}) */
defineProps({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    for:{
        type: String,
        required: true
    }
    // check: {
    //     type: Function,
    //     required: true
    // }
})
</script>

<style scoped>
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