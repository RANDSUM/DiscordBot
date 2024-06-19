import Colors from "../../../../../_shared/Colors.ts"
import { RootRollType } from "./types.ts"

export const getColor = (type: RootRollType): number => {
  switch (type) {
    case RootRollType.StrongHit:
      return Colors.Green
    case RootRollType.WeakHit:
      return Colors.Yellow
    case RootRollType.Miss:
      return Colors.Red
  }
}
