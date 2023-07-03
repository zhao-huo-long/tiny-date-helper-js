import { DEF_FORMAT, dfPlaceholders } from "./constants";
import type { Placeholder } from './constants'

interface Matched {
  placeholder: Placeholder
  start: number
  end: number
}

const definePropertiesConfig = {
  date: {
    enumerable: false
  },
}

/**
 * @param initValue 
 * @param format 
 * @returns 
 */
function timejs(initValue?: Date | string | number | DateHelperCls, format?: string) {
  const dateHelperIns = new DateHelperCls(initValue, format) as DateHelper
  for (const plugin of timejs.pluginList) {
    Object.assign(dateHelperIns, plugin.implement || {})
  }
  Object.defineProperties(dateHelperIns, definePropertiesConfig)
  return dateHelperIns
}


namespace timejs {
  export const pluginList: DateHelperPlugin[] = []

  export class LocalDate extends globalThis.Date {
    getMonth() {
      return super.getMonth.apply(this) + 1
    }
    setMonth(value: number) {
      return super.setMonth.apply(this, [value - 1])
    }
    /**
     * [1 - 7] => [星期1 - 星期天 更适合cn宝宝]
     * @returns 
     */
    getDay(): number {
      const d = super.getDay.apply(this)
      return [7, 1, 2, 3, 4, 5, 6][d]
    }
  }

  export function install(plugin?: DateHelperPlugin) {
    if (plugin) {
      if (timejs.pluginList.indexOf(plugin) > -1) {
        console.warn(`plugin [${plugin.name}] installed two times`)
      } else {
        const config: Record<string, any> = {}
        for (const name in plugin.implement) {
          const fn = plugin.implement[name]
          config[name] = {
            value: fn,
            enumerable: false
          }
        }
        Object.assign(DateHelperCls.prototype, config)
        timejs.pluginList.push(plugin)
      }
    }
  }

  export function extendPlaceholders(placeholders: Placeholder[] = []) {
    DateHelperCls.placeholders = [...placeholders, ...dfPlaceholders]
  }
}

class DateHelperCls {

  public date: timejs.LocalDate = new timejs.LocalDate();
  static placeholders: Placeholder[] = [...dfPlaceholders];

  constructor(initValue?: Date | string | number | DateHelperCls, format?: string,) {
    if (typeof initValue === 'string' && typeof format === 'string') {
      this.date = new timejs.LocalDate()
      this.parse(initValue, format)
      return
    }
    if (initValue instanceof DateHelperCls) {
      this.date = new timejs.LocalDate(initValue.toNumber())
      return
    }
    if (initValue) {
      this.date = new timejs.LocalDate(initValue)
      return
    }
    this.date = new timejs.LocalDate()
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
    const placeholders = DateHelperCls.placeholders
    const match: Matched[] = []
    for (let i = 0; i < placeholders.length; i++) {
      const placeholder = placeholders[i]
      const results = format.matchAll(new RegExp(placeholder.name, 'g'),)
      if (results) {
        for (const result of results) {
          match.unshift({
            placeholder,
            start: result.index!,
            end: result.index! + result[0].length
          })
        }
      }
    }
    return match.sort((a, b) => b.start - a.start)
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

  public dateStr() {
    return this.str('YYYY-MM-DD')
  }

  /**
   * 格林威治时间戳
   * @returns 
   */
  public toNumber() {
    return this.date.getTime()
  }
}

export interface DateHelper extends DateHelperCls {

}

export interface DateHelperPlugin {
  name: string;
  implement: {
    [key: string]: (this: DateHelper, ...args: any[]) => any
  };
}


export default timejs