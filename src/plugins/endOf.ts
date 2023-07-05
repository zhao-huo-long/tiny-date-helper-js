import type { DateHelperPlugin, DateHelper } from 'tiny-time-js'
import timejs from 'tiny-time-js'

function setTimeEnd(date: Date) {
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)
}

const endOf: DateHelperPlugin = {
  name: 'endOf',
  implement: {
    endOf(this: DateHelper, type: 'month' | 'year' | 'week' | 'day') {
      const date = timejs(this).date
      switch (type) {
        case 'month':
          date.setMonth(date.getMonth() + 1)
          date.setDate(0)
          setTimeEnd(date)
          return timejs(date)
        case 'year':
          date.setMonth(13)
          date.setDate(0)
          setTimeEnd(date)
          return timejs(date)
        case 'week':
          date.setDate(date.getDate() + 7 - date.getDay())
          setTimeEnd(date)
          return timejs(date)
        case 'day':
          setTimeEnd(date)
          return timejs(date)
        default:
          return this
      }
    }
  }
} as const

declare module "tiny-time-js" {
  interface DateHelper {
    endOf(this: DateHelper, type: 'month' | 'year' | 'week' | 'day'): DateHelper
  }
}

export default endOf