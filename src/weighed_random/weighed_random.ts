export interface WeighedEntry {
  weight: number;
}

export function generateRandomTable<T extends WeighedEntry>(
  array: T[]
): () => T {
  const weighedRandomTable: T[] = [];
  array.forEach((weighedEntry) => {
    for (let i: number = 0; i < weighedEntry.weight; i++) {
      weighedRandomTable.push(weighedEntry);
    }
  });
  return () =>
    weighedRandomTable[Math.floor(Math.random() * weighedRandomTable.length)];
}
