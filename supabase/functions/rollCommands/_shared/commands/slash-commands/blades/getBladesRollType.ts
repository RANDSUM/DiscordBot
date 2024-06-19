import { RollResult } from "npm:randsum"
import { BladesRollType } from "./types.ts"

export const getBladesRollType = (
  result: RollResult,
  quantity: number,
): BladesRollType => {
  const rawRolls = Object.values(result.rawRolls)[0] as number[]
  if (result.total === 6) {
    const isCritical = rawRolls.flat().filter((roll) => roll === 6).length >= 2
    if (isCritical && quantity > 0) {
      return BladesRollType.Critical
    }
    return BladesRollType.Success
  }
  if (result.total === 4 || result.total === 5) {
    return BladesRollType.Partial
  }
  return BladesRollType.Failure
}
