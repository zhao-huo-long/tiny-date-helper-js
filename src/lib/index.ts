import { DEF_FORMAT, dfPlaceholders } from "./constants";
import { LocalDate } from './helper'
import type { Placeholder } from './constants'

export type * from './helper'

interface Matched {
  placeholder: Placeholder
  start: number
  end: number
}
export interface DateHelper extends  DateHelperCls  {

}

class DateHelperCls {

  private date: LocalDate = new Date;
  private placeholders: Placeholder[] = [];

  constructor(initValue?: Date | string | number, format?: string, placeholders: Placeholder[] = []) {
    this.placeholders = [...placeholders, ...dfPlaceholders]
    if (typeof initValue === 'string' && typeof format === 'string') {
      this.date = new LocalDate()
      this.parse(initValue, format)
      return
    }
    if (initValue) {
      this.date = new LocalDate(initValue)
      return
    }
    this.date = new LocalDate()
  }

  public str(format: string = DEF_FORMAT) {
    const formatList = format.split('')
    const results = this.matchFormatStr(format)
    for (const result of results) {
      formatList.splice(result.start, result.end - result.start - 1)
      formatList[result.start] = result.placeholder.getValue(this.date).toString()

    }
    return formatList.join('')
  }

  protected matchFormatStr(format: string) {
    let start = 0;
    const match: Matched[] = []
    while (start < format.length) {
      let find = false
      for (let i = 0; i < this.placeholders.length; i++) {
        const placeholder = this.placeholders[i]
        const result = format.indexOf(placeholder.name, start)
        if (result > -1) {
          find = true
          match.unshift({
            placeholder,
            start: result,
            end: result + placeholder.name.length
          })
          start = result + placeholder.name.length
          break
        }
      }
      if (!find) {
        break
      }
    }
    return match
  }

  protected parse(dateStr: string, format: string = DEF_FORMAT) {
    const results = this.matchFormatStr(format)
    for (const result of results) {
      const regexValue = dateStr.slice(result.start, result.end).match(result.placeholder.regExp)
      if (regexValue) {
        result.placeholder.setValue(this.date, regexValue[0])
      } else {
        console.error(new Error(`${result.placeholder.name} not matches vaild value.`))
      }
    }
  }

  public toDate() {
    return new Date(this.toNumber())
  }

  public toNumber() {
    return this.date.getTime()
  }
}

/**
 * @param initValue 
 * @param format 
 * @returns 
 */
function factory(initValue?: Date | string | number, format?: string, placeholder?: Placeholder[]) {
  const dateHelper = new DateHelperCls(initValue, format, placeholder)
  for (const plugin of factory.pluginList) {
    Object.assign(dateHelper, plugin.implement || {})
  }
  return dateHelper as DateHelper
}

export interface DateHelperPlugin {
  name: string;
  implement: {
    [key: string]: (this: DateHelper, ...args: any[]) => any
  };
}

factory.pluginList = [] as DateHelperPlugin[]

factory.install = function install(plugin?: DateHelperPlugin) {
  if (plugin) {
    if (factory.pluginList.indexOf(plugin) > -1) {
      console.warn(`plugin [${plugin.name}] installed two times`)
    } else {
      const handler: Record<string, (...args: unknown[]) => unknown> = {}
      for (const name in plugin.implement) {
        const fn = plugin.implement[name]
        handler[name] = fn
      }
      factory.pluginList.push(plugin)
    }
  }
}

factory.DateHelperCls = DateHelperCls

export default factory