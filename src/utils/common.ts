export function shuffled(arr: number[]) {
  return arr.sort(() => Math.random() - 0.5);
}
