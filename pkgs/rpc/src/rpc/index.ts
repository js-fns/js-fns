import { RpcClient } from "../client/index.ts";
import type { RpcMessage } from "../message/index.ts";
import { RpcServer } from "../server/index.ts";
import type { StandardSchemaV1 } from "../standardschema.ts";

export class Rpc<Schema extends Rpc.Schema<any>> {
  #schema: Schema;

  constructor(schema: Schema) {
    this.#schema = schema;
  }

  client(transport: Rpc.Transport): RpcClient<Schema> {
    const clientTransport: Rpc.Transport = {
      post(message) {
        return transport.post(message);
      },

      on(handler) {
        return transport.on(handler);
      },
    };

    return new RpcClient(clientTransport, this.#schema);
  }

  server(
    transport: Rpc.Transport,
    handlers: Rpc.ServerHandlers<Schema>,
  ): Rpc.Server<Schema> {
    const serverTransport: Rpc.Transport = {
      post(message) {
        return transport.post(message);
      },

      on(handler) {
        return transport.on(handler);
      },
    };

    return new RpcServer(serverTransport, this.#schema, handlers);
  }
}

export namespace Rpc {
  export interface Transport {
    post(message: unknown): Promise<void> | void;

    on(handler: TransportOnHandler): Promise<void> | void;
  }

  export type TransportOnHandler = (message: unknown) => void | Promise<void>;

  export type ServerHandlers<Schema extends Rpc.Schema<any>> =
    RpcServer.Handlers<Schema>;

  export type Server<Schema extends Rpc.Schema<any>> = RpcServer<Schema>;

  export type Schema<SchemaProcedure extends Procedure<any, any, any>> = {
    [Name in SchemaProcedure["name"]]: SchemaProcedure & {
      name: Name;
    } extends infer FieldProcedure extends Rpc.Procedure<Name, any, any>
      ? ProcedureSchema<FieldProcedure["in"], FieldProcedure["out"]>
      : never;
  };

  export type SchemaProcedure<Schema extends Rpc.Schema<any>> =
    keyof Schema extends infer ProcedureName
      ? SchemaProcedureByName<Schema, ProcedureName>
      : never;

  export type SchemaProcedureByName<
    Schema extends Rpc.Schema<any>,
    ProcedureName extends keyof Schema,
  > = Schema[keyof Schema] & { name: ProcedureName };

  export type SchemaProcedurePayload<
    Schema extends Rpc.Schema<any>,
    ProcedureName extends keyof Schema,
    Key extends keyof ProcedureSchema<any, any>,
  > = StandardSchemaV1.InferOutput<Schema[ProcedureName][Key]>;

  export interface ProcedureSchema<In, Out> {
    in: StandardSchemaV1<In>;
    out: StandardSchemaV1<Out>;
  }

  export interface Procedure<
    ProcedureName extends string,
    In,
    Out,
  > extends ProcedureSchema<In, Out> {
    name: ProcedureName;
  }

  export type ProcedurePayload<
    Procedure extends Rpc.Procedure<any, any, any>,
    Key extends keyof ProcedureSchema<any, any>,
  > = StandardSchemaV1.InferOutput<Procedure[Key]>;
}
