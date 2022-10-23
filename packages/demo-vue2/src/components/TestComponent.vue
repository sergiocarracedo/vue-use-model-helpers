<template>
  <div>
    <button type="button" @click="onClick">Click me for +1</button>
    <fieldset>
      <legend>Values in the component:</legend>
      <ul>
        <li>localModelObject: <strong>{{ localModelObject }}</strong></li>
        <li>localModelValue: <strong>{{ localModelValue }}</strong></li>
      </ul>
    </fieldset>
  </div>
</template>

<script  lang="ts">
import { Test } from './types'
import { defineComponent } from 'vue'
import { useLocalModel } from 'vue-use-model-helpers'

export default defineComponent({
  props: {
    value: { type: Number, required: true },
    modelString: { type: String },
    modelObject: { type: Object as () => Test },
    modelArray: { type: Array as () => Test[]}
  },
  setup (props) {
    const localModelValue = useLocalModel(props, 'value')
    const localModelObject = useLocalModel(props, 'modelObject')

    localModelValue.value = 123
    const onClick = () => {
      localModelValue.value++
      localModelObject.value.b++
    }

    return { localModelValue, onClick, localModelObject }
  }
})

</script>
