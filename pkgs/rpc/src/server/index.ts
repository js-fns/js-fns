import { RpcMessage } from "../message/index.ts";
import type { Rpc } from "../rpc/index.ts";

export class RpcServer<Schema extends Rpc.Schema<any>> {
  #transport: Rpc.Transport;
  #schema: Schema;
  #handler: RpcServer.Handlers<Schema>;

  constructor(
    transport: Rpc.Transport,
    schema: Schema,
    handler: RpcServer.Handlers<Schema>,
  ) {
    this.#transport = transport;
    this.#schema = schema;
    this.#handler = handler;

    void this.#transport.on(this.#onTransportMessage.bind(this));
  }

  async #onTransportMessage(rawMessage: unknown): Promise<void> {
    const message = await RpcMessage.parseRequest(this.#schema, rawMessage);
    if (!message) return;

    let payload: Rpc.SchemaProcedurePayload<Schema, keyof Schema, "out">;
    try {
      payload = await this.#handler[message.name](message.payload);
    } catch (error) {
      return await this.#transport.post({
        id: message.id,
        kind: "response",
        status: "rejected",
        error: error instanceof Error ? error.message : String(error),
      });
    }

    await this.#transport.post({
      id: message.id,
      kind: "response",
      status: "resolved",
      payload,
    });
  }
}

export namespace RpcServer {
  export type TransportOnHandler<Schema extends Rpc.Schema<any>> = (
    message: RpcMessage.Request<Schema>,
  ) => void | Promise<void>;

  export type Handlers<Schema extends Rpc.Schema<any>> = {
    [ProcedureName in keyof Schema]: (
      input: Rpc.SchemaProcedurePayload<Schema, ProcedureName, "in">,
    ) => MaybePromise<Rpc.SchemaProcedurePayload<Schema, ProcedureName, "out">>;
  };

  export type MaybePromise<Type> = Type | Promise<Type>;
}
