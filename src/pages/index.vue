<script setup lang="ts">
import { DST, getData } from '~/composables/outpu'

const input = ref<string>('')
const output = ref<string>('')
const from = ref<string>('auto')
const to = ref<string>('en')
const active = ref<number>(0)
const debouncedFn = useDebounceFn(async () => {
  output.value = ((await getData(input.value, from.value, to.value)) as any).trans_result?.at(0)?.dst || ''
  // console.log(await getData(input.value))
}, 300)
watch(input, () => {
  output.value = ''
  debouncedFn()
})
function changeIndex(index: number): void {
  active.value = index
  to.value = DST[index].t
  from.value = DST[index].f
  debouncedFn()
}
</script>

<template>
  <div flex justify-center mb-2>
    <button v-for="item, index in DST" :key="index" border rd bg-green p-1 c-white ml-2 hover="bg-yellow/200 c-#111" :class="[index === active ? 'bg-red' : '']" @click="changeIndex(index)">
      {{ item.label }}
    </button>
  </div>
  <div flex="~ " justify-center>
    <textarea id="" v-model="input" w-200 border mr-2 name="" cols="30" rows="10" />
    <textarea id="" v-model="output" w-200 border name="" cols="30" rows="10" disabled />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
textarea {
  border-radius: 20px;
  padding: 10px !important;
}
.dark textarea {
  background: #111;
  color: aliceblue;
}
</style>
