import { REST, Routes, SlashCommandBuilder } from "npm:discord.js"
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts"
import { SlashCommands } from "./types.ts"

const env = await load()

const info = new SlashCommandBuilder()
  .setName(SlashCommands.Info)
  .setDescription("Learn more about RANDSUM")

const roll = new SlashCommandBuilder()
  .setName(SlashCommands.Roll)
  .setDescription("Test your luck with a roll of the dice")
  .addStringOption((option) =>
    option
      .setName("notation")
      .setDescription("A roll using dice notation - e.g. 2d6+3")
      .setRequired(true)
  )

const blades = new SlashCommandBuilder()
  .setName(SlashCommands.Blades)
  .setDescription("Crew up. Get in. Get out. Get Paid.")
  .addIntegerOption((option) =>
    option
      .setName("dice")
      .setDescription("The number of dice to roll")
      .setMinValue(0)
      .setMaxValue(10)
      .setRequired(true)
  )

const root = new SlashCommandBuilder()
  .setName(SlashCommands.Root)
  .setDescription("The woodland isn't gonna clear itself, vagbond.")
  .addIntegerOption((option) =>
    option
      .setName("plus")
      .setDescription("The number to add to the dice roll")
      .setMinValue(-4)
      .setMaxValue(4)
      .setRequired(true)
  )

const commands = [info, roll, blades, root].map((command) => command.toJSON())

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
