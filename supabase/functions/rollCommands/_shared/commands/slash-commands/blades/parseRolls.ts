import { RollResult } from "npm:randsum"
import { BladesRollType } from "./constants.ts"

export const parseRolls = (
  result: RollResult,
  bladesSuccess: BladesRollType,
): string => {
  const rolls = Object.values(result.rawRolls)[0] as number[]
  return rolls.flat()
    .map((roll, index, array) => {
      const isCritical = bladesSuccess === "critical"
      const firstInstaceOfRoll = array.indexOf(roll) === index
      return roll === result.total && (isCritical || firstInstaceOfRoll)
        ? `**${roll}**`
        : `~~${roll}~~`
    })
    .join(", ")
}
