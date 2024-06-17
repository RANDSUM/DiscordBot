import { EmbedBuilder } from "npm:@discordjs/builders"
import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { roll, validateDiceNotation } from "npm:randsum"
import { embedFooterDetails } from "../../../constants.ts"
import deferredResponse from "../../../deferredResponse.ts"

const buildEmbed = (
  interaction: APIApplicationCommandInteraction,
) => {
  const notationArg =
    (interaction.data as unknown as { options: [{ value: string }] }).options
      ?.[0]?.value

  const { valid, description } = validateDiceNotation(notationArg)

  if (!valid) {
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription(`"**${notationArg}**" is not valid dice notation.`)
      .addFields(
        description.map((d) => ({ name: "", value: d, inline: true })),
      )
      .addFields({
        name: "Learn More",
        value:
          "See the [Dice Notation Guide](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more information.",
      })
      .setFooter(embedFooterDetails)
      .toJSON()
  }

  const result = roll(notationArg)
  const isStandard = result.type === "standard"

  if (Object.keys(result.rawRolls).length === 1) {
    const total = isStandard ? String(result.total) : String(result.result)
    const description = isStandard ? String(result.result) : ""
    return new EmbedBuilder()
      .setTitle(total)
      .setDescription(description)
      .setFooter(embedFooterDetails)
      .toJSON()
  }
}

export function handleRoll(
  interaction: APIApplicationCommandInteraction,
) {
  const embed = buildEmbed(interaction)

  return deferredResponse(() => {
    return {
      body: { embeds: [embed] },
      interaction_token: interaction.token,
      application_id: interaction.application_id,
    }
  })
}
