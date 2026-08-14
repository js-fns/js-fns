// Magic primes used to scramble `xxh64` input.
const xxh64Prime1 = 0x9e3779b185ebca87n;
const xxh64Prime2 = 0xc2b2ae3d27d4eb4fn;
const xxh64Prime3 = 0x165667b19e3779f9n;
const xxh64Prime4 = 0x85ebca77c2b2ae63n;
const xxh64Prime5 = 0x27d4eb2f165667c5n;

/**
 * Computes the 64-bit xxHash of the given input.
 *
 * It based on a [reference C implementation](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash64-ref.c).
 *
 * @param input - Input to hash.
 * @param seed - The 64-bit seed value.
 *
 * @returns The computed 64-bit hash as an unsigned bigint.
 */
export function xxh64(input: Buffer, seed: bigint = 0n): bigint {
  const length = input.length;
  let remaining = length;
  let offset = 0;
  let hash: bigint;

  if (remaining >= 32) {
    // Initialize accumulators
    let acc1 = wrap64(seed + xxh64Prime1 + xxh64Prime2);
    let acc2 = wrap64(seed + xxh64Prime2);
    let acc3 = seed;
    let acc4 = wrap64(seed - xxh64Prime1);

    while (remaining >= 32) {
      acc1 = round64(acc1, input.readBigUInt64LE(offset));
      offset += 8;
      acc2 = round64(acc2, input.readBigUInt64LE(offset));
      offset += 8;
      acc3 = round64(acc3, input.readBigUInt64LE(offset));
      offset += 8;
      acc4 = round64(acc4, input.readBigUInt64LE(offset));
      offset += 8;
      remaining -= 32;
    }

    hash = wrap64(
      rotate64(acc1, 1) +
        rotate64(acc2, 7) +
        rotate64(acc3, 12) +
        rotate64(acc4, 18),
    );

    hash = mergeRound64(hash, acc1);
    hash = mergeRound64(hash, acc2);
    hash = mergeRound64(hash, acc3);
    hash = mergeRound64(hash, acc4);
  } else {
    // Not enough data for the main loop, put something in there instead.
    hash = wrap64(seed + xxh64Prime5);
  }

  hash = wrap64(hash + BigInt(length));

  // Process remaining 8-byte chunks
  while (remaining >= 8) {
    hash ^= round64(0n, input.readBigUInt64LE(offset));
    hash = rotate64(hash, 27);
    hash = wrap64(hash * xxh64Prime1 + xxh64Prime4);
    offset += 8;
    remaining -= 8;
  }

  // Process a remaining 4-byte chunk
  if (remaining >= 4) {
    hash ^= wrap64(BigInt(input.readUInt32LE(offset)) * xxh64Prime1);
    hash = rotate64(hash, 23);
    hash = wrap64(hash * xxh64Prime2 + xxh64Prime3);
    offset += 4;
    remaining -= 4;
  }

  // Process any remaining bytes one-by-one
  while (remaining !== 0) {
    hash ^= wrap64(BigInt(input[offset]!) * xxh64Prime5);
    hash = rotate64(hash, 11);
    hash = wrap64(hash * xxh64Prime1);
    offset++;
    remaining--;
  }

  return avalanche64(hash);
}

/**
 * @internal
 *
 * Rotates a 64-bit number to the left by the specified amount.
 *
 * @param value - Number to rotate.
 * @param shift - Amount to rotate by.
 *
 * @returns Rotated number.
 */
function rotate64(value: bigint, shift: number): bigint {
  const normalizedShift = BigInt(shift % 64);
  return wrap64((value << normalizedShift) | (value >> (64n - normalizedShift)));
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
function round64(acc: bigint, input: bigint): bigint {
  acc = wrap64(acc + input * xxh64Prime2);
  acc = rotate64(acc, 31);
  acc = wrap64(acc * xxh64Prime1);
  return acc;
}

/**
 * @internal
 *
 * Merges one accumulator into the final hash.
 *
 * @param hash - Hash to merge into.
 * @param acc - Accumulator value.
 *
 * @returns Merged hash value.
 */
function mergeRound64(hash: bigint, acc: bigint): bigint {
  hash ^= round64(0n, acc);
  hash = wrap64(hash * xxh64Prime1 + xxh64Prime4);
  return hash;
}

/**
 * Final avalanche mix to force all bits to avalanche.
 *
 * @param hash - Hash to avalanche.
 *
 * @returns The avalanched hash.
 */
function avalanche64(hash: bigint): bigint {
  hash ^= hash >> 33n;
  hash = wrap64(hash * xxh64Prime2);
  hash ^= hash >> 29n;
  hash = wrap64(hash * xxh64Prime3);
  hash ^= hash >> 32n;
  return hash;
}

/**
 * @internal
 *
 * Ensures a value stays in unsigned 64-bit range.
 *
 * @param value - Value to wrap.
 *
 * @returns Unsigned 64-bit value.
 */
function wrap64(value: bigint): bigint {
  return BigInt.asUintN(64, value);
}
