import { RootRollType } from "./types.ts"

export const getSuccessString = (type: RootRollType): string[] => {
  const responseArray = []
  switch (type) {
    case RootRollType.StrongHit:
      responseArray.push("__**Strong Hit (>10) **__")
      responseArray.push(
        "*You'll get almost all you wanted, or some additional benefit.*",
      )
      break
    case RootRollType.WeakHit:
      responseArray.push("__**Weak Hit (7-9) **__")
      responseArray.push(
        "*You'll get almost all of what you wanted, but usually with some cost or complication attached.*",
      )
      break
    case RootRollType.Miss:
      responseArray.push("__**Miss (<6)**__")
      responseArray.push(
        "*The GM gets to say what happens next, with an eye towards complicating the situation dramatically.*",
      )
      break
  }

  return responseArray
}
