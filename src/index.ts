class LocalDate extends globalThis.Date {
  getMonth() {
    return super.getMonth.apply(this) + 1
  }
  setMonth(value: number) {
    super.setMonth.apply(this, [value - 1])
    return value - 1
  }
}

interface Placeholder {
  name: string;
  regExp: string | RegExp;
  setValue: (date: LocalDate, value: string) => unknown
  getValue: (date: LocalDate) => string | number
}

const dfPlaceholders: Placeholder[] = [
  {
    name: 'yyyy',
    regExp: /^\d{4}$/,
    getValue(date) {
      return date.getFullYear().toString().padStart(4, '0')
    },
    setValue(date, value) {
      return date.setFullYear(parseInt(value))
    }
  },
  {
    name: 'mm',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getMonth().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setMonth(parseInt(value))
    }
  },
  {
    name: 'dd',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getDate().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setDate(parseInt(value))
    }
  },
]

interface Matched {
  placeholder: Placeholder
  start: number
  end: number
}

class DateHelper {
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

  public str(format: string) {
    const formatList = format.split('')
    const results = this.matchFormatStr(format)
    for (const result of results) {
      formatList.splice(result.start, result.end - result.start - 1,)
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

  public parse(dateStr: string, format: string) {
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

interface Factory {
  (initValue?: Date | string | number, format?: string): DateHelper
  pluginList: DateHelperPlugin[]
  install: (plugin?: DateHelperPlugin) => void
}

/**
 * @param initValue 
 * @param format 
 * @returns 
 */
const factory: Factory = function (initValue?: Date | string | number, format?: string, placeholder?: Placeholder[]) {
  const dateHelper = new DateHelper(initValue, format, placeholder)
  for (const plugin of factory.pluginList) {
    Object.assign(dateHelper, plugin.implement || {})
  }
  return dateHelper
}

interface DateHelperPlugin {
  name: string;
  implement: {
    [key: string]: (date: LocalDate, ...args: any[]) => unknown
  };
}

factory.pluginList = []

factory.install = function (plugin?: DateHelperPlugin) {
  if (plugin) {
    if (factory.pluginList.indexOf(plugin) > -1) {
      console.warn(`plugin [${plugin.name}] installed two times`)
    } else {
      factory.pluginList.push(plugin)
    }
  }
}

export default factory