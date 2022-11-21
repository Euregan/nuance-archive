import { useReducer, useEffect, useRef } from 'react';
import type { Reducer } from 'react';
import { v4 as uuid } from 'uuid';
import type { Type } from '../lib/types';
import { typeToLabel } from '../lib/types';
import Node from './Node';
import Output from './Output';
import * as styles from './Editor.css';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Graph {
  viewport: Size;
  return:
    | null
    | ({
        type: Type;
      } & Position &
        Size);
}

interface ReturnTypeChanged {
  type: 'return-type-changed';
  payload: Type;
}

interface ViewportSizeUpdated {
  type: 'viewport-size-updated';
  payload: Size;
}

interface NodeSizeChanged {
  type: 'node-size-changed';
  payload: { id: string } & Size;
}

type Action = ViewportSizeUpdated | ReturnTypeChanged | NodeSizeChanged;

const position = (graph: Graph): Graph => {
  return {
    ...graph,
    return: graph.return
      ? {
          ...graph.return,
          x: graph.viewport.width / 2 - graph.return.width / 2,
          y: graph.viewport.height / 2 - graph.return.height / 2,
        }
      : null,
  };
};

const reducer: Reducer<Graph, Action> = (state, action): Graph =>
  position(
    (() => {
      switch (action.type) {
        case 'viewport-size-updated':
          return { ...state, viewport: action.payload };
        case 'return-type-changed':
          return {
            ...state,
            return: {
              type: action.payload,
              x: state.viewport.width / 2,
              y: state.viewport.height / 2,
              width: 0,
              height: 0,
            },
          };
        case 'node-size-changed':
          return {
            ...state,
            return: state.return
              ? {
                  ...state.return,
                  width:
                    action.payload.id === 'return'
                      ? action.payload.width
                      : state.return.width,
                  height:
                    action.payload.id === 'return'
                      ? action.payload.height
                      : state.return.height,
                }
              : null,
          };
      }
    })(),
  );

const Editor = () => {
  const [graph, dispatch] = useReducer(reducer, {
    viewport: { width: 0, height: 0 },
    return: null,
  });

  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svg.current) {
      const setViewbox = () => {
        if (svg.current) {
          dispatch({
            type: 'viewport-size-updated',
            payload: {
              width: svg.current.clientWidth,
              height: svg.current.clientHeight,
            },
          });
        }
      };
      setViewbox();

      const observer = new ResizeObserver(setViewbox);

      observer.observe(svg.current);

      return () => observer.disconnect();
    }
  }, [svg.current?.clientWidth, svg.current?.clientHeight]);

  if (graph.return === null) {
    return (
      <label>
        Select the type of value that your processor will output
        <select
          value={graph.return || undefined}
          onChange={(event) =>
            dispatch({
              type: 'return-type-changed',
              payload: event.target.value as Type,
            })
          }
        >
          <option selected disabled></option>
          <option value="number">{typeToLabel.number}</option>
          <option value="string">{typeToLabel.string}</option>
          <option value="boolean">{typeToLabel.boolean}</option>
          <option value="record">{typeToLabel.record}</option>
        </select>
      </label>
    );
  }

  return (
    <div className={styles.editor}>
      <section className={styles.pane}>
        <h2>Inputs</h2>
        <ul className={styles.inputs}>
          <li>
            <button onClick={() => {}}>Constant</button>
          </li>
        </ul>
      </section>
      <svg
        ref={svg}
        style={{ width: '100%', height: '100%' }}
        viewBox={`0 0 ${graph.viewport.width} ${graph.viewport.height}`}
      >
        <Node
          x={graph.return.x}
          y={graph.return.y}
          id="return"
          onSizeChange={(id, width, height) =>
            dispatch({
              type: 'node-size-changed',
              payload: { id, width, height },
            })
          }
        >
          <Output type={graph.return.type} onClickInput={console.log} />
        </Node>
      </svg>
    </div>
  );
};

export default Editor;
