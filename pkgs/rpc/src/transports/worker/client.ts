import type { Rpc } from "../../rpc/index.ts";
import type { RpcWorkerTransport } from "./types.ts";

export class RpcWorkerClientTransport implements Rpc.Transport {
  #worker: RpcWorkerTransport.Worker;

  constructor(worker: RpcWorkerTransport.Worker) {
    this.#worker = worker;
  }

  post(message: unknown): void {
    this.#worker.postMessage(message);
  }

  on(handler: Rpc.TransportOnHandler): void {
    this.#worker.addEventListener("message", (event) => {
      void handler(event.data);
    });
  }
}
