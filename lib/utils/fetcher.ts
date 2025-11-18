export async function fetcher<T = any>(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}
