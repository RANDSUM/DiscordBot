import Colors from "../../../../../_shared/Colors.ts"
import { BladesRollType } from "./constants.ts"

export const getColor = (type: BladesRollType): number => {
  switch (type) {
    case "critical":
      return Colors.Gold
    case "success":
      return Colors.Green
    case "partial":
      return Colors.Yellow
    case "failure":
      return Colors.Red
  }
}
