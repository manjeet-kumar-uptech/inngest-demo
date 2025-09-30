import { serve } from "inngest/next";
import { inngest } from "../../../../inngest/client";
import { helloFn } from "../../../../inngest/functions";

// This endpoint registers functions with Inngest
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloFn],
});
