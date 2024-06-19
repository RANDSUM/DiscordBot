export const getExplanation = (
  modifier: number,
  username: string,
): string => {
  return `${username} rolled 2d6 and added ${modifier}`
}
