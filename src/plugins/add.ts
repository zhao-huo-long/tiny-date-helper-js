import type { DateHelperPlugin, LocalDate } from 'tiny-date-helper-js'
import factory from 'tiny-date-helper-js'



const add: DateHelperPlugin = {
  name: 'add',
  implement: {
    addDay(this: LocalDate, value: number) {
      this.setDate(this.getDate() + value)
      return factory(this)
    }
  }
}

declare module "tiny-date-helper-js" {
  interface DateHelper {
    add(this: LocalDate, value: number, type: 'minute' | 'day'): void
  }
}


export default add