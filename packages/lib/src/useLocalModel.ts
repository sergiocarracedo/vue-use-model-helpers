import { isVue2 } from 'vue-demi'
import { getCurrentInstance, Ref, watch } from 'vue'

type PrefixAll<T, P extends string>  = {
  [K in keyof T & string as `${P}${K}`]: T[K]
}

function prefixProperties<T, P extends string>(obj: T, prefix: P): PrefixAll<T, P> {
  let out = {} as Record<string, unknown>;
  for (let propt in obj) {
    out[prefix + propt] = obj[propt];
  }
  return out as PrefixAll<T, P>;
}

let x : { num: number, date: Date } = { num: 1, date: new Date()}
let y = prefixProperties(x, 'old');

y.olddate


const getEventName = (model: string): string => {
  if (isVue2 && model === 'value') {
    return 'input'
  }
  return `update:${model}`
}

const getLocalModelName = <T>(modelName: keyof T): keyof T => {
  return modelName
 //return `local${modelName.toString().charAt(0).toUpperCase()}${modelName.toString().slice(1)}` as keyof T
}

type LocalModels<T, K extends keyof T> = {
  //[P in K]: Ref<T[P]>
  [P in K as `local${Capitalize<string & K>}` extends keyof T: K[P] : P]: Ref<T[K]>
}

const p = {
  test1: 'aa',
  test2: 123,
  test3: 'cc'
}

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;
export type Expect<T extends true> = T

const m = ['test1', 'test2'] as const
type y = typeof m[number]

type l = Expect<Equals<y, 'test1' | 'test2'>>



type x = LocalModels<typeof p, 'test1' | 'test2'>

const z = useLocalModel(p, ['test1'])

export function useLocalModel <Props extends object, Model extends keyof Props>(props: Props, models: Model[]):  LocalModels<Props, Model> {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('You must use this function within the "setup()" method')
  }

  const { proxy } = vm
  const localModels: any = {
    //...Object.fromEntries(models.map(model => [getLocalModelName<Props>(model), ref(props[model])]))
  } as unknown as LocalModels<Props, Model>

  models.forEach((model) => {
    const name = getLocalModelName(model.toString())
    watch(localModels[name.toString()], (newValue) => {
      console.log('aasdfsdf', newValue)
      proxy && proxy.$emit(getEventName(model.toString()), newValue)
    }, { deep: true })

    watch(() => props[model], (newValue) => {
      console.log('props', newValue)
      localModels[name].value = newValue
    }, { deep: true })
  })

  return localModels
}
