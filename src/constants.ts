import dateHelper from "./index";


export const DEF_FORMAT = `YYYY-MM-DD hh:mm:ss`


export interface Placeholder {
  name: string;
  regExp: string | RegExp;
  setValue: (date: dateHelper.LocalDate, value: string) => unknown
  getValue: (date: dateHelper.LocalDate) => string | number
}

export const dfPlaceholders: Placeholder[] = [
  {
    name: 'YYYY',
    regExp: /^\d{4}$/,
    getValue(date) {
      return date.getFullYear().toString().padStart(4, '0')
    },
    setValue(date, value) {
      return date.setFullYear(parseInt(value))
    }
  },
  {
    name: 'MM',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getMonth().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setMonth(parseInt(value))
    }
  },
  {
    name: 'DD',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getDate().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setDate(parseInt(value))
    }
  },
  {
    name: 'hh',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getHours().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setHours(parseInt(value))
    }
  },
  {
    name: 'mm',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getMinutes().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setMinutes(parseInt(value))
    }
  },
  {
    name: 'sss',
    regExp: /^\d{2}\.\d$/,
    getValue(date) {
      return `${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toFixed(1)}`
    },
    setValue(date, value) {
      return date.setMilliseconds(parseInt(value))
    }
  },
  {
    name: 'ss',
    regExp: /^\d{2}$/,
    getValue(date) {
      return date.getSeconds().toString().padStart(2, '0')
    },
    setValue(date, value) {
      return date.setSeconds(parseInt(value))
    }
  },

]