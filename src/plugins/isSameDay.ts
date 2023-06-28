import type { DateHelperPlugin, DateHelper } from 'tiny-date-helper-js'
import dateHelper from 'tiny-date-helper-js'

const isToday: DateHelperPlugin = {
  name: 'isSameDay',
  implement: {
    isSameDay(this: DateHelper, value: number | string | Date | DateHelper) {
      if(!value){
        return true
      }
      return this.str("YYYY-MM-DD") === dateHelper(value).str("YYYY-MM-DD") 
    } 
  }
} as const

declare module "tiny-date-helper-js" {
  interface DateHelper {
    isSameDay(this: DateHelper, value: number | string | Date | DateHelper): void
  }
}


export default isToday