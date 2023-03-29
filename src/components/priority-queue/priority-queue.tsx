import { useEffect, useState } from "react";
import usePriorityQueue from "../../hooks/use-priority-queue";

export default function PriorityQueue () {
    const [value, setValue] = useState<string>('');
    const [priority, setPriority] = useState<number>(0);
    const [elements, setElements] = useState<{value: string, priority: number}[]>([]);
    const pQueue = usePriorityQueue<string>();

    function handleClick () {
        pQueue.enqueue({ value, priority });
        setValue('');
        setPriority(0);
    }
    
    function handleAnotherClick () {
        if (pQueue.length > 0) {
            const last = pQueue.dequeue();
            setElements((oldElements) => {
                const res = [...oldElements];
                res.push(last);
                return res;
            })
        }
    }
    
    const renderElements = pQueue.render().map((element, index) => {
        return (
            <li key={index}>
                {index}: {element.value}; {element.priority}
            </li>
        )
    });
    const renderDequeue = elements.map((element, index) => {
        return (
            <li key={index}>
                {index}: {element.value}; {element.priority}
            </li>
        )
    });

    useEffect(() => {
        if (pQueue.length === 0) {
            const str = ['5-е место', '4-е место', 'Бронза', 'Серебро', 'Золото'];
            const score = [5,4,1,3,2];
            for (let i = 0; i < score.length; i++) {
                pQueue.enqueue({value: str[score[i] - 1], priority: score.length - i});
            }
            /* const length = 7 + ~~(Math.random() * 5);
            const arr: number[] = [];
            for (let i = 0; i < length; i++) {
                arr.push(~~(Math.random() * 100));
            }
            for (const ele of arr) {
                pQueue.enqueue({ value: String(ele), priority: ele });
            }
            setValue(''); */
        }
    }, []);
    
    return (
        <div>
            <input type="text" value={value} onChange={(evt) => setValue(evt.target.value)} />
            <br />
            <input type="number" value={priority} onChange={(evt) => setPriority(evt.target.valueAsNumber)} />
            <br />
            <button type="button" onClick={handleClick}>Enqueue</button>
            <button type="button" onClick={handleAnotherClick}>Dequeue</button>
            <div style={{ display: 'flex'}}>
                <ul>{renderElements}</ul>
                <ul>{renderDequeue}</ul>
            </div>
        </div>
    );
}