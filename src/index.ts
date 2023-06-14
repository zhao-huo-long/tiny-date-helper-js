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
  rExp: string | RegExp;
  setValue: (date: LocalDate, value: string) => unknown
  getValue: (date: LocalDate) => string | number
}

const placeholders: Placeholder[] = [
  {
    name: 'yyyy',
    rExp: /^\d{4}$/,
    getValue(date) {
      return date.getFullYear().toString().padStart(4, '0')
    },
    setValue(date, value) {
      console.log(date, parseInt(value))
      return date.setFullYear(parseInt(value))
    }
  },
  {
    name: 'mm',
    rExp: /^\d{4}$/,
    getValue(date) {
      return date.getMonth().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setMonth(parseInt(value))
    }
  },
]

interface Matched {
  placeholder: Placeholder
  start: number
  end: number
}

class MinDate {
  protected date: LocalDate = new Date;
  constructor(initValue?: Date | string, format?: string) {
    if (typeof initValue === 'string' && typeof format === 'string') {
      this.date = new LocalDate()
      this.parse(initValue, format)
      return
    }
    if (typeof initValue === 'string' && typeof format !== 'string') {
      this.date = new LocalDate(initValue)
      return
    }
    if (initValue instanceof Date) {
      this.date = new LocalDate(initValue)
      return
    }
    this.date = new LocalDate()
  }
  str(format: string) {
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
      for (let i = 0; i < placeholders.length; i++) {
        const placeholder = placeholders[i]
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

  parse(dateStr: string, format: string) {
    const results = this.matchFormatStr(format)
    for (const result of results) {
      const regxValue = dateStr.slice(result.start, result.end).match(result.placeholder.rExp)
      if (regxValue) {
        result.placeholder.setValue(this.date, regxValue[0])
      } else {
        
      }
    }
  }
}

console.log(new MinDate('2023sss06', 'yyyysssmm').str("yyyysssmm"))
