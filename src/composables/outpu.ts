import jquery from 'jquery'
import { MD5 } from '~/composables/MD5'
export const DST = [
  {
    label: '中简/英',
    f: 'zh',
    t: 'en',
  }, {
    label: '英/中简',
    f: 'en',
    t: 'zn',
  },
  {
    label: '中简/中繁',
    f: 'zh',
    t: 'cht',
  },
  {
    label: '中繁/中简',
    f: 'cht',
    t: 'zh',
  },
  {
    label: '英/中繁',
    f: 'en',
    t: 'cht',
  },
  {
    label: '中繁/英',
    f: 'cht',
    t: 'en',
  },
]
export function getData(input: string, from = 'zh', to = 'en'): Promise<string> | undefined {
  if (input === '')
    return
  const appid = '20220714001272917'
  const key = '8opPuZm3M9Cle5IufRIc'
  const salt = (new Date()).getTime()
  const str1 = appid + input + salt + key
  const sign = MD5(str1)
  return new Promise<string>((resolve, reject) => {
    jquery.ajax({
      url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'jsonp',
      data: {
        q: input,
        appid,
        salt,
        from,
        to,
        sign,
      },
      success(data: any) {
        if (data.error_code) {
          reject(data)
          return
        }
        resolve(data)
      },
      error(err: any) {
        reject(err)
      },
    })
  })
}

