export default function debounce(f, delay=60) {
    let timerId = null;
    return function(...args) {
        // if (!timerId) {
        //     f(...args);
        //     timerId = setTimeout(() => {});;
        //     return;
        // }
        clearTimeout(timerId);
        timerId = setTimeout(f, delay, args);
    }
}