import { RpcClient } from "../../client/index.ts";
import type { Rpc } from "../../rpc/index.ts";
import { RpcServer } from "../../server/index.ts";

export class BiRpcPeer<
  OutboundSchema extends Rpc.Schema<any>,
  InboundSchema extends Rpc.Schema<any>,
> {
  #client: RpcClient<OutboundSchema>;
  // oxlint-disable-next-line eslint/no-unused-private-class-members -- TODO: Figure out if the peer actually needs the server
  #server: RpcServer<InboundSchema>;

  constructor(
    client: RpcClient<OutboundSchema>,
    server: RpcServer<InboundSchema>,
  ) {
    this.#client = client;
    this.#server = server;
  }

  call<ProcedureName extends keyof OutboundSchema>(
    name: ProcedureName,
    input: Rpc.SchemaProcedurePayload<OutboundSchema, ProcedureName, "in">,
  ): Promise<Rpc.SchemaProcedurePayload<OutboundSchema, ProcedureName, "out">> {
    return this.#client.call(name, input);
  }
}
