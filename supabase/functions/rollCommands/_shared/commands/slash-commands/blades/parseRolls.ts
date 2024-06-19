import { RollResult } from "npm:randsum"
import { BladesRollType } from "./types.ts"

export const parseRolls = (
  result: RollResult,
  bladesSuccess: BladesRollType,
): string => {
  const rolls = Object.values(result.rawRolls)[0] as number[]
  return rolls.flat()
    .map((roll, index, array) => {
      const isCritical = bladesSuccess === BladesRollType.Critical
      const firstInstaceOfRoll = array.indexOf(roll) === index
      return roll === result.total && (isCritical || firstInstaceOfRoll)
        ? `**${roll}**`
        : `~~${roll}~~`
    })
    .join(", ")
}
