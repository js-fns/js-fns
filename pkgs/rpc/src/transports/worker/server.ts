import type { Rpc } from "../../rpc/index.ts";
import type { RpcWorkerTransport } from "./types.ts";

export class RpcWorkerServerTransport implements Rpc.Transport {
  #worker = globalThis as unknown as RpcWorkerTransport.Worker;

  post(message: unknown): void {
    this.#worker.postMessage(message);
  }

  on(handler: Rpc.TransportOnHandler): void {
    this.#worker.addEventListener("message", (event) => {
      void handler(event.data);
    });
  }
}
