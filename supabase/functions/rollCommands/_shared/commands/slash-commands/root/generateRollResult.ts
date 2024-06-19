import { roll } from "npm:randsum"

export const generateRollResult = (modifier: number) => {
  return roll({
    sides: 6,
    quantity: 2,
    modifiers: {
      plus: modifier,
    },
  })
}
