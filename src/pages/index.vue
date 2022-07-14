<script setup lang="ts">
import jquery from 'jquery'
import { MD5 } from '~/composables/MD5'
function post() {
  const appid = '20220714001272917'
  const key = '8opPuZm3M9Cle5IufRIc'
  const salt = (new Date()).getTime()
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = 'en'
  const to = 'zh'
  const str1 = appid + input.value + salt + key
  const sign = MD5(str1)
  jquery.ajax({
    url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
    type: 'get',
    dataType: 'jsonp',
    data: {
      q: input.value,
      appid,
      salt,
      from,
      to,
      sign,
    },
    success(data) {
      console.log(data)
    },
  })
}
const debouncedFn = useDebounceFn(post, 300)
const input = ref<string>('')
const output = ref<string>('')
watch(input, () => {
  console.log(123)

  debouncedFn()
})
</script>

<template>
  <div flex="~">
    <textarea id="" v-model="input" flex="1" border mr-2 name="" cols="30" rows="10" />
    <textarea id="" v-model="output" flex="1" border name="" cols="30" rows="10" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
