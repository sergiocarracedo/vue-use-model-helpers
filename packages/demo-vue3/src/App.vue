<template>
  <div class="card">
    <test-component v-model="count" v-model:model-object="test"></test-component>
    <p>Count is {{test.b}}</p>
  </div>
</template>

<script setup lang="ts">
import TestComponent from './components/TestComponent.vue'
import { ref, Ref } from 'vue'
import { Test } from './components/types'

const count = ref(56)
const test: Ref<Test> = ref({
  a: 'a value',
  b: 555
})
</script>
