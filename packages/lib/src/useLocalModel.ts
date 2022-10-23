import { isVue2 } from 'vue-demi'
import { getCurrentInstance, Ref, shallowRef, watch } from 'vue'

const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return`update:${model}`
}

export function useLocalModel <T extends object, K extends keyof T>(props: T, key: K): Ref<T[K]> {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const { proxy } = vm
  const local: Ref<T[K]> = shallowRef(props[key])

  watch(local, (newValue) => {
    const event = getEventName(key.toString())
    proxy && proxy.$emit(event, newValue)
  }, { deep: true })


  watch(() => props[key], (newValue) => {
    local.value = newValue
  })

  return local
}
