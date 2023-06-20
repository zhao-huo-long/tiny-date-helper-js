
import type { DateHelperPlugin, DateHelper } from 'tiny-date-helper-js'
import factory from 'tiny-date-helper-js'
factory.DateHelperCls

const add: DateHelperPlugin = {
  name: 'add',
  implement: {
    add(this: DateHelper, value: number) {
      const date = this.toDate()
      date.setDate(date.getDate() + value)
      return factory(date)
    }
  }
}



declare module "tiny-date-helper-js" {
  interface DateHelper {
    add(this: DateHelper, value: number, type: 'minute' | 'day'): void
  }
}


export default add