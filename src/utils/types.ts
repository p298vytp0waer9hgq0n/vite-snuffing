export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peek: () => T | null;
    length: number;
    render: () => Array<T | null>;
}