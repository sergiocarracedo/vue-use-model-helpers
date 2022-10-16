import { isVue2, toRef } from 'vue-demi'
import { getCurrentInstance, Ref, shallowRef, UnwrapRef, watch } from 'vue'

const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return`update:${model}`
}

type ToRef<T> = [T] extends [Ref] ? T : Ref<UnwrapRef<T>>;

export function useLocalModel <T extends object, K extends keyof T>(props: T, key: K): Ref<T[K]> {
  const vm = getCurrentInstance()

  console.log('test')
  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const c = toRef(props, key)
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
