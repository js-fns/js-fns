import { describe, it, expect } from "vitest";
import { canonize } from "./index.ts";

describe("canonize", () => {
  describe("primitives", () => {
    it("serializes primitives to strings", () => {
      expect(canonize("hello")).toBe('"hello"');
      expect(canonize(42)).toBe("42");
      expect(canonize(3.14)).toBe("3.14");
      expect(canonize(true)).toBe("true");
      expect(canonize(false)).toBe("false");
      expect(canonize(null)).toBe("null");
      expect(canonize(undefined)).toBe("undefined");
    });

    it("serializes special numeric values", () => {
      expect(canonize(NaN)).toBe("NaN");
      expect(canonize(Infinity)).toBe("Infinity");
      expect(canonize(-Infinity)).toBe("-Infinity");
      expect(canonize(0)).toBe("0");
      expect(canonize(-0)).toBe("-0");
    });
  });

  describe("arrays", () => {
    it("serializes same arrays into same string", () => {
      const arr = [1, 2, 3];
      expect(canonize(arr)).toBe(canonize(arr));
    });

    it("serializes equal arrays into same string", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];
      expect(canonize(arr1)).toBe(canonize(arr2));
    });

    it("sorts keys when serializing", () => {
      const arr1 = [];
      arr1[2] = 3;
      arr1[0] = 1;
      arr1[1] = 2;
      const arr2 = [1, 2, 3];
      expect(canonize(arr1)).toBe(canonize(arr2));
    });

    it("handles arrays with different index orders", () => {
      const arr1 = ["a", "b", "c"];
      const arr2 = ["a", "b", "c"];
      expect(canonize(arr1)).toBe(canonize(arr2));
    });

    it("produces different strings for different arrays", () => {
      const arr1 = [1, 2];
      const arr2 = [1, 3];
      expect(canonize(arr1)).not.toBe(canonize(arr2));
    });

    it("handles nested and mixed arrays", () => {
      const arr1 = [1, [2, 3], { a: 4 }];
      const arr2 = [1, [2, 3], { a: 4 }];
      expect(canonize(arr1)).toBe(canonize(arr2));
    });

    it("produces expected output string", () => {
      const arr = [1, "hello", true];
      expect(canonize(arr)).toBe('[0:1;1:"hello";2:true;]');
    });
  });

  describe("objects", () => {
    it("serializes same objects into same string", () => {
      const obj = { name: "Alice", age: 30 };
      expect(canonize(obj)).toBe(canonize(obj));
    });

    it("serializes equal objects into same string", () => {
      const obj1 = { name: "Bob", age: 25 };
      const obj2 = { name: "Bob", age: 25 };
      expect(canonize(obj1)).toBe(canonize(obj2));
    });

    it("sorts keys when serializing", () => {
      const obj1 = { z: 1, a: 2, m: 3 };
      const obj2 = { a: 2, m: 3, z: 1 };
      expect(canonize(obj1)).toBe(canonize(obj2));
    });

    it("handles objects with different key orders", () => {
      const obj1 = { id: 123, name: "Test", active: true };
      const obj2 = { name: "Test", active: true, id: 123 };
      expect(canonize(obj1)).toBe(canonize(obj2));
    });

    it("produces different strings for different objects", () => {
      const obj1 = { x: 1, y: 2 };
      const obj2 = { x: 1, y: 3 };
      expect(canonize(obj1)).not.toBe(canonize(obj2));
    });

    it("handles nested and mixed objects", () => {
      const obj1 = { a: 1, b: { c: 2, d: 3 }, e: [4, 5] };
      const obj2 = { e: [4, 5], a: 1, b: { d: 3, c: 2 } };
      expect(canonize(obj1)).toBe(canonize(obj2));
    });

    it("produces expected output string", () => {
      const obj = { name: "Alice", age: 30, active: true };
      expect(canonize(obj)).toBe('{active:true;age:30;name:"Alice";}');
    });
  });

  describe.skip("instances", () => {
    describe("Date", () => {
      it("serializes Date instances consistently", () => {
        const date1 = new Date("2024-01-01T00:00:00Z");
        const date2 = new Date("2024-01-01T00:00:00Z");
        expect(canonize(date1)).toBe(canonize(date2));

        const date3 = new Date("2024-01-02T00:00:00Z");
        expect(canonize(date1)).not.toBe(canonize(date3));
      });

      it("produces expected output string", () => {
        const date = new Date("2024-01-01T00:00:00Z");
        expect(canonize(date)).toBe("Date:2024-01-01T00:00:00.000Z");
      });
    });

    describe("Map", () => {
      it("serializes Map instances consistently", () => {
        const map1 = new Map([
          ["a", 1],
          ["b", 2],
        ]);
        const map2 = new Map([
          ["b", 2],
          ["a", 1],
        ]);
        expect(canonize(map1)).toBe(canonize(map2));

        const map3 = new Map([
          ["a", 1],
          ["b", 3],
        ]);
        expect(canonize(map1)).not.toBe(canonize(map3));
      });

      it("produces expected output string", () => {
        const map = new Map([
          ["b", 2],
          ["a", 1],
        ]);
        expect(canonize(map)).toBe("Map{a:1;b:2;}");
      });
    });

    describe("Set", () => {
      it("serializes Set instances consistently", () => {
        const set1 = new Set([1, 2, 3]);
        const set2 = new Set([3, 2, 1]);
        expect(canonize(set1)).toBe(canonize(set2));

        const set3 = new Set([1, 2, 4]);
        expect(canonize(set1)).not.toBe(canonize(set3));
      });

      it("produces expected output string", () => {
        const set = new Set([3, 1, 2]);
        expect(canonize(set)).toBe("Set[1,2,3]");
      });
    });

    describe("RegExp", () => {
      it("serializes RegExp instances consistently", () => {
        const regex1 = /test/gi;
        const regex2 = /test/gi;
        expect(canonize(regex1)).toBe(canonize(regex2));

        const regex3 = /test/g;
        expect(canonize(regex1)).not.toBe(canonize(regex3));
      });

      it("produces expected output string", () => {
        const regex = /test/gi;
        expect(canonize(regex)).toBe("RegExp:/test/gi");
      });
    });

    describe("Error", () => {
      it("serializes Error instances consistently", () => {
        const err1 = new Error("Something went wrong");
        const err2 = new Error("Something went wrong");
        expect(canonize(err1)).toBe(canonize(err2));

        const err3 = new Error("Different error");
        expect(canonize(err1)).not.toBe(canonize(err3));
      });

      it("produces expected output string", () => {
        const err = new Error("Something went wrong");
        expect(canonize(err)).toBe('Error:"Something went wrong"');
      });
    });

    describe("URL", () => {
      it("serializes URL instances consistently", () => {
        const url1 = new URL("https://example.com/path?query=1");
        const url2 = new URL("https://example.com/path?query=1");
        expect(canonize(url1)).toBe(canonize(url2));

        const url3 = new URL("https://example.com/path?query=2");
        expect(canonize(url1)).not.toBe(canonize(url3));
      });

      it("produces expected output string", () => {
        const url = new URL("https://example.com/path?query=1");
        expect(canonize(url)).toBe('URL:"https://example.com/path?query=1"');
      });
    });

    describe("Custom class", () => {
      class Person {
        #id: string;
        constructor(public name: string, public age: number) {
          this.#id = "private";
        }
        fn() {}
      }

      it("serializes custom class instances consistently", () => {
        const person1 = new Person("Alice", 30);
        const person2 = new Person("Alice", 30);
        expect(canonize(person1)).toBe(canonize(person2));

        const person3 = new Person("Bob", 25);
        expect(canonize(person1)).not.toBe(canonize(person3));
      });

      it("produces expected output string", () => {
        const person = new Person("Alice", 30);
        expect(canonize(person)).toBe('Person{age:30;name:"Alice";}');
      });
    });

    // TODO: Consider other instances
    // Memory and Buffer types
    describe.todo("WeakMap");
    describe.todo("WeakSet");
    describe.todo("ArrayBuffer");
    describe.todo("SharedArrayBuffer");
    describe.todo("DataView");
    describe.todo("Blob");
    describe.todo("File");
    // Typed Arrays
    describe.todo("Int8Array");
    describe.todo("Uint8Array");
    describe.todo("Uint8ClampedArray");
    describe.todo("Int16Array");
    describe.todo("Uint16Array");
    describe.todo("Int32Array");
    describe.todo("Uint32Array");
    describe.todo("Float32Array");
    describe.todo("Float64Array");
    describe.todo("BigInt64Array");
    describe.todo("BigUint64Array");
    // Async/Promise types
    describe.todo("Promise");
    describe.todo("AsyncFunction");
    describe.todo("GeneratorFunction");
    describe.todo("AsyncGeneratorFunction");
    // Proxy and Reflection
    describe.todo("Proxy");
    describe.todo("WeakRef");
    describe.todo("FinalizationRegistry");
    // Internationalization
    describe.todo("Intl.Collator");
    describe.todo("Intl.DateTimeFormat");
    describe.todo("Intl.NumberFormat");
    describe.todo("Intl.PluralRules");
    describe.todo("Intl.RelativeTimeFormat");
    describe.todo("Intl.ListFormat");
    describe.todo("Intl.Locale");
    describe.todo("Intl.Segmenter");
    describe.todo("Intl.DisplayNames");
    // Primitive wrappers and symbols
    describe.todo("Symbol");
    describe.todo("BigInt");
    describe.todo("Boolean");
    describe.todo("Number");
    describe.todo("String");
    // Error types
    describe.todo("EvalError");
    describe.todo("RangeError");
    describe.todo("ReferenceError");
    describe.todo("SyntaxError");
    describe.todo("TypeError");
    describe.todo("URIError");
    describe.todo("AggregateError");
    // Streams (available in modern environments)
    describe.todo("ReadableStream");
    describe.todo("WritableStream");
    describe.todo("TransformStream");
    // Web/Node compatible APIs
    describe.todo("TextEncoder");
    describe.todo("TextDecoder");
    describe.todo("URLSearchParams");
    describe.todo("Headers");
    describe.todo("FormData");
    describe.todo("AbortController");
    describe.todo("AbortSignal");
    describe.todo("Event");
    describe.todo("EventTarget");
    describe.todo("CustomEvent");
    describe.todo("MessageChannel");
    describe.todo("MessagePort");
    describe.todo("BroadcastChannel");
    describe.todo("Crypto");
    describe.todo("CryptoKey");
    describe.todo("SubtleCrypto");
  });
});
