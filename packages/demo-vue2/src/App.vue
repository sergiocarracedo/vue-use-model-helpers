<template>
  <div class="card">
    <test-component v-model="count" :model-object.sync="test"></test-component>

    <fieldset>
      <legend>Values in the parent component:</legend>
      <ul>
        <li>test: <strong>{{ test }}</strong></li>
        <li>count: <strong>{{ count }}</strong></li>
      </ul>
    </fieldset>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { Test } from './components/types'
import TestComponent from './components/TestComponent.vue'

export default defineComponent({
  name: 'app',
  components:  {
   TestComponent,
  },
  setup() {
    const count: Ref<number> = ref(56)
    const test: Ref<Test> = ref({
      a: 'a value',
      b: 555
    })

    setTimeout(() => {
      test.value.a = 'Timeout'
    }, 2000)

    return { count, test }
  }
})

</script>
