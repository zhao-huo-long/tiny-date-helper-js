import type { DateHelperPlugin } from 'tiny-date-helper-js';
declare const add: DateHelperPlugin;
declare module "tiny-date-helper-js" {
    interface DateHelper {
        add(this: DateHelper, value: number, type: 'minute' | 'day'): void;
    }
}
export default add;
