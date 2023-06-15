import type { DateHelperPlugin } from "tiny-date-helper-js"

declare module 'tiny-date-helper-js' {
  
}

const add: DateHelperPlugin = {
  name: 'add',
  implement: {
    add(d) {
      return 0
    }
  }
}

export default add