import { useRef } from "react";
import { IPriorityQueue, PriorityQueue } from "../utils/priority-queue";

export default function usePriorityQueue<T> () {
    const ref = useRef<IPriorityQueue<T>>();
    if (!ref.current) {
        ref.current = new PriorityQueue<T>();
    }
    return ref.current;
}