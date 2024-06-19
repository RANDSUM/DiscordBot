import { BladesRollType } from "./constants.ts"

export const getSuccessString = (type: BladesRollType): string[] => {
  const responseArray = []
  switch (type) {
    case BladesRollType.Critical:
      responseArray.push("__**Critical Success**__")
      responseArray.push("*Things go better than expected*")
      break
    case BladesRollType.Success:
      responseArray.push("__**Success**__")
      responseArray.push("*Things go well*")
      break
    case BladesRollType.Partial:
      responseArray.push("__**Partial Success**__")
      responseArray.push("*Things go well, but not perfectly*")
      break
    case BladesRollType.Failure:
      responseArray.push("__**Failure**__")
      responseArray.push("*Things go poorly*")
      break
  }

  return responseArray
}
