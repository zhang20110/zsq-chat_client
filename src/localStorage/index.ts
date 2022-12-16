export const setItem = (key: string, data: string) => {
    const item = getItem(key).filter(v => v !== data);
    localStorage.setItem(key, JSON.stringify([
        data,
        ...item,
    ]))
}
export const getItem = (key: string) => {
    let str = localStorage.getItem(key);
    let item = [];
    if (str) item = JSON.parse(str);
    return item;
}