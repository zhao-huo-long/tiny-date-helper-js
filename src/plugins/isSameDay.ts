import type { DateHelperPlugin, DateHelper } from 'tiny-time-js'
import timejs from 'tiny-time-js'

const isToday: DateHelperPlugin = {
  name: 'isSameDay',
  implement: {
    isSameDay(this: DateHelper, value: number | string | Date | DateHelper) {
      if(!value){
        return true
      }
      return this.str("YYYY-MM-DD") === timejs(value).str("YYYY-MM-DD") 
    }
  }
} as const

declare module "tiny-time-js" {
  interface DateHelper {
    isSameDay(this: DateHelper, value: number | string | Date | DateHelper): void
  }
}


export default isToday