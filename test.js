const timejs = require('.')
const isSameDay = require('./dist/plugins/isSameDay')
const endOf = require('./dist/plugins/endOf')
const { deepEqual } = require('assert')

timejs.install(isSameDay)
timejs.install(endOf)

deepEqual(timejs('2022-01-21 12:23:32').str("YYYY-MM-DD hh:mm:ss"), '2022-01-21 12:23:32', '格式化错误')

deepEqual(timejs('1999-01-11').str("YYYY-MM-DD"), '1999-01-11', '格式化错误')

deepEqual(timejs('2022-01-11', 'YYYY-MM-DD').str("YYYY-MM-DD"), '2022-01-11', '解析错误')

deepEqual(timejs('2023-12-01').str("YYYY-MM-DD"), '2023-12-01', '格式化错误')

deepEqual(timejs(1318781876406).str(), '2011-10-17 00:17:56', '格式化错误')

deepEqual(timejs(1318781876406).toNumber(), 1318781876406, 'toNumber')

deepEqual(timejs('2023-12-01').isSameDay('2023-12-01'), true, 'isSameDay')

deepEqual(timejs('2021-12-02').isSameDay(timejs()), false, 'isSameDay')

deepEqual(timejs(1318781876406).isSameDay('2011-10-17'), true, 'isSameDay')

deepEqual(timejs('2011-10-17').isSameDay(1318781876406), true, 'isSameDay')

deepEqual(timejs().isSameDay(timejs()), true, 'isSameDay')

deepEqual(timejs('2022-02-16').endOf('month').dateStr(), '2022-02-28', 'endOf')

deepEqual(timejs('2022-03-16').endOf('year').str(), '2022-12-31 23:59:59', 'endOf')

deepEqual(timejs('2022-06-29').endOf('week').str(), '2022-07-03 23:59:59', 'endOf')

deepEqual(timejs('2022-01-29').endOf('day').str(), '2022-01-29 23:59:59', 'endOf')
