import { EmbedBuilder } from "npm:@discordjs/builders"
import { embedFooterDetails } from "../../../constants.ts"
import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

const buildEmbeds = () => {
  return [
    new EmbedBuilder()
      .setTitle("Randsum")
      .setDescription(
        "**RANDSUM.io** is the internet's premier randum number service. Generate your own rolls with our [Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) or use some of our built-in game commands.\n\nYou'll get the rolls you want - not always the results you need.",
      )
      .toJSON(),
    new EmbedBuilder()
      .setTitle("/roll <notation>")
      .setDescription(
        "Pass in [dice notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) or use some of our built-in game commands. - i.e., 2d6 + 3 - to generate a roll result.",
      )
      .toJSON(),
    new EmbedBuilder()
      .setTitle("/blades <dice>")
      .setDescription(
        "Make a roll in the Forged in the Dark system. Pass in the # of d6 to roll, and we'll show you the results. If rolling zero, pass in zero!",
      )
      .toJSON(),
    new EmbedBuilder()
      .setTitle("/root <modifier>")
      .setDescription(
        "Make a roll in the Root RPG system. Roll 2d6 and add the <modifier> value.",
      )
      .toJSON(),
    new EmbedBuilder()
      .setFooter(embedFooterDetails)
      .toJSON(),
  ]
}

export function handleInfo() {
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: buildEmbeds(),
    },
  })
}
