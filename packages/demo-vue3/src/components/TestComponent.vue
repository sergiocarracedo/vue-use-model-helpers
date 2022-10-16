<template>
  {{ localModelObject.b }}
  <button type="button" @click="onClick">Click me for +1</button>
</template>

<script setup lang="ts">
import { useLocalModel } from 'vue-use-model-helpers'
import { Test } from './types'

const props = defineProps({
  modelValue: { type: Number, required: true },
  modelString: { type: String },
  modelObject: { type: Object as () => Test },
  modelArray: { type: Array as () => Test[]}
})


const localModelValue = useLocalModel(props, 'modelValue')
const localModelObject = useLocalModel(props, 'modelObject')

localModelValue.value = 123
// console.log(localModelValue.value, localModelNumber.value)

const onClick = () => {
  localModelValue.value++
  localModelObject.value.b++
}


</script>
