import { RootRollType } from "./types.ts"

export const getSuccessString = (type: RootRollType): string[] => {
  switch (type) {
    case RootRollType.StrongHit:
      return [
        "__**Strong Hit**__",
        "*You'll get almost all you wanted, or some additional benefit.*",
      ]
    case RootRollType.WeakHit:
      return [
        "__**Weak Hit**__",
        "*You'll get almost all of what you wanted, but usually with some cost or complication attached.*",
      ]
    case RootRollType.Miss:
      return [
        "__**Miss**__",
        "*The GM gets to say what happens next, with an eye towards complicating the situation dramatically.*",
      ]
  }
}
