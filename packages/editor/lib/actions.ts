import type { Type, Size } from './types';

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

interface LinkCreationStarted {
  type: 'link-creation-started';
  payload: (
    | { from: string; to?: undefined }
    | { from?: undefined; to: string }
  ) & { type: Type };
}

export type Action =
  | ViewportSizeUpdated
  | ReturnTypeChanged
  | NodeSizeChanged
  | LinkCreationStarted;
