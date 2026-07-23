export namespace RpcWorkerTransport {
  export interface Worker {
    postMessage(message: unknown): void;

    addEventListener(type: "message", handler: AddEventListenerHandler): void;
  }

  export type AddEventListenerHandler = (event: { data: unknown }) => void;
}
