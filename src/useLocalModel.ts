import { getCurrentInstance, Ref, ref, watch } from 'vue'

export function useLocalModel (models: string[]): Record<string, Ref> {
  const vm = getCurrentInstance()
  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const { proxy, props } = vm

  const localModels: Record<string, Ref> = {}

  models.forEach((model: string) => {
    const name = `local${model.charAt(0).toUpperCase()}${model.slice(1)}`
    localModels[name] = ref(props[model])

    watch(localModels[name], (newValue) => {
      proxy.$emit(`update:${model}`, newValue)
    })

    watch(() => props[model], (newValue) => {
      localModels[name].value = newValue
    })
  })

  return {
    ...localModels
  }
}
