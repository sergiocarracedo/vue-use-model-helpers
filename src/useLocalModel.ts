import { getCurrentInstance, isVue2, Ref, toRef, UnwrapRef, watch } from 'vue-demi'

const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return`update:${model}`
}


type ToRef<T> = [T] extends [Ref] ? T : Ref<UnwrapRef<T>>;

export function useLocalModel <T extends object, K extends keyof T>(props: T, key: K): ToRef<T[K]> {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const { proxy } = vm

  const local = toRef(props, key)

  watch(local, (newValue) => {
    const event = getEventName(key.toString())
    proxy && proxy.$emit(event, newValue)
  })


  watch(() => props[key], (newValue) => {
    local.value = newValue
  })

  return local
}
