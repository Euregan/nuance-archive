import type { Reducer } from 'react';
import type { Graph } from './types';
import type { Action } from './actions';
import position from './position';
import { astToType, astToNodes, initSizeAndPosition, map } from './helpers';
import type { Size } from './types';

const resize = <Element extends Size>(
  element: Element,
  id: string,
  update: { id: string } & Size,
): Element => ({
  ...element,
  width: id === update.id ? update.width : element.width,
  height: id === update.id ? update.height : element.height,
});

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
        case 'node-size-changed': {
          if (!('return' in state)) {
            return state;
          }
          const newState = {
            ...state,
            return: resize(state.return, 'return', action.payload),
            temporary: state.temporary
              ? resize(state.temporary, 'temporary', action.payload)
              : undefined,
          };
          if ('nodes' in newState) {
            newState.nodes = {
              result: resize(newState.nodes.result, 'result', action.payload),
              numbers: map(newState.nodes.numbers, (node, id) =>
                resize(node, `numbers.${id}`, action.payload),
              ),
              strings: map(newState.nodes.strings, (node, id) =>
                resize(node, `strings.${id}`, action.payload),
              ),
              booleans: map(newState.nodes.booleans, (node, id) =>
                resize(node, `booleans.${id}`, action.payload),
              ),
              records: map(newState.nodes.records, (node, id) =>
                resize(node, `records.${id}`, action.payload),
              ),
            };
          }
          return newState;
        }
        case 'link-creation-started':
          return {
            ...state,
            temporary: {
              ...action.payload,
              width: 0,
              height: 0,
              x: 0,
              y: 0,
            },
          };
        case 'load-ast':
          return {
            ...state,
            return: initSizeAndPosition({ type: astToType(action.payload) }),
            nodes: astToNodes(action.payload),
            temporary: undefined,
          };
      }
    })(),
  );

export default reducer;
