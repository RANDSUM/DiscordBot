import { EmbedBuilder } from "npm:@discordjs/builders"
import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { roll, validateDiceNotation } from "npm:randsum"
import { embedFooterDetails } from "../../../constants.ts"

const buildEmbed = (
  interaction: APIApplicationCommandInteraction,
) => {
  const notationArg =
    (interaction.data as unknown as { options: [{ value: string }] }).options
      ?.[0]?.value

  const isValid = validateDiceNotation(notationArg)

  if (!isValid) {
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription("Invalid dice notation.")
      .setFooter(embedFooterDetails)
      .toJSON()
  }

  const result = roll(notationArg)
  return new EmbedBuilder()
    .setTitle("Success")
    .setDescription(`You rolled ${result.total}`)
    .setFooter(embedFooterDetails)
    .toJSON()
}

export function handleRoll(
  interaction: APIApplicationCommandInteraction,
) {
  const embed = buildEmbed(interaction)

  return {
    body: { embeds: [embed] },
    interaction_token: interaction.token,
    application_id: interaction.application_id,
  }
}
