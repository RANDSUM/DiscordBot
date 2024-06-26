import { EmbedBuilder } from "npm:@discordjs/builders"
import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import { roll, validateDiceNotation } from "npm:randsum@4.3.1"
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

  const total = `**${isStandard ? result.total : result.result}**`
  const key = Object.keys(result.dicePools)[0]
  const dicePoolDescriptions = result.dicePools[key].description

  const rawResults = JSON.stringify(result.rawResult.flat())
  const results = JSON.stringify(result.result.flat())

  const noChanges = rawResults === results

  const rollFields =
    noChanges ? [
    { name: "Rolls", value: results, inline: true },
    ] : [{ name: "Rolls (before modifiers)", value: rawResults, inline: true },
    { name: "Rolls (after modifiers)", value: results, inline: true },

  ]
  const fields = [
    { name: "Value", value: total},
    ...rollFields,
    { name: "Notation", value: notationArg},
  ].filter((x) => x)
  return new EmbedBuilder()
    .setTitle(`You rolled a ${total}`)
    .setDescription(
      dicePoolDescriptions.join(", "),
    )
    .setFields(fields)
    .setFooter(embedFooterDetails)
    .toJSON()
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
