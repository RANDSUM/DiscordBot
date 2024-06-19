import Colors from "../../../../../_shared/Colors.ts"
import { BladesRollType } from "./constants.ts"

export const getColor = (type: BladesRollType): number => {
  switch (type) {
    case BladesRollType.Critical:
      return Colors.Gold
    case BladesRollType.Success:
      return Colors.Green
    case BladesRollType.Partial:
      return Colors.Yellow
    case BladesRollType.Failure:
      return Colors.Red
  }
}
