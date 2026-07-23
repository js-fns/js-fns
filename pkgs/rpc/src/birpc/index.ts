import { RpcClient } from "../client/index.ts";
import { RpcMessage } from "../message/index.ts";
import type { Rpc } from "../rpc/index.ts";
import { RpcServer } from "../server/index.ts";
import { BiRpcPeer } from "./peer/index.ts";

export { BiRpcPeer };

export class BiRpc<const Peers extends Record<string, Rpc.Schema<any>>> {
  #left: BiRpc.Peer;
  #right: BiRpc.Peer;

  constructor(peers: Peers & BiRpc.ExactlyTwoPeers<Peers>) {
    const names = Object.keys(peers);
    if (names.length !== 2) throw new Error("BiRpc requires exactly two peers");

    const schemas: Record<string, Rpc.Schema<any>> = peers;
    const [leftName, rightName] = names;
    const leftSchema = schemas[leftName];
    const rightSchema = schemas[rightName];

    this.#left = { name: leftName, schema: leftSchema };
    this.#right = { name: rightName, schema: rightSchema };
  }

  peer<Name extends BiRpc.PeerName<Peers>>(
    name: Name,
    transport: Rpc.Transport,
    handlers: BiRpc.Handlers<Peers[BiRpc.OtherPeerName<Peers, Name>]>,
  ): BiRpcPeer<Peers[Name], Peers[BiRpc.OtherPeerName<Peers, Name>]> {
    type OutboundSchema = Peers[Name];
    type InboundSchema = Peers[BiRpc.OtherPeerName<Peers, Name>];

    const [outboundSchema, inboundSchema] = (
      name === this.#left.name
        ? [this.#left.schema, this.#right.schema]
        : [this.#right.schema, this.#left.schema]
    ) as [OutboundSchema, InboundSchema];

    return this.#peer(transport, outboundSchema, inboundSchema, handlers);
  }

  #peer<
    OutboundSchema extends Rpc.Schema<any>,
    InboundSchema extends Rpc.Schema<any>,
  >(
    transport: Rpc.Transport,
    outboundSchema: OutboundSchema,
    inboundSchema: InboundSchema,
    handlers: BiRpc.Handlers<InboundSchema>,
  ): BiRpcPeer<OutboundSchema, InboundSchema> {
    const clientTransport: Rpc.Transport = {
      post(message) {
        return transport.post(message);
      },

      on(handler) {
        return transport.on((message) => {
          if (RpcMessage.parseKind(message) !== "response") return;
          return handler(message);
        });
      },
    };

    const serverTransport: Rpc.Transport = {
      post(message) {
        return transport.post(message);
      },

      on(handler) {
        return transport.on((message) => {
          if (RpcMessage.parseKind(message) !== "request") return;
          return handler(message);
        });
      },
    };

    return new BiRpcPeer(
      new RpcClient(clientTransport, outboundSchema),
      new RpcServer(serverTransport, inboundSchema, handlers),
    );
  }
}

export namespace BiRpc {
  export type PeerName<Peers> = Extract<keyof Peers, string>;

  export type OtherPeerName<Peers, Name> = Exclude<PeerName<Peers>, Name>;

  export interface Peer {
    name: string;
    schema: Rpc.Schema<any>;
  }

  export type Handlers<Schema extends Rpc.Schema<any>> =
    RpcServer.Handlers<Schema>;

  //#region Utils

  export type IsUnion<Union, Copy = Union> = Union extends Copy
    ? [Copy] extends [Union]
      ? false
      : true
    : never;

  export type IsExactlyTwo<Union, Copy = Union> = Union extends Copy
    ? [Exclude<Copy, Union>] extends [never]
      ? false
      : IsUnion<Exclude<Copy, Union>> extends true
        ? false
        : true
    : never;

  export type ExactlyTwoPeers<Peers> = [IsExactlyTwo<PeerName<Peers>>] extends [
    never,
  ]
    ? never
    : IsExactlyTwo<PeerName<Peers>> extends true
      ? unknown
      : never;

  //#endregion
}
