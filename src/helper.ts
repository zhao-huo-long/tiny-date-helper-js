export class LocalDate extends globalThis.Date {
  getMonth() {
    return super.getMonth.apply(this) + 1
  }
  setMonth(value: number) {
    super.setMonth.apply(this, [value - 1])
    return value - 1
  }
}