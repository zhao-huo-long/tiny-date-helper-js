import type { DateHelperPlugin, DateHelper } from 'tiny-time-js'
import timejs from 'tiny-time-js'


const add: DateHelperPlugin = {
  name: 'add',
  implement: {
    add: function add(this: DateHelper, value: number, type: 'day' | 'hour') {
      const result = timejs(this)
      switch (type) {
        case 'day':
          result.date.setDate(this.date.getDate() + value)
          return result
        case 'hour':
          result.date.setHours(this.date.getHours() + value)
          return result
        default:
          return result
      }
    }
  }
}

declare module "tiny-time-js" {
  interface DateHelper {
    // type: 'month' | 'year' | 'week' | 'day'
    add(this: DateHelper, value: number, type: 'day'): DateHelper
  }
}

export default add