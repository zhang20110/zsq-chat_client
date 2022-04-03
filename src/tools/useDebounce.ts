import { useCallback, useRef } from "react";

export default function useDebounce(callback, delay) {
    const refTimer = useRef(null);
    const f = useCallback(function(...args){
        console.log(refTimer.current, 'id', args[0].target.value);
        
        clearTimeout(refTimer.current);
        refTimer.current = setTimeout(callback.bind(this), delay, ...args);
    }, []);
    return f;
}