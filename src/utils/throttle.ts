export default function throttle(f, delay=100) {
    let timerId = null;
    return function(...args) {
        if (timerId) return;
        timerId = setTimeout(() => {
            f(...args);
            timerId = 0;
        }, delay);
    }
}