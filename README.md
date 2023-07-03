# tiny-time-js
时间日期处理工具库 🕰️, 提供了日期和时间操作函数，如格式化日期、计算日期、格式解析等功能

#### 安装
```shell
npm i tiny-time-js
```

#### 格式化输出
```typescript
import timejs from 'tiny-date-js'

timejs().str() // '2023-07-03 12:00:00'

timejs().str(`YYYY-MM-DD hh:mm:ss`) // '2023-07-03 12:00:00'

timejs().str(`YYYY-MM-DD`) // '2023-07-03'

timejs().str(`hh:mm:ss`) // '12:00:00'
```
#### 时间日期字符串解析
```typescript
import timejs from 'tiny-date-js'

timejs('2023-07-03 12:00:00')

timejs('2020-02-01', 'YYYY-MM-DD')

timejs('2020/02/01', 'YYYY/MM/DD')

timejs('2020-02/01', 'YYYY-MM/DD')
```

#### 判断是否同一天 - isSameDay
```typescript
import timejs from 'tiny-date-js'
import isSameDay from 'tiny-date-js/esm/plugins/isSameDay'

timejs.install(isSameDay)

timejs('2023-07-03 12:00:00').isSameDay(timejs('2023-07-03 23:00:00')) // true

// 判断是否为今天
timejs().isSameDay(timejs('2021-07-03 12:00:00')) // false
```


#### 最后时刻 - endOf
```typescript
import timejs from 'tiny-date-js'
import endOf from 'tiny-date-js/esm/plugins/endOf'

timejs.install(endOf)

// 2023年的最后一天  - 2023-12-31 23:59:59
timejs('2023-07-03 12:00:00').endOf('year')

// 2023年7月的最后一天 - 2023-07-31 23:59:59
timejs('2023-07-03 12:00:00').endOf('month')

// 2023-07-03该周的最后一天(星期天) - 2023-07-09 23:59:59
timejs('2023-07-03 12:00:00').endOf('week')

// 2023-07-03该天的最后时刻 - 2023-07-03 23:59:59
timejs('2023-07-03 12:00:00').endOf('day')
```


#### 占位符列表

| 占位符 | 描述 | 范围         |
| ------ | ---- | ------------ |
| `YYYY`   | 年   | 4位，不足补0 |
| `MM`     | 月   | 2位，不足补0 |
| `DD`     | 日   | 2位，不足补0 |
| `hh`     | 时   | 2位，不足补0 |
| `mm`     | 分   | 2位，不足补0 |
| `ss`     | 秒   | 2位，不足补0 |
