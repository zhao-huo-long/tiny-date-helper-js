import dateHelper, { Matched } from "./index";


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


export const commonMatch: Record<string, Matched[]> = {
  'YYYY-MM': [
    {
      placeholder: dfPlaceholders[1],
      start: 5,
      end: 7
    },
    {
      placeholder: dfPlaceholders[0],
      start: 0,
      end: 4
    }
  ],
  'YYYY-MM-DD': [
    {
      placeholder: dfPlaceholders[2],
      start: 8,
      end: 10
    },
    {
      placeholder: dfPlaceholders[1],
      start: 5,
      end: 7
    },
    {
      placeholder: dfPlaceholders[0],
      start: 0,
      end: 4
    }
  ],
  'YYYY-MM-DD hh:mm:ss':
    [
      {
        placeholder: dfPlaceholders[5],
        start: 17,
        end: 19
      },
      {
        placeholder: dfPlaceholders[4],
        start: 14,
        end: 16
      },
      {
        placeholder: dfPlaceholders[3],
        start: 11,
        end: 13
      },
      {
        placeholder: dfPlaceholders[2],
        start: 8,
        end: 10
      },
      {
        placeholder: dfPlaceholders[1],
        start: 5,
        end: 7
      },
      {
        placeholder: dfPlaceholders[0],
        start: 0,
        end: 4
      }
    ],
  'hh:mm:ss': [
    {
      placeholder: dfPlaceholders[5],
      start: 6,
      end: 8
    },
    {
      placeholder: dfPlaceholders[4],
      start: 3,
      end: 5
    },
    {
      placeholder: dfPlaceholders[3],
      start: 0,
      end: 2
    }
  ],
  'hh:mm': [{
    placeholder: dfPlaceholders[4],
    start: 3,
    end: 5
  },
  {
    placeholder: dfPlaceholders[3],
    start: 0,
    end: 2
  }],
} 