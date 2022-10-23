# Vue use model helpers 4

This library provides a helper to convert a component's property to a local Ref you can mutate when you are using composition-api, simplifying  the management of the custom `v-model` and `.sync`

This library works with Vue 2.7+ and Vue 3

## Motivation

When you create a component that gets a property and then needs to mutate it into the component you get this vue warn

`[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component`

You need to copy the property value to a local value to use in the component,

Also should update your local value when the property value changes

If the property is a `v-model` or uses `.sync` you also must take care of emitting an event when your local value changes to keep updated the property value in the parent component.

The motivation of this library is simplifying this task and reducing the amount of repetitive code.

## Requeriments
Vue 2.7+ or 3.x
If you need support for vue 2.5+ and composition Api, please use the `2.x` version

## Improvements in 4.x
* The library return just one property at time in order of be able to infer prop type
* Same code runs in vue 2.7 and 3.x


## Getting started

### Install
`npm i vue-use-model-helper@4 --save`
or
`yarn add vue-use-model-helper@4`

### Usage
In your component:

```ts
import { useLocalModel } from 'vue-use-model-helpers'

export default defineComponent({
  ...
  props: {
    value: String
  } ,
  setup(props) {
    
    const localValue = useLocalModel(props, 'value')
  
    return {
      localValue  
    }
  }
  ...
})
```

Now you can use `localValue` in your component, and the helper takes care of sync the values, emit the update event, etc

The component can work with both `value` and `.sync` emitting the correct event to keep the property updated

## Examples

```ts
<template>
  <div>
    {{ localCounter }}
    <button @click="increaseCounter"></button>
  </div>
</template>
import { useLocalModel } from 'vue-use-model-helpers'

export default defineComponent({
  ...
  props: {
    value: String,
    counter: Number // This propery has .sync in the parent component  
  }  ,
  setup(props) {
    const localValue = useLocalModel(props, 'value')
    const localCounter = useLocalModel(props, 'counter')
  
    const increaseCounter = () => {
        localCounter.value = localCounter.value + 1
    }
  
    return {
      localValue,
      localCounter,
      increaseCounter
    }
  }
  ...
})
```

Proudly created in Vigo and around its [local community](https://vigotech.org)