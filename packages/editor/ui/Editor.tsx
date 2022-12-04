import { useReducer, useEffect, useRef } from 'react';
import type { AST } from 'interpreter/src/ast';
import type { Type } from '../lib/types';
import reducer from '../lib/reducer';
import { typeToLabel } from '../lib/helpers';
import Node from './Node';
import Output from './Output';
import NodePicker from './NodePicker';
import * as styles from './Editor.css';

interface Props {
  ast?: AST;
}

const Editor = ({ ast }: Props) => {
  const [graph, dispatch] = useReducer(reducer, {
    viewport: { width: 0, height: 0 },
  });
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ast) {
      dispatch({
        type: 'load-ast',
        payload: ast,
      });
    }
  }, [JSON.stringify(ast)]);

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

  if (!('return' in graph)) {
    return (
      <label>
        Select the type of value that your processor will output
        <select
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
          <Output
            type={graph.return.type}
            onClickInput={(type) =>
              dispatch({
                type: 'link-creation-started',
                payload: { to: 'return', type },
              })
            }
          />
        </Node>
        {graph.temporary && (
          <Node
            x={graph.temporary.x}
            y={graph.temporary.y}
            id="temporary"
            onSizeChange={(id, width, height) =>
              dispatch({
                type: 'node-size-changed',
                payload: { id, width, height },
              })
            }
          >
            <NodePicker
              filter={
                'from' in graph.temporary
                  ? {
                      input: graph.temporary.type,
                    }
                  : {
                      output: graph.temporary.type,
                    }
              }
            />
          </Node>
        )}
        {'nodes' in graph && (
          <>
            <Node
              x={graph.nodes.result.x}
              y={graph.nodes.result.y}
              id="result"
              onSizeChange={(id, width, height) => {
                dispatch({
                  type: 'node-size-changed',
                  payload: { id, width, height },
                });
              }}
            >
              {graph.nodes.result.type}
            </Node>
            {Object.entries(graph.nodes.numbers).map(([id, node]) => (
              <Node
                key={id}
                x={node.x}
                y={node.y}
                id={`numbers.${id}`}
                onSizeChange={(id, width, height) => {
                  dispatch({
                    type: 'node-size-changed',
                    payload: { id, width, height },
                  });
                }}
              >
                {node.type}
              </Node>
            ))}
            {Object.entries(graph.nodes.strings).map(([id, node]) => (
              <Node
                key={id}
                x={node.x}
                y={node.y}
                id={`strings.${id}`}
                onSizeChange={(id, width, height) => {
                  dispatch({
                    type: 'node-size-changed',
                    payload: { id, width, height },
                  });
                }}
              >
                {node.type}
              </Node>
            ))}
            {Object.entries(graph.nodes.booleans).map(([id, node]) => (
              <Node
                key={id}
                x={node.x}
                y={node.y}
                id={`booleans.${id}`}
                onSizeChange={(id, width, height) => {
                  dispatch({
                    type: 'node-size-changed',
                    payload: { id, width, height },
                  });
                }}
              >
                {node.type}
              </Node>
            ))}
            {Object.entries(graph.nodes.records).map(([id, node]) => (
              <Node
                key={id}
                x={node.x}
                y={node.y}
                id={`records.${id}`}
                onSizeChange={(id, width, height) => {
                  dispatch({
                    type: 'node-size-changed',
                    payload: { id, width, height },
                  });
                }}
              >
                {node.type}
              </Node>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default Editor;
