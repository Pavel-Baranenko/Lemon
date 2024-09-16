
export function truncate(str: string | undefined, num: number) {
  if (!str) return;
  return `${str.substring(0,num)}...${str.slice(-1 * num)}`
}
