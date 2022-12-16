/**
 * @param time 
 * @param format "y-m-d h:i:s"
 */
export default function getTime(time: number, format: string) {
    if (time <= 0 || !time) return '';
    const date = new Date(time);
    const data = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
    };
    return format.replace(/[a-zA-Z]/g, (...args) => data[args[0]])
}