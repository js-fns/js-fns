import { describe, expect, it } from "vitest";
import z from "zod";
import { RpcMessage } from "./index.ts";

const schema = {
  ping: {
    in: z.string().transform(Number),
    out: z.string().transform((value) => value.toUpperCase()),
  },
};

describe("RpcMessage", () => {
  describe("id", () => {
    it("creates unique UUIDs", () => {
      const first = RpcMessage.id();
      const second = RpcMessage.id();

      expect(first).toBeTypeOf("string");
      expect(second).toBeTypeOf("string");
      expect(first).toHaveLength(36);
      expect(second).toHaveLength(36);
      expect(second).not.toBe(first);
    });
  });

  describe("parseId", () => {
    it("returns the message id", () => {
      expect(RpcMessage.parseId({ id: "123" })).toBe("123");
    });

    it.each([null, undefined, "123", {}, { id: 123 }])(
      "returns null for %j",
      (message) => {
        expect(RpcMessage.parseId(message)).toBeNull();
      },
    );
  });

  describe("parseKind", () => {
    it.each(["request", "response"] as const)("returns %s", (kind) => {
      expect(RpcMessage.parseKind({ kind })).toBe(kind);
    });

    it.each([
      null,
      undefined,
      "request",
      {},
      { kind: "unknown" },
      { kind: 123 },
    ])("returns null for %j", (message) => {
      expect(RpcMessage.parseKind(message)).toBeNull();
    });
  });

  describe("parseRequest", () => {
    it("parses and validates a request", async () => {
      const id = RpcMessage.id();

      await expect(
        RpcMessage.parseRequest(schema, {
          id,
          kind: "request",
          name: "ping",
          payload: "123",
        }),
      ).resolves.toEqual({
        id,
        kind: "request",
        name: "ping",
        payload: 123,
      });
    });

    it.each([
      null,
      {},
      { id: 123, kind: "request", name: "ping", payload: "123" },
      { id: "123", kind: "response", name: "ping", payload: "123" },
      { id: "123", kind: "request", name: 123, payload: "123" },
      { id: "123", kind: "request", name: "unknown", payload: "123" },
      { id: "123", kind: "request", name: "ping", payload: 123 },
    ])("returns null for an invalid request", async (message) => {
      await expect(
        RpcMessage.parseRequest(schema, message),
      ).resolves.toBeNull();
    });
  });

  describe("parseResponse", () => {
    it("parses and validates a resolved response", async () => {
      const id = RpcMessage.id();

      await expect(
        RpcMessage.parseResponse(schema, "ping", {
          id,
          kind: "response",
          status: "resolved",
          payload: "pong",
        }),
      ).resolves.toEqual({
        id,
        kind: "response",
        status: "resolved",
        payload: "PONG",
      });
    });

    it("turns an invalid payload into a rejected response", async () => {
      const id = RpcMessage.id();

      await expect(
        RpcMessage.parseResponse(schema, "ping", {
          id,
          kind: "response",
          status: "resolved",
          payload: 123,
        }),
      ).resolves.toEqual({
        id,
        kind: "response",
        status: "rejected",
        error:
          "Invalid response payload: Invalid input: expected string, received number",
      });
    });

    it("parses a rejected response", async () => {
      const id = RpcMessage.id();

      await expect(
        RpcMessage.parseResponse(schema, "ping", {
          id,
          kind: "response",
          status: "rejected",
          error: "Failed",
        }),
      ).resolves.toEqual({
        id,
        kind: "response",
        status: "rejected",
        error: "Failed",
      });
    });

    it("defaults an invalid rejection error", async () => {
      const id = RpcMessage.id();

      await expect(
        RpcMessage.parseResponse(schema, "ping", {
          id,
          kind: "response",
          status: "rejected",
          error: 123,
        }),
      ).resolves.toEqual({
        id,
        kind: "response",
        status: "rejected",
        error: "Unknown error",
      });
    });

    it.each([
      null,
      {},
      { id: 123, kind: "response", status: "resolved", payload: "pong" },
      { id: "123", kind: "request", status: "resolved", payload: "pong" },
      { id: "123", kind: "response", payload: "pong" },
      { id: "123", kind: "response", status: "unknown", payload: "pong" },
    ])("returns null for an invalid response", async (message) => {
      await expect(
        RpcMessage.parseResponse(schema, "ping", message),
      ).resolves.toBeNull();
    });
  });
});
