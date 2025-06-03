function removeFalsyValues<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => Boolean(value))) as Partial<T>;
}

export default removeFalsyValues;
