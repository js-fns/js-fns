/**
 * Shuffles the array randomly as per the  fisher–Yates algorithm.
 *
 * @param array - The array to shuffle
 * @returns The randomly shuffled array
 *
 * @category Array
 * @public
 */
export default function shuffle<Element>(arr: Element[]): Element[] {
  const newArr = [...arr]
  for (let i = arr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp
  }
  return newArr
}
