const dateHelper = require('.')
const { deepEqual } = require('assert')


deepEqual(dateHelper('2022-01-21').str("yyyy-mm-dd"), '2022-01-21', '格式化错误')

deepEqual(dateHelper('1999-01-11').str("yyyy-mm-dd"), '1999-01-11', '格式化错误')

deepEqual(dateHelper('2022-01-11', 'yyyy-mm-dd').str("yyyy-mm-dd"), '2022-01-11', '解析错误')

deepEqual(dateHelper('2023-12-01', 'yyyy-mm-dd').str("yyyy-mm-dd"), '2023-12-01', '解析错误')

