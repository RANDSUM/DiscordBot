import { EmbedBuilder } from "npm:@discordjs/builders"
import { getColor } from "./getColor.ts"
import { getExplanation } from "./getExplanation.ts"
import { parseRolls } from "./parseRolls.ts"
import { getThumbnail } from "./getThumbail.ts"
import { getRootRollType } from "./getRootRollType.ts"
import { getSuccessString } from "./getSuccessString.ts"
import { generateRollResult } from "./generateRollResult.ts"
import { embedFooterDetails } from "../../../constants.ts"
import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import deferredResponse from "../../../deferredResponse.ts"

const buildEmbed = (
  interaction: APIApplicationCommandInteraction,
) => {
  const modifierArg =
    (interaction.data as unknown as { options: [{ value: number }] }).options
      ?.[0]?.value
  const modifier = Number(modifierArg)
  const [explanationName, explanationValue] = getExplanation(
    modifier,
    interaction.member?.nick || "User",
  )

  const { total, rawRolls } = generateRollResult(modifier)
  const rollSuccess = getRootRollType(total)
  const [successTitle, successValue] = getSuccessString(rollSuccess)
  const color = getColor(rollSuccess)
  const thumbnail = getThumbnail(total)
  const rolls = Object.values(rawRolls)[0] as number[]

  return new EmbedBuilder()
    .setColor(color)
    .setTitle(successTitle)
    .setDescription(successValue)
    .setThumbnail(thumbnail)
    .addFields({ name: "\u200B", value: "\u200B" })
    .addFields({ name: explanationName, value: explanationValue })
    .addFields(
      {
        name: "Rolls",
        value: `[${parseRolls(rolls)}] + ${modifier}`,
        inline: true,
      },
    ).setFooter(embedFooterDetails)
    .toJSON()
}

export function handleRollRoot(
  interaction: APIApplicationCommandInteraction,
) {
  return deferredResponse(() => {
    return {
      body: { embeds: [buildEmbed(interaction)] },
      interaction_token: interaction.token,
      application_id: interaction.application_id,
    }
  })
}
