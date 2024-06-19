import { RollResult } from "npm:randsum"

export const parseRolls = (
  rolls: number[],
): string => {
  return rolls.flat()
    .map((roll) => `**${roll}**`)
    .join(", ")
}
