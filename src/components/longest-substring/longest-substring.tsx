import { useEffect, useState } from "react"

export default function LongestSubstring () {
    const [str, setStr] = useState('');
    const [res, setRes] = useState<string>();
    const [fruits, setFruits] = useState(0);
    const [fruitNumber, setFruitNumber] = useState(0);

    function getLongestSubstring (s: string) {
        if (s.length <= 1) return s;
        let res = s[0];
        let current = s[0];
        for (let i = 1; i < s.length; i++) {
            if (current.indexOf(s[i]) === -1) {
                current += s[i];
                if (res.length < current.length) res = current;
            } else {
                current = s[i];
            }
        }
        return res;
    }

    function countFruit (fruits: number[]) {
        const NUMBER_OF_BINS = 2 as const;
        if (fruits.length < 3) return fruits.length;
        // const arr: number[] = []
        const hash: Record<number, number> = {};
        for (const fruit of fruits) {
            hash[fruit] = hash[fruit] + 1 || 1;
        }
        const arr = Object.values(hash).sort((a, b) => b - a);
        console.log(arr);
        let result = 0;
        for (let i = 0; i < NUMBER_OF_BINS; i++) {
            result = arr[i] ? result + arr[i] : result;
        }
        return result;
    }
    
    useEffect(() => {
        setRes(getLongestSubstring(str));
    }, [str]);
    
    useEffect(() => {
        const arr = [];
        const str = fruits ? String(fruits) : '';
        for (const fruit of str) {
            if (fruit) arr.push(parseInt(fruit));
        }
        setFruitNumber(countFruit(arr));
    }, [fruits])

    return (
        <div>
            <input type="text" value={str} onChange={(evt) => setStr(evt.target.value)} />
            <p>{res}: {res?.length}</p>
            <input type="number" value={String(fruits)} onChange={(evt) => setFruits(parseInt(evt.target.value))} />
            <p>{fruitNumber}</p>
        </div>
    )
}