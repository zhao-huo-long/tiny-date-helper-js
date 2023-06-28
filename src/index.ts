import { DEF_FORMAT, dfPlaceholders } from "./constants";
import type { Placeholder } from './constants'

interface Matched {
  placeholder: Placeholder
  start: number
  end: number
}

/**
 * @param initValue 
 * @param format 
 * @returns 
 */
function timejs(initValue?: Date | string | number | DateHelperCls, format?: string, placeholder?: Placeholder[]) {
  const dateHelperIns = new DateHelperCls(initValue, format, placeholder) as DateHelper
  for (const plugin of timejs.pluginList) {
    Object.assign(dateHelperIns, plugin.implement || {})
  }
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
  }

  export function install(plugin?: DateHelperPlugin) {
    if (plugin) {
      if (timejs.pluginList.indexOf(plugin) > -1) {
        console.warn(`plugin [${plugin.name}] installed two times`)
      } else {
        const handler: Record<string, (...args: unknown[]) => unknown> = {}
        for (const name in plugin.implement) {
          const fn = plugin.implement[name]
          handler[name] = fn
        }
        timejs.pluginList.push(plugin)
      }
    }
  }
}

class DateHelperCls {

  private date: timejs.LocalDate = new timejs.LocalDate();
  private placeholders: Placeholder[] = [];

  constructor(initValue?: Date | string | number | DateHelperCls, format?: string, placeholders: Placeholder[] = []) {
    this.placeholders = [...placeholders, ...dfPlaceholders]
    if (typeof initValue === 'string' && typeof format === 'string') {
      this.date = new timejs.LocalDate()
      this.parse(initValue, format)
      return
    }
    if(initValue instanceof DateHelperCls){
      this.date = new timejs.LocalDate(initValue.toDate())
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

  private matchFormatStr(format: string) {
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

export interface DateHelper extends DateHelperCls{

}

export interface DateHelperPlugin {
  name: string;
  implement: {
    [key: string]: (this: DateHelper, ...args: any[]) => any
  };
}


export default timejs