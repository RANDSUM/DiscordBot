import { EmbedBuilder } from "npm:@discordjs/builders"
import { embedFooterDetails } from "../../../constants.ts"
import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

const buildEmbed = () => {
  return new EmbedBuilder()
    .setTitle("Randsum")
    .setDescription(
      "**RANDSUM.io** is the internet's premier randum number service. Generate your own rolls with our [Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) or use some of our built-in game commands.",
    )
    .setFields(
      {
        name: "",
        value:
          "You'll get the rolls you want - not always the results you need.",
      },
      {
        name: "Commands",
        value: "",
      },
      {
        name: "/roll <notation>",
        value:
          "Pass in dice notation - i.e., 2d6 + 3 - to generate a roll result.",
      },
      {
        name: "/blades <dice>",
        value:
          "Make a roll in the Forged in the Dark system. Pass in the # of d6 to roll. If you are rolling 0, pass in 0, and we'll do the math for you.",
      },
      {
        name: "/root <plus>",
        value:
          "Make a roll in the Root RPG system. Roll 2d6 and add the 'plus' value.",
      },
    )
    .setFooter(embedFooterDetails)
    .toJSON()
}

export function handleInfo() {
  const embed = buildEmbed()

  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [embed],
    },
  })
}
