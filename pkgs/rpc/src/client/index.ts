import { RpcMessage } from "../message/index.ts";
import type { Rpc } from "../rpc/index.ts";

export class RpcClient<Schema extends Rpc.Schema<any>> {
  #transport: Rpc.Transport;
  #schema: Schema;
  #requests: RpcClient.Requests<Schema> = {};

  constructor(transport: Rpc.Transport, schema: Schema) {
    this.#transport = transport;
    this.#schema = schema;

    void this.#transport.on(this.#onTransportMessage.bind(this));
  }

  async call<ProcedureName extends keyof Schema>(
    name: ProcedureName,
    input: Rpc.SchemaProcedurePayload<Schema, ProcedureName, "in">,
  ): Promise<Rpc.SchemaProcedurePayload<Schema, ProcedureName, "out">> {
    const id = RpcMessage.id();

    await this.#transport.post({
      id,
      kind: "request",
      name,
      payload: input,
    });

    return new Promise((resolve, reject) => {
      this.#requests[id] = { name, resolve, reject };
    });
  }

  async #onTransportMessage(rawMessage: unknown): Promise<void> {
    const id = RpcMessage.parseId(rawMessage);
    if (!id) return;

    const request = this.#requests[id];
    if (!request) return;

    delete this.#requests[id];

    const message = await RpcMessage.parseResponse(
      this.#schema,
      request.name,
      rawMessage,
    );

    switch (message?.status) {
      case "resolved":
        return request.resolve(message.payload);

      case "rejected":
        return request.reject(new Error(message.error));

      default:
        return request.reject(new Error("Invalid response message"));
    }
  }
}

export namespace RpcClient {
  export type TransportOnHandler<Schema extends Rpc.Schema<any>> = (
    message: RpcMessage.Response<Schema>,
  ) => void | Promise<void>;

  export type Requests<Schema extends Rpc.Schema<any>> = Record<
    RpcMessage.Id,
    Request<Rpc.SchemaProcedure<Schema>>
  >;

  export interface Request<Procedure extends Rpc.Procedure<any, any, any>> {
    name: Procedure["name"];

    resolve: (value: Rpc.ProcedurePayload<Procedure, "out">) => void;

    reject: (error: unknown) => void;
  }
}
