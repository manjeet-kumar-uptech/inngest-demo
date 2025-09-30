import { inngest } from "./client";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.NEON_DB_URL,
});

export const helloFn = inngest.createFunction(
  { id: "hello-fn" },
  { event: "demo/hello" },
  async ({ event }) => {
    console.log("🎉 Received signup event:", event);
    console.log("📝 User message:", event.data.user);
    console.log("⏰ Event timestamp:", new Date().toISOString());

    const result = await pool.query(
    "INSERT INTO signups(user_name, created_at) VALUES($1, NOW())",
    [event.data.user]
    );

    console.log("🔄 Inserted signup event into database:", result);
    
    // Mock processing
    console.log("🔄 Processing signup event...");
    
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("✅ Signup event processed successfully!");
    console.log("📊 Event summary:", {
      eventName: event.name,
      userId: event.data.user,
      processedAt: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: `Signup processed for: ${event.data.user}`,
      processedAt: new Date().toISOString()
    };
  }
);
