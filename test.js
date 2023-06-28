const timejs = require('.')
const isSameDay = require('./dist/plugins/isSameDay')
const { deepEqual } = require('assert')

timejs.install(isSameDay)

deepEqual(timejs('2022-01-21 12:23:32').str("YYYY-MM-DD hh:mm:ss"), '2022-01-21 12:23:32', '格式化错误')

deepEqual(timejs('1999-01-11').str("YYYY-MM-DD"), '1999-01-11', '格式化错误')

deepEqual(timejs('2022-01-11', 'YYYY-MM-DD').str("YYYY-MM-DD"), '2022-01-11', '解析错误')

deepEqual(timejs('2023-12-01').str("YYYY-MM-DD"), '2023-12-01', '格式化错误')

deepEqual(timejs(1318781876406).str(), '2011-10-17 00:17:56', '格式化错误')

deepEqual(timejs(1318781876406).toNumber(), 1318781876406, 'toNumber')

deepEqual(timejs('2023-12-01').isSameDay('2023-12-01'), true, '格式化错误')

deepEqual(timejs('2023-12-02').isSameDay('2023-12-01'), false, '格式化错误')

deepEqual(timejs(1318781876406).isSameDay('2011-10-17'), true, '格式化错误')

deepEqual(timejs('2011-10-17').isSameDay(1318781876406), true, '格式化错误')

deepEqual(timejs().isSameDay(timejs()), true, '格式化错误')