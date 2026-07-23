# @js-fns/rpc

Minimal type-safe JavaScript RPC implementation.

Unlike [gRPC](https://grpc.io/) or [tRPC](https://trpc.io/), it doesn't impose any transport layer or serialization format, making it more flexible and lightweight.

It is built to simplify communication between browser and web worker threads, VS Code extension backend and webview, etc., by turning complicated message passing into simple awaitable function calls.

It is tiny, efficient, and just `888 B` for [`Rpc`](#rpc) and `1061 B` for [`BiRpc`](#birpc).

It features dual CJS/ESM support and built-in TypeScript definitions.

## Installation

The package is available as a standalone npm package:

```sh
npm install @js-fns/rpc
```

It is also available as a part of the `js-fns` collection:

```sh
npm install js-fns
```

## Usage

@js-fns/rpc provides two main RPC implementations:

- [`Rpc`](#rpc) - Classic client-server communication channel.
- [`BiRpc`](#birpc) - Bi-directional channel where both peers can call each other.

Both classes are transport-agnostic and accept schemas created by any [Standard Schema](https://standardschema.dev/) implementation, i.e., [Zod](https://zod.dev/), [Valibot](https://valibot.dev/), [ArkType](https://arktype.io/), [etc](https://standardschema.dev/schema#what-schema-libraries-implement-the-spec).

### Defining Procedure Schemas

Procedure schemas used by both `Rpc` and `BiRpc` are defined as objects with procedure names as keys and input/output validators as values. For example, using Zod:

```ts
import z from "zod";

const schema = {
  greet: {
    in: z.object({ name: z.string() }),
    out: z.string(),
  },
};
```

### `Rpc`

<!-- NOTE: Sync with the `README` tests in `./src/rpc/index.test.ts`. -->

The `Rpc` class is a shared contract between a client and a server. You define it once and use it to create both the client and the server instances:

```ts
// rpc.ts
import { Rpc } from "@js-fns/rpc"; // Or "js-fns/rpc"
import z from "zod";

export const rpc = new Rpc({
  greet: {
    in: z.object({ name: z.string() }),
    out: z.string(),
  },
});
```

On the server side, you use the defined `Rpc` instance to create an `RpcServer` and implement its handlers. In this example, a Web Worker acts as the server:

```ts
// worker.ts
import { rpc } from "./rpc.js";

const transport = {
  post(message) {
    self.postMessage(message);
  },
  on(handler) {
    self.addEventListener("message", (event) => handler(event.data));
  },
};

rpc.server(transport, {
  greet: ({ name }) => `Hello, ${name}!`,
});
```

On the client side, you use the same `Rpc` instance to create an `RpcClient` and call its procedures:

```ts
// main.ts
import { rpc } from "./rpc.js";

const worker = new Worker(new URL("./worker.js", import.meta.url));

const transport = {
  post(message) {
    worker.postMessage(message);
  },
  on(handler) {
    worker.addEventListener("message", (event) => handler(event.data));
  },
};

const client = rpc.client(transport);

const greeting = await client.call("greet", { name: "Sasha" });

console.log(greeting);
//=> "Hello, Sasha!"
```

### `BiRpc`

<!-- NOTE: Sync with the `README` tests in `./src/birpc/index.test.ts`. -->

The `BiRpc` class enables bi-directional communication where both peers can call each other's procedures. Each peer's schema describes the procedures it can call on the other side.

You define it once and use it to create both peer instances:

```ts
// biRpc.ts
import { BiRpc } from "@js-fns/rpc/birpc"; // Or "js-fns/rpc/birpc"
import z from "zod";

export const biRpc = new BiRpc({
  main: {
    // Procedures the main thread can call on the worker:
    compute: {
      in: z.number(),
      out: z.number(),
    },
  },
  worker: {
    // Procedures the worker can call on the main thread:
    getConfig: {
      in: z.string(),
      out: z.string(),
    },
  },
});
```

On the worker side, you select the worker peer and implement handlers for the main thread's procedures:

```ts
// worker.ts
import { biRpc } from "./biRpc.js";

const transport = {
  post(message) {
    self.postMessage(message);
  },

  on(handler) {
    self.addEventListener("message", (event) => handler(event.data));
  },
};

const workerPeer = biRpc.peer("worker", transport, {
  compute: (x) => x * 2,
});

// Worker can also call main thread procedures:
const factor = await workerPeer.call("getConfig", "factor");
```

On the main thread, you select the main peer and implement handlers for the worker's procedures:

```ts
// main.ts
import { biRpc } from "./biRpc.js";

const worker = new Worker(new URL("./worker.js", import.meta.url));

const transport = {
  post(message) {
    worker.postMessage(message);
  },

  on(handler) {
    worker.addEventListener("message", (event) => handler(event.data));
  },
};

const mainPeer = biRpc.peer("main", transport, {
  getConfig: (key) => config[key] ?? "",
});

// Main thread can also call worker procedures:
const result = await mainPeer.call("compute", 21);

console.log(result);
//=> 42
```

## Transport

The library is transport-agnostic. A transport can use Web Workers, MessagePorts, WebSockets, VS Code messages, or anything else that can send and receive values:

```ts
interface Transport {
  post(message: unknown): void | Promise<void>;

  on(handler: (message: unknown) => void | Promise<void>): void | Promise<void>;
}
```

The transport is also responsible for serialization. For example, Web Workers use the structured clone algorithm, while a WebSocket transport might use JSON.

The package also includes ready-made Web Worker transports that work with both `Rpc` and `BiRpc`. On the worker:

```ts
import { RpcWorkerServerTransport } from "@js-fns/rpc/transports/worker";

rpc.server(new RpcWorkerServerTransport(), handlers);
```

In the main thread, pass the `Worker` instance to the client transport:

```ts
import { RpcWorkerClientTransport } from "@js-fns/rpc/transports/worker";

const worker = new Worker(new URL("./worker.js", import.meta.url));
const client = rpc.client(new RpcWorkerClientTransport(worker));
```

`RpcWorkerServerTransport` uses the current worker global scope.

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)
