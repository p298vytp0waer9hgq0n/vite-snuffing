import { bfs, bfsCount, buildIsland } from "../../utils/bfs";

export default function Bfs () {
    /* const grid = [
        [0,1,0,0],
        [1,0,1,0],
        [0,1,0,0],
        [1,1,0,0]]; */

     const grid = [
            ["1","0","1","1","0"],
            ["1","1","0","1","0"],
            ["0","0","1","0","0"],
            ["1","0","0","1","1"],
            ["1","0","0","1","1"]
          ];
          
    const cellStyle = {width: '50px', height: '50px'};

    const renderedGrid = grid.map((row) => {
        return <div style={{display: 'flex'}}>
            {row.map((cell) => {
                const background = cell === '1' ? 'green' : 'blue';
                return (
                    <div style={{...cellStyle, background: background}} />
                )
            })}
        </div>
    });
    
    const perimeter = bfs(grid);
    // const islands = buildIsland(grid, [0, 1]);
    const islands = bfsCount(grid);

    /* const renderIslands = Object.keys(islands).map((key) => {
        return (
            <p>{key}: {islands[key].join(', ')}</p>
        )
    }) */

    return (
        <div style={{display: 'flex'}}>
            <div>{renderedGrid}</div>
            <div>
                <p>{perimeter}</p>
                <p>{islands}</p>
            </div>
        </div>
    )
}