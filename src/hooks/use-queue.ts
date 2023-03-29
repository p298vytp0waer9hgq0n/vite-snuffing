import { useRef } from "react";
import Queue from "../utils/queue";
import { IQueue } from "../utils/types";

export default function useQueue<T> (size: number) {
    const queueRef = useRef<IQueue<T>>();
    if (!queueRef.current) {
        queueRef.current = new Queue(size);
    }
    return queueRef.current;
}