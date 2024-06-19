import { REST } from "https://deno.land/x/httpcord_rest@v1.0.0/lib/REST.ts"

export default new REST({ version: "10" }).setToken(
  Deno.env.get("DISCORD_BOT_TOKEN")!,
)
