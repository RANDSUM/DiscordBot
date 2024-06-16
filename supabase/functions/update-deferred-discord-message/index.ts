import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts"

import { Routes } from "npm:discord-api-types/v10"
import discordRest from "../rollCommands/_shared/discordRest.ts"
import corsResponse, {
  corsHeaders,
} from "../rollCommands/_shared/corsResponse.ts"
import { DeferredResponseArgs } from "../rollCommands/_shared/types.ts"

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
  }/messages/@original` as `/${string}`

  console.log("ROUTE: ", route)

  await discordRest.patch(
    route,
    { body: { ...body, flags: privateMessage ? 1 << 6 : undefined } },
  )

  return new Response("ok", { status: 200, headers: corsHeaders })
}
