import useQueue from "../../hooks/use-queue";

interface INode<T> {
    value: T;
    left: INode<T> | null;
    right: INode<T> | null;
}

class TreeNode<T = any> implements INode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    
    constructor (value: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
        this.value = value;
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function inorderTranversal (root: TreeNode | null) {
    const res: any[] = [];
    const stack: (TreeNode | null)[] = [];
    if (!root) return;
    stack.push(null);
    while (root) {
        // if (root.value === '*' || root.value === '/') res += '(';
        while (root.left) {
            stack.push(root);
            root = root.left;
        }
        res.push(root.value);
        while (!root.right) {
            root = stack.pop()!;
            if (root === null) return res;
            // if (root.value === '*' || root.value === '/') res += ')';
            res.push(root.value)
        }
        root = root.right!;
    }
}

function inorderTranversalString (root: TreeNode | null) {
    let res: string = '';
    const stack: (TreeNode | null)[] = [];
    if (!root) return;
    stack.push(null);
    while (root) {
        if (root.value === '*' || root.value === '/') res += '(';
        while (root.left) {
            stack.push(root);
            root = root.left;
        }
        res += root.value;
        while (!root.right) {
            root = stack.pop()!;
            if (root === null) return res;
            if (root.value === '*' || root.value === '/') res += ')';
            res += root.value;
        }
        root = root.right!;
    }
}

function maxDepth (root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function levelOrder (root: TreeNode | null) {
    const queue = useQueue<TreeNode>(30);
    const res: any[][] = [];
    if (!root) return res;
    queue.enqueue(root);
    let current: TreeNode;
    while (queue.length) {
        const size = queue.length;
        const lvl: any[] = [];
        for (let i = 0; i < size; i++) {
            current = queue.peek()!;
            queue.dequeue();
            if (current.left) queue.enqueue(current.left);
            if (current.right) queue.enqueue(current.right);
            lvl.push(current.value);
        }
        res.push(lvl);
    }
    return res;
}

function invertTree (root: TreeNode | null) {
    if (!root) return null;
    const queue = useQueue<TreeNode>(30);
    const originalRoot = root;
    queue.enqueue(root);
    while (queue.length) {
        const current = queue.peek()!;
        queue.dequeue();
        const tmp = current?.left;
        current.left = current?.right;
        current.right = tmp;
        current.right && queue.enqueue(current.right);
        current.left && queue.enqueue(current.left);
    }
    return originalRoot;
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root || !p || !q) return null;
    let current = root;
    while (true) {
        // if (!current.left || !current.right) return current;
        if (p.value < current.value && q.value < current.value) {
            current = current.left!;
        } else if (p.value > current.value && q.value > current.value) {
            current = current.right!;
        } else {
            return current;
        }
    }
};

const tree = new TreeNode('+',
    new TreeNode('3'),
    new TreeNode('*',
        new TreeNode('+',
            new TreeNode('5'),
            new TreeNode('9')),
        new TreeNode('2')
    )
)

const treeNumbers = new TreeNode(1, 
    new TreeNode(4,
        new TreeNode(3,
            undefined,
            new TreeNode(7)),
        new TreeNode(6,
            new TreeNode(10),
            new TreeNode(12))), 
    new TreeNode(2,
        new TreeNode(22),
        new TreeNode(9)));

const bst = new TreeNode(12,
    new TreeNode(5,
        new TreeNode(4),
        new TreeNode(8,
            new TreeNode(7),
            new TreeNode(9))),
    new TreeNode(15,
        undefined,
        new TreeNode(20)));

export default function BinaryTree () {
    console.log(tree);
    console.log(inorderTranversalString(tree));
    return(
        <div>
            <span>In-order: {inorderTranversalString(tree)}; depth: {maxDepth(tree)}</span>
            <br></br>
            <span>Level: {levelOrder(tree).join('; ')}</span>
            <br />
            <span>In-order: {inorderTranversal(treeNumbers)?.join('; ')}</span>
            <br />
            <span>In-order inverted: {inorderTranversal(invertTree(treeNumbers))?.join('; ')}</span>
            <br />
            <span>LowestCommon: {lowestCommonAncestor(bst, new TreeNode(4), new TreeNode(9))?.value}</span>
        </div>
    )
}