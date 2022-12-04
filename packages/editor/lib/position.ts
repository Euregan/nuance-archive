import type { Graph } from './types';

const GAP = 20;

const position = (graph: Graph): Graph => {
  const columns = [graph.temporary?.width, graph.return?.width].filter(
    (x) => x,
  ) as Array<number>;

  const graphWidth =
    columns.reduce((total, width) => total + width, 0) +
    (columns.length - 1) * GAP;

  const graphWidthWithoutLastColumn =
    columns.slice(0, -1).reduce((total, width) => total + width, 0) +
    (columns.length - 2) * GAP;

  return {
    ...graph,
    temporary: graph.temporary
      ? {
          ...graph.temporary,
          x: graphWidthWithoutLastColumn,
          y: graph.viewport.height / 2 - graph.temporary.height / 2,
        }
      : undefined,
    return: graph.return
      ? {
          ...graph.return,
          x:
            graph.viewport.width / 2 -
            graphWidth / 2 +
            graphWidthWithoutLastColumn,
          y: graph.viewport.height / 2 - graph.return.height / 2,
        }
      : null,
  };
};

export default position;
