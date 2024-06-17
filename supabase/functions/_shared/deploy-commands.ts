import { REST, Routes, SlashCommandBuilder } from "npm:discord.js"
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts"
import { SlashCommands } from "./types.ts"

const env = await load()

const roll = new SlashCommandBuilder()
  .setName(SlashCommands.Roll)
  .setDescription("Roll some dice. Test your luck.")
  .addStringOption((option) =>
    option
      .setName("diceNotation")
      .setDescription("A roll using dice notation - e.g. 2d6+3")
      .setRequired(true)
  )

const rollBlades = new SlashCommandBuilder()
  .setName(SlashCommands.Blades)
  .setDescription("Roll some dice. Test your luck.")
  .addIntegerOption((option) =>
    option
      .setName("dicePool")
      .setDescription("The number of dice to roll")
      .setMinValue(0)
      .setMaxValue(10)
      .setRequired(true)
  )

const commands = [roll, rollBlades].map((command) => command.toJSON())

const DISCORD_BOT_TOKEN = env["DISCORD_BOT_TOKEN"] ||
  Deno.env.get("DISCORD_BOT_TOKEN")
const DISCORD_APP_ID = env["DISCORD_APP_ID"] || Deno.env.get("DISCORD_APP_ID")

if (!DISCORD_APP_ID) {
  throw ("DISCORD_APP_ID is not set")
}
if (!DISCORD_BOT_TOKEN) {
  throw ("DISCORD_BOT_TOKEN is not set")
}

const rest = new REST({ version: "10" }).setToken(
  DISCORD_BOT_TOKEN,
)
rest
  .put(Routes.applicationCommands(DISCORD_APP_ID!), {
    body: commands,
  })
  .catch(console.error)
