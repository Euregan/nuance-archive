import type { Reducer } from 'react';
import type { Graph } from './types';
import type { Action } from './actions';
import position from './position';
import { astToType, astToNodes, initSizeAndPosition } from './helpers';

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
          return 'return' in state
            ? {
                ...state,
                return: {
                  ...state.return,
                  width:
                    action.payload.id === 'return'
                      ? action.payload.width
                      : state.return.width,
                  height:
                    action.payload.id === 'return'
                      ? action.payload.height
                      : state.return.height,
                },
                temporary: state.temporary
                  ? {
                      ...state.temporary,
                      width:
                        action.payload.id === 'temporary'
                          ? action.payload.width
                          : state.temporary.width,
                      height:
                        action.payload.id === 'temporary'
                          ? action.payload.height
                          : state.temporary.height,
                    }
                  : undefined,
              }
            : { ...state };
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
