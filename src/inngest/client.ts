import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "inngest-demo-app",  // unique app identifier
  eventKey: process.env.INNGEST_EVENT_KEY,
});
