<template>
  <button type="button" @click="localModelValue++">Click me for +1</button>
</template>

<script setup lang="ts">
import { useLocalModel } from '../../../../src/useLocalModel'
import { ExtractPropTypes, Ref, ref } from 'vue'
import { toRef, toRefs } from 'vue-demi'

interface Test {
  a: string
  b: number
  c?: string
}

const props = defineProps({
  modelValue: { type: String, required: true },
  modelNumber: { type: Number },
  modelObject: { type: Object as () => Test },
  modelArray: { type: Array as () => Test[]}
})

const c = toRef(props, 'modelValue')

const { localModelValue, localModelNumber } = useLocalModel(props, ['modelValue', 'modelNumber'])

console.log(localModelValue.value, localModelNumber.value)

localModelValue.value = '123'
localModelNumber.value =  123
console.log(c)

</script>
