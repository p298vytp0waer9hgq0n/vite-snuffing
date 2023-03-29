export interface IPriorityQueue<T> {
    enqueue: (node: INode<T>) => void;
    dequeue: () => INode<T>;
    render: () => INode<T>[];
    length: number;
}

interface INode<T> {
    value: T;
    priority: number;
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
    queue: INode<T>[];

    constructor () {
        this.queue = [];
    }

    private swap (first: number, second: number) {
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
            const leftIndex = this.getLeftChild(index);
            const rightIndex = this.getRightChild(index);
            if (leftIndex < this.length && this.queue[leftIndex]?.priority > this.queue[index].priority && this.queue[leftIndex]?.priority >= this.queue[rightIndex]?.priority) {
                this.swap(leftIndex, index);
                index = leftIndex;
            } else if (rightIndex < this.length && this.queue[rightIndex]?.priority > this.queue[index].priority) {
                this.swap(rightIndex, index);
                index = rightIndex;
            } else {
                break;
            }
        }
    }
    
    private siftUp (startIndex: number) {
        let index = startIndex;
        while (index > 0) {
            const parentIndex = this.getParent(index);
            if (this.queue[parentIndex].priority < this.queue[index].priority) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    
    enqueue (node: INode<T>) {
        this.queue.push(node);
        this.siftUp(this.length - 1);
    };
    
    dequeue () {
        const res = this.queue[0];
        this.queue[0] = this.queue[this.length - 1];
        this.queue.pop();
        this.siftDown(0);
        return res;
    }
    
    render () {
        return [...this.queue];
    }

    get length () {
        return this.queue.length;
    }
}