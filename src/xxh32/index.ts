// Magic primes used to scramble `xxh32` input.
const xxh32Prime1 = 0x9e3779b1;
const xxh32Prime2 = 0x85ebca77;
const xxh32Prime3 = 0xc2b2ae3d;
const xxh32Prime4 = 0x27d4eb2f;
const xxh32Prime5 = 0x165667b1;

/**
 * Computes the 32-bit xxHash of the given input.
 *
 * It based on a [reference C implementation](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash32-ref.c).
 *
 * @param input - Input to hash.
 * @param seed - The 32-bit seed value.
 *
 * @returns The computed 32-bit hash as an unsigned integer.
 */
export function xxh32(input: Buffer, seed: number = 0): number {
  const length = input.length;
  let offset = 0;
  let hash: number;

  if (length >= 16) {
    // Initialize accumulators
    let acc1 = (seed + xxh32Prime1 + xxh32Prime2) >>> 0;
    let acc2 = (seed + xxh32Prime2) >>> 0;
    let acc3 = (seed + 0) >>> 0;
    let acc4 = (seed - xxh32Prime1) >>> 0;

    // Process 16-byte chunks
    const limit = length - 16;
    while (offset <= limit) {
      acc1 = round32(acc1, input.readUInt32LE(offset));
      offset += 4;
      acc2 = round32(acc2, input.readUInt32LE(offset));
      offset += 4;
      acc3 = round32(acc3, input.readUInt32LE(offset));
      offset += 4;
      acc4 = round32(acc4, input.readUInt32LE(offset));
      offset += 4;
    }

    hash =
      (rotate32(acc1, 1) +
        rotate32(acc2, 7) +
        rotate32(acc3, 12) +
        rotate32(acc4, 18)) >>>
      0;
  } else {
    // Not enough data for the main loop, put something in there instead
    hash = (seed + xxh32Prime5) >>> 0;
  }

  hash = (hash + length) >>> 0;

  // Process remaining 4-byte chunks
  const limit4 = length - 4;
  while (offset <= limit4) {
    hash = (hash + Math.imul(input.readUInt32LE(offset), xxh32Prime3)) >>> 0;
    hash = rotate32(hash, 17);
    hash = Math.imul(hash, xxh32Prime4) >>> 0;
    offset += 4;
  }

  // Process any remaining bytes one-by-one
  while (offset < length) {
    hash = (hash + Math.imul(input[offset]!, xxh32Prime5)) >>> 0;
    hash = rotate32(hash, 11);
    hash = Math.imul(hash, xxh32Prime1) >>> 0;
    offset++;
  }

  return avalanche(hash);
}

/**
 * @internal
 *
 * Rotates a 32-bit number to the left by the specified amount.
 *
 * @param value - Number to rotate.
 * @param shift - Amount to rotate by.
 *
 * @returns Rotated number.
 */
function rotate32(value: number, shift: number): number {
  return ((value << shift % 32) | (value >>> (32 - (shift % 32)))) >>> 0;
}

/**
 * @internal
 *
 * Mixes one round of input into the accumulator.
 *
 * @param acc - Accumulator.
 * @param input - Input to mix.
 *
 * @returns New accumulator value.
 */
function round32(acc: number, input: number): number {
  acc = (acc + Math.imul(input, xxh32Prime2)) >>> 0;
  acc = rotate32(acc, 13);
  acc = Math.imul(acc, xxh32Prime1) >>> 0;
  return acc;
}

/**
 * Final avalanche mix to force all bits to avalanche.
 *
 * @param hash - Hash to avalanche.
 *
 * @returns The avalanched hash.
 */
function avalanche(hash: number): number {
  hash ^= hash >>> 15;
  hash = Math.imul(hash, xxh32Prime2) >>> 0;
  hash ^= hash >>> 13;
  hash = Math.imul(hash, xxh32Prime3) >>> 0;
  hash ^= hash >>> 16;
  return hash >>> 0;
}
