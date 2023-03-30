import Queue from "./queue";

export function bfs (grid: (number | string)[][]) {
    let items = 0;
    let links = 0;
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          items++;
          if (grid[rowIndex + 1] && grid[rowIndex + 1][cellIndex]) links++;
          if (grid[rowIndex][cellIndex + 1]) links++;
        }
      });
    });
    return 4 * items - 2 * links;
  };

export function buildIsland(grid: (number | string)[][], start: [number, number]) {
  // const stack: [number, number][] = [start];
  const queue = new Queue<[number, number]>(grid.length * grid[0].length);
  queue.enqueue(start);
  // const island: Record<string, string[]> = {};
  const island: Set<string> = new Set;
  while (queue.length) {
    const [rowIndex, cellIndex] = [...queue.peek()!];
    queue.dequeue();
    const key = `${rowIndex};${cellIndex}`;
    // island[key] = [];
    island.add(key);
    const neighbours: ([number, number] | null)[] = [];
    neighbours[0] = grid[rowIndex - 1]?.[cellIndex] === '1' ? [rowIndex - 1, cellIndex] : null;
    neighbours[1] = grid[rowIndex][cellIndex + 1] === '1' ? [rowIndex, cellIndex + 1] : null;
    neighbours[2] = grid[rowIndex + 1]?.[cellIndex] === '1' ? [rowIndex + 1, cellIndex] : null;
    neighbours[3] = grid[rowIndex][cellIndex - 1] === '1' ? [rowIndex, cellIndex - 1] : null;
    for (const neighbour of neighbours) {
      if (neighbour) {
        const neighbourKey = `${neighbour[0]};${neighbour[1]}`;
        if (!island.has(neighbourKey)) {
          // stack.push(neighbour);
          queue.enqueue(neighbour);
        }
        // island[key].push(neighbourKey);
      }
    }
  }
  return island;
}

export function bfsCount(grid: (number | string)[][]): number {
  // const islands: Record<string, string[]>[] = [];
  const islands: Set<string>[] = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === '1') {
        const key = `${rowIndex};${cellIndex}`;
        for (const island of islands) {
          if (island.has(key)) {
            return;
          }
        }
        const newIsland = buildIsland(grid, [rowIndex, cellIndex]);
        islands.push(newIsland);
      }
    });
  });
  return islands.length;
}