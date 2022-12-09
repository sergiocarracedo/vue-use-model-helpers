<template>
  {{ localModelObject.b }}
  <button type="button" @click="onClick">Click me for +1</button>

  <h2>test 1</h2>
  {{ test1 }}

  <h2>test 2</h2>
  {{ test2 }}
</template>

<script setup lang="ts">
// import { useLocalModel } from 'vue-use-model-helpers'
import { useLocalModel } from '../../../lib/src'
import { Test } from './types'
import { ref, Ref, shallowRef } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  modelString: { type: String },
  modelObject: { type: Object as () => Test },
  modelArray: { type: Array as () => Test[]}
})


const { localModelValue, localModelObject } = useLocalModel(props, ['modelValue', 'modelObject'])

localModelValue.value = 123
// console.log(localModelValue.value, localModelNumber.value)


const test1: Ref = ref({
  a: 1, b: 'b', c: 99
})

const test2: Ref = shallowRef({
  a: 1, b: 'b', c: 99
})


const onClick = () => {
  localModelValue.value++
  localModelObject.value.b++

  test1.value = { a: localModelValue.value++, b: 12 }
  test2.value = { a: localModelValue.value++}
}


</script>
