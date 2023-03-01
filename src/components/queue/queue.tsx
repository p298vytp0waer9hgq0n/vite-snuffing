import { useState } from "react";
import useQueue from "../../hooks/useQueue";

export default function QueueElement () {
    const [number, setNumber] = useState<number | null>();
    const queue = useQueue<number>(4);

    function handleAdd () {
        number && queue.enqueue(number);
        setNumber(null);
    }
    function handleRemove () {
        queue.dequeue();
        setNumber(() => null);
    }
    
    const elements = queue.render().map((ele, index) => <div key={index}>{ele}</div>)
    
    return (
        <>
            <input type="number" value={number || ''} onChange={((evt) => setNumber(evt.target.valueAsNumber))} />
            <button type="button" onClick={handleAdd}>Add</button>
            <button type="button" onClick={handleRemove}>Remove</button>
            <div style={{display: 'flex', gap: '3px'}}>{elements}</div>
        </>
    )
}