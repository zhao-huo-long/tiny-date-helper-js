import type { DateHelperPlugin, DateHelper } from 'tiny-time-js'
import timejs from 'tiny-time-js'
import add from 'tiny-time-js/dist/plugins/add'
import endOf from 'tiny-time-js/dist/plugins/endOf'
import isSameDay from 'tiny-time-js/dist/plugins/isSameDay'

timejs.install(add)
timejs.install(endOf)
timejs.install(isSameDay)

export interface CalendarItem {
  isToday: boolean,
  isWeekend: boolean,
  util: DateHelper,
  isCurrentMonth: boolean,
  date: number,
  day: number,
  view: string
}

function buildCalendarItem(dateHelper: DateHelper, year: number, month: number): CalendarItem {
  const today = timejs()
  const date = dateHelper.date
  return {
    isToday: today.isSameDay(dateHelper),
    isWeekend: [6, 7].includes(date.getDay()),
    util: dateHelper,
    isCurrentMonth: year === date.getFullYear() && month === date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    view: dateHelper.str(`YYYY-MM-DD`)
  }
}

function weekItems(dateHelper: DateHelper, year: number, month: number) {
  const firstDay = dateHelper.add(1 - timejs.week[dateHelper.date.getDay()], 'day')
  const lastDay = dateHelper.endOf('week')
  return [
    buildCalendarItem(firstDay, year, month),
    ...Array.from({ length: 5 }).map((_, i) => buildCalendarItem(firstDay.add(i + 1, 'day'), year, month)),
    buildCalendarItem(lastDay, year, month),
  ]
}

export interface Calendar {
  year: number,
  month: number,
  weekList: CalendarItem[][]
}

const calendar: DateHelperPlugin = {
  name: 'calender',
  implement: {
    calender: function calender(this: DateHelper, calenderYear?: number, calenderMonth?: number) {
      const year = calenderYear || this.date.getFullYear()
      const month = calenderMonth || this.date.getMonth()
      const firstDay = timejs(`${year}-${month.toString().padStart(2, '0')}-01`, 'YYYY-MM-DD')
      const firstWeek = weekItems(firstDay, year, month)
      const lastWeek = weekItems(firstDay.endOf('month'), year, month)
      let weekNum = Math.ceil((lastWeek[0].util.date.getDate() - firstWeek[firstWeek.length - 1].util.date.getDate() - 1) / 7)
      const weekList = [firstWeek]
      let currentWeek = firstWeek
      while (weekNum) {
        currentWeek = weekItems(currentWeek[currentWeek.length - 1].util.add(1, 'day',), year, month)
        weekList.push(currentWeek)
        weekNum -= 1
      }
      weekList.push(lastWeek)
      return {
        year,
        month,
        weekList
      }
    }
  }
}



declare module "tiny-time-js" {
  interface DateHelper {
    // type: 'month' | 'year' | 'week' | 'day'
    calender(this: DateHelper, calenderYear?: number, calenderMonth?: number): Calendar
  }
}


export default calendar