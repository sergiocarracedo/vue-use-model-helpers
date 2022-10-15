<template>
  {{ localModelValue }}
  <button type="button" @click="onClick">Click me for +1</button>
</template>

<script setup lang="ts">
import { useLocalModel } from '../../../../dist'

interface Test {
  a: string
  b: number
  c?: string
}

const props = defineProps({
  modelValue: { type: Number, required: true },
  modelString: { type: String },
  modelObject: { type: Object as () => Test },
  modelArray: { type: Array as () => Test[]}
})


const localModelValue = useLocalModel(props, 'modelValue')

localModelValue.value = 123
// console.log(localModelValue.value, localModelNumber.value)

const onClick = () => {
  console.log(localModelValue.value)
  localModelValue.value++
}


</script>
