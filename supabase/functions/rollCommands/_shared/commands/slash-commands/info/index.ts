import { EmbedBuilder } from "npm:@discordjs/builders"
import { embedFooterDetails } from "../../../constants.ts"
import { InteractionResponseType } from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"

const fields = [
  {
    name: "/roll <notation>",
    value:
      "Pass in dice notation or use some of our built-in game commands. - i.e., 2d6 + 3 - to generate a roll result.\n\n\n",
  },
  {
    name: "/blades <dice>",
    value:
      "Make a roll in the Forged in the Dark system. Pass in the # of d6 to roll as <dice>, and we'll show you the results. If rolling zero, pass in zero!\n\n\n",
  },
  {
    name: "/root <modifier>",
    value:
      "Make a roll in the Root RPG system. Roll 2d6 and add the <modifier> value.\n\n\n",
  },
]

const buildEmbed = () => {
  return new EmbedBuilder()
    .setTitle("RANDSUM.io")
    .setDescription(
      [
        "**[RANDSUM.io](randsum.io)** is the internet's premier randum number service. Generate your own rolls with our [Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) or use some of our built-in game commands.",
        "You'll get the rolls you want - not always the results you need.",
        "Here are the available commands:",
      ].join("\n\n"),
    )
    .setFields(fields)
    .setFooter(embedFooterDetails)
    .toJSON()
}

export function handleInfo() {
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [buildEmbed()],
    },
  })
}
