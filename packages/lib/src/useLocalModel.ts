import { isVue2 } from 'vue-demi'
import { getCurrentInstance, ref, Ref, watch } from 'vue'

const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return`update:${model}`
}

const getLocalModelName = <T>(modelName: keyof T): keyof T => {
 return `local${modelName.toString().charAt(0).toUpperCase()}${modelName.toString().slice(1)}` as keyof T
}

type LocalModels<T, K extends keyof T> = {
  [P in K as `local${Capitalize<string & K>}`]: Ref<T[P]>
}

export function useLocalModel <T extends object, M extends (keyof T)[]>(props: T, models: M): LocalModels<T, M[number]> {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const { proxy } = vm
  const localModels: LocalModels<T, typeof models[number]> = {
    ...Object.fromEntries(models.map(model => [getLocalModelName(model), ref(props[model])]))
  } as LocalModels<T, typeof models[number]>

  models.forEach((model) => {
    const name = getLocalModelName(model)
    watch(localModels[name], (newValue) => {
      console.log('aasdfsdf', newValue)
      proxy && proxy.$emit(getEventName(model.toString()), newValue)
    }, { deep: true })

    watch(() => props[model], (newValue) => {
      localModels[name].value = newValue
    }, { deep: true })
  })

  return localModels
}
