const dateHelper = require('.')
const { deepEqual } = require('assert')

dateHelper.install({})


deepEqual(dateHelper('2022-01-21 12:23:32').str("YYYY-MM-DD hh:mm:ss"), '2022-01-21 12:23:32', '格式化错误')

deepEqual(dateHelper('1999-01-11').str("YYYY-MM-DD"), '1999-01-11', '格式化错误')

deepEqual(dateHelper('2022-01-11', 'YYYY-MM-DD').str("YYYY-MM-DD"), '2022-01-11', '解析错误')

deepEqual(dateHelper('2023-12-01').str("YYYY-MM-DD"), '2023-12-01', '格式化错误')

deepEqual(dateHelper(1318781876406).str(), '2011-10-17 00:17:56', '格式化错误')

deepEqual(dateHelper(1318781876406).toNumber(), 1318781876406, 'toNumber')
