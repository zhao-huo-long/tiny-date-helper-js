"use strict";
class LocalDate extends globalThis.Date {
    getMonth() {
        return super.getMonth.apply(this) + 1;
    }
    setMonth(value) {
        super.setMonth.apply(this, [value - 1]);
        return value - 1;
    }
}
const placeholders = [
    {
        name: 'yyyy',
        rExp: /^\d{4}$/,
        getValue(date) {
            return date.getFullYear().toString().padStart(4, '0');
        },
        setValue(date, value) {
            console.log(date, parseInt(value));
            return date.setFullYear(parseInt(value));
        }
    },
    {
        name: 'mm',
        rExp: /^\d{4}$/,
        getValue(date) {
            return date.getMonth().toString().padStart(2, '0');
        },
        setValue(date, value) {
            return date.setMonth(parseInt(value));
        }
    },
];
class MinDate {
    constructor(initValue, format) {
        this.date = new Date;
        if (typeof initValue === 'string' && typeof format === 'string') {
            this.date = new LocalDate();
            this.parse(initValue, format);
            return;
        }
        if (typeof initValue === 'string' && typeof format !== 'string') {
            this.date = new LocalDate(initValue);
            return;
        }
        if (initValue instanceof Date) {
            this.date = new LocalDate(initValue);
            return;
        }
        this.date = new LocalDate();
    }
    str(format) {
        const formatList = format.split('');
        const results = this.matchFormatStr(format);
        for (const result of results) {
            formatList.splice(result.start, result.end - result.start - 1);
            formatList[result.start] = result.placeholder.getValue(this.date).toString();
        }
        return formatList.join('');
    }
    matchFormatStr(format) {
        let start = 0;
        const match = [];
        while (start < format.length) {
            let find = false;
            for (let i = 0; i < placeholders.length; i++) {
                const placeholder = placeholders[i];
                const result = format.indexOf(placeholder.name, start);
                if (result > -1) {
                    find = true;
                    match.unshift({
                        placeholder,
                        start: result,
                        end: result + placeholder.name.length
                    });
                    start = result + placeholder.name.length;
                    break;
                }
            }
            if (!find) {
                break;
            }
        }
        return match;
    }
    parse(dateStr, format) {
        const results = this.matchFormatStr(format);
        for (const result of results) {
            const regxValue = dateStr.slice(result.start, result.end).match(result.placeholder.rExp);
            if (regxValue) {
                result.placeholder.setValue(this.date, regxValue[0]);
            }
            else {
            }
        }
    }
}
