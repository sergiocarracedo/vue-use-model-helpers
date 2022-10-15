import { isVue2, isVue3, toRef, getCurrentInstance, Ref, ref, watch, UnwrapRef, ToRefs } from 'vue-demi'
import { toRefs } from 'vue'

const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return`update:${model}`
}


//
// export function useLocalModel <T>(model: string): Ref<T> {
//   const vm = getCurrentInstance()
//   if (!vm) {
//     throw new Error('You must use this function within the "setup()" method')
//   }
//
//   const { proxy, props } = vm
//
//   const localModel: Ref<T> = ref(props[model])
//
//
//   watch(localModel, (newValue) => {
//     const event = getEventName(model)
//     proxy && proxy.$emit(event, newValue)
//   })
//
//
//   watch(() => props[model], (newValue: T) => {
//     localModel.value = newValue
//   })
//
//   return localModel
// }

const getLocalName = (model: string): string => {
  return `local${model.toString().charAt(0).toUpperCase()}${model.toString().slice(1)}`
}

export function useLocalModel <T>(props: T, models: (keyof T)[]): Record<string, ToRefs<T>> {
  const vm = getCurrentInstance()
  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }


  const { proxy } = vm

  const localModels = toRefs(props)

  // const localModels: Record<string, ToRef<T[keyof T]>> = Object.fromEntries(models.map((model) => {
  //   return [getLocalName(model), toRef(props, model)]
  // }))

  models.forEach(model => {
    const name = getLocalName(model)

    watch(localModels[name], (newValue) => {
      const event = getEventName(model)
      proxy && proxy.$emit(event, newValue)
    })


    watch(() => props[model], (newValue) => {
      localModels[name].value = newValue
    })
  })



  return localModels

}
