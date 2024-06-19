import { RootRollType } from "./types.ts"

export const getRootRollType = (
  total: number,
): RootRollType => {
  switch (true) {
    case total >= 10:
      return RootRollType.StrongHit
    case total >= 7:
      return RootRollType.WeakHit
    default:
      return RootRollType.Miss
  }
}
