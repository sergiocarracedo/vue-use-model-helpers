<template>
  <div class="card">
    <test-component v-model="count"></test-component>
    <p>Count is {{count}}</p>


  </div>
</template>

<script setup lang="ts">
import TestComponent from './TestComponent.vue'
import { ref } from 'vue'
const count = ref(0)
</script>

