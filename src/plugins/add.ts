import type { DateHelperPlugin, DateHelperCls } from 'tiny-date-helper-js'
import dateHelper from 'tiny-date-helper-js'

const add: DateHelperPlugin = {
  name: 'add',
  implement: {
    add(this: DateHelperCls, value: number) {
      const date = this.toDate()
      date.setDate(date.getDate() + value)
      return dateHelper(date)
    }
  }
}

declare module "tiny-date-helper-js" {
  interface DateHelperCls {
    add(this: DateHelperCls, value: number, type: 'minute' | 'day'): void
  }
}


export default add