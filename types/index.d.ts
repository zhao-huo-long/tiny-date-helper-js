declare class LocalDate extends globalThis.Date {
    getMonth(): number;
    setMonth(value: number): number;
}
interface Placeholder {
    name: string;
    rExp: string | RegExp;
    setValue: (date: LocalDate, value: string) => unknown;
    getValue: (date: LocalDate) => string | number;
}
declare const placeholders: Placeholder[];
interface Matched {
    placeholder: Placeholder;
    start: number;
    end: number;
}
declare class MinDate {
    protected date: LocalDate;
    constructor(initValue?: Date | string, format?: string);
    str(format: string): string;
    protected matchFormatStr(format: string): Matched[];
    parse(dateStr: string, format: string): void;
}
