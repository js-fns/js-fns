import type { Rpc } from "../rpc/index.ts";
import type { StandardSchemaV1 } from "../standardschema.ts";

export abstract class RpcMessage {
  static parseId(message: unknown): RpcMessage.Id | null {
    if (
      message &&
      typeof message === "object" &&
      "id" in message &&
      typeof message.id === "string"
    ) {
      return message.id as RpcMessage.Id;
    }
    return null;
  }

  static parseKind(message: unknown): RpcMessage.Kind | null {
    if (
      message &&
      typeof message === "object" &&
      "kind" in message &&
      (message.kind === "request" || message.kind === "response")
    ) {
      return message.kind;
    }
    return null;
  }

  static async parseResponse<Schema extends Rpc.Schema<any>>(
    schema: Schema,
    name: keyof Schema,
    message: unknown,
  ): Promise<RpcMessage.Response<Schema> | null> {
    if (
      message &&
      typeof message === "object" &&
      "id" in message &&
      typeof message.id === "string" &&
      "kind" in message &&
      message.kind === "response" &&
      "status" in message
    ) {
      const id = message.id as RpcMessage.Id;
      const { kind, status } = message;

      switch (status) {
        case "resolved": {
          const rawPayload = "payload" in message ? message.payload : undefined;

          const validationResult =
            await schema[name].out["~standard"].validate(rawPayload);

          if (validationResult.issues) {
            return {
              id,
              kind,
              status: "rejected",
              error: `Invalid response payload: ${validationResult.issues
                .map((issue) => issue.message)
                .join(", ")}`,
            };
          }

          const payload = validationResult.value;

          return { id, kind, status, payload };
        }

        case "rejected": {
          const error =
            "error" in message && typeof message.error === "string"
              ? message.error
              : "Unknown error";

          return { id, kind, status, error };
        }
      }
    }

    return null;
  }

  static async parseRequest<Schema extends Rpc.Schema<any>>(
    schema: Schema,
    message: unknown,
  ): Promise<RpcMessage.Request<Schema> | null> {
    if (
      message &&
      typeof message === "object" &&
      "id" in message &&
      typeof message.id === "string" &&
      "kind" in message &&
      message.kind === "request" &&
      "name" in message &&
      typeof message.name === "string" &&
      message.name in schema
    ) {
      const name = message.name as keyof Schema;
      const rawPayload = "payload" in message ? message.payload : undefined;
      const validationResult =
        await schema[name].in["~standard"].validate(rawPayload);

      if (validationResult.issues) return null;

      return {
        id: message.id as RpcMessage.Id,
        kind: message.kind,
        name,
        payload: validationResult.value,
      };
    }

    return null;
  }

  static id(): RpcMessage.Id {
    const { crypto } = globalThis as unknown as {
      crypto: { randomUUID(): string };
    };

    return crypto.randomUUID() as RpcMessage.Id;
  }
}

export namespace RpcMessage {
  export type Id = string & { [idBrand]: true };
  declare const idBrand: unique symbol;

  export type Kind = "request" | "response";

  export type Request<
    Schema extends Rpc.Schema<any>,
    ProcedureName extends keyof Schema = keyof Schema,
  > = {
    id: Id;
    kind: "request";
    name: ProcedureName;
    payload: Rpc.SchemaProcedurePayload<Schema, ProcedureName, "in">;
  };

  export type Response<Schema extends Rpc.Schema<any>> =
    | ResponseResolved<Schema>
    | ResponseRejected;

  export interface ResponseBase {
    id: Id;
    kind: "response";
  }

  export interface ResponseResolved<
    Schema extends Rpc.Schema<any>,
  > extends ResponseBase {
    status: "resolved";
    payload: StandardSchemaV1.InferOutput<Schema[keyof Schema]["out"]>;
  }

  export interface ResponseRejected extends ResponseBase {
    status: "rejected";
    error: string;
  }
}
