import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts"
import { verifySignature } from "./_shared/utils.ts"

import {
  APIInteraction,
  InteractionType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"
import { handleRollBlades } from "./_shared/commands/slash-commands/rollBlades/index.ts"
import { SlashCommands } from "../_shared/types.ts"
import deferredResponse from "./_shared/deferredResponse.ts"

serve({
  "/rollCommands": rollCommands,
})

async function rollCommands(request: Request) {
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  })
  if (error) {
    return json({ error: error.message }, { status: error.status })
  }

  const { valid, body } = await verifySignature(request)
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      },
    )
  }

  const rawBody: APIInteraction = JSON.parse(body)
  if (rawBody.type === InteractionType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    })
  }

  if (rawBody.type === InteractionType.ApplicationCommand) {
    console.log(rawBody)
    switch (rawBody.data.name) {
      case SlashCommands.Roll:
      case SlashCommands.RollBlades:
        // return deferredResponse(() => handleRollBlades(rawBody))
        return handleRollBlades(rawBody)
    }
  }

  return json({ error: "bad request" }, { status: 400 })
}
