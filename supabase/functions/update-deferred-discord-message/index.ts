import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { Routes } from "https://deno.land/x/discord_api_types@0.37.73/v10.ts"
import discordRest from "../rollCommands/_shared/discordRest.ts"
import corsResponse, {
  corsHeaders,
} from "../rollCommands/_shared/corsResponse.ts"
import { DeferredResponseArgs } from "../rollCommands/_shared/types.ts"
import { Route } from "https://deno.land/x/httpcord_rest@v1.0.0/mod.ts"

serve({
  "/update-deferred-discord-message": updateDeferredDiscordMessage,
})

async function updateDeferredDiscordMessage(request: Request) {
  if (request.method === "OPTIONS") {
    return corsResponse()
  }

  const { application_id, interaction_token, body, privateMessage } =
    await request
      .json() as DeferredResponseArgs & { privateMessage: boolean }

  const route = `${
    Routes.webhook(application_id, interaction_token)
  }/messages/@original` as Route

  await discordRest.patch(
    route,
    { body: { ...body, flags: privateMessage ? 1 << 6 : undefined } },
  )

  return new Response("ok", { status: 200, headers: corsHeaders })
}
