import { IQueue } from "./types";

export default class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private pLength: number = 0;

    constructor (size: number) {
        this.size = size;
        this.container = Array(size);
    }
    
    enqueue = (item: T) => {
        if (this.pLength >= this.size) {
            throw new Error("maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.pLength++;
    }

    dequeue = () => {
        if (this.pLength < 1) {
            throw new Error("no elements in the queue");
        }
        this.container[this.head % this.size] = null;
        this.head++;
        this.pLength--;
    }
    
    peek = () => {
        return this.container[this.head % this.size];
    }
    
    get length () {
        return this.pLength;
    }

    render = () => {
        return [...this.container];
    }
}