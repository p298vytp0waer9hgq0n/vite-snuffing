interface IPriorityQueue<T> {
    enqueue: () => void;
    dequeue: () => INode<T>;
    length: number;
}

interface INode<T> {
    value: T;
    priority: number;
}

export class PQ<T> implements IPriorityQueue<T> {
    queue: [];

    constructor () {
        this.queue = [];
    }

    private switch (first: number, second: number) {
        [this.queue[first], this.queue[second]] = [this.queue[second], this.queue[first]];
    }

    private getLeftChild (index: number) {
        return (2 * index) + 1;
    }
    
    private getRightChild (index: number) {
        return (2 * index) + 2;
    }
    
    private getParent (index: number) {
        return ~~((index - 1) / 2);
    }

    private siftDown (startIndex: number) {
        let index = startIndex;
        while (true) {

        }
    }
}