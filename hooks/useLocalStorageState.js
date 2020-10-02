import React, { useEffect, useState } from 'react';

function useLocalStorageState(key, defaultVa1ue) {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(window.localStorage.getItem(key) || String(defaultVa1ue))
        }
        catch (e) {
            value = defaultVa1ue;
        }
        return value;
    })
    useEffect(
        () => {
            window.localStorage.setItem(key, state);
        }, [state]);
    return [state, setState];
}
export default function Counter() {
    const [count, setcount] = useLocalStorageState("my-app-count", 0)
    return (
        <div>
            <button onClick={() => setcount(count + 1)} >{count}</button>
        </div>
    )
}