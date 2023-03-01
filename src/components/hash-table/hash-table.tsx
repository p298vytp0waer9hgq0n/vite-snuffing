import { useState } from "react";

export default function HashTable () {
    const arr = [2, 71, 7, 15, 32, 32];
    const target = 39;
    const [result, setResult] = useState<Array<number | undefined>>([]);

    function twoSum () {
        const hash = new Map<number, number>();
        for (const i in arr) {
            if (hash.has(arr[i])) {
                setResult([parseInt(i), hash.get(arr[i])]);
                return;
            }
            hash.set(target - arr[i], parseInt(i));
        }
    }

    return (
        <>
            <button onClick={twoSum}>Calculate</button>
            {result.join(', ')}
            <span>{String(new Set(arr).size === arr.length)}</span>
        </>
    )
}