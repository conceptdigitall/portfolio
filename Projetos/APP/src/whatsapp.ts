import { config } from "./config.js";

export async function sendWhatsAppMessage(text: string): Promise<void> {
  const url = `${config.evolutionApiUrl}/message/sendText/${config.evolutionInstanceName}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.evolutionApiKey,
    },
    body: JSON.stringify({
      number: config.notifyWhatsappNumber,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Evolution API returned ${response.status}: ${body}`);
  }
}
