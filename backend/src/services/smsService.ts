import Twilio from "twilio";
import { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN, SMS_FROM } from "../config.js";

const isConfigured = Boolean(SMS_ACCOUNT_SID && SMS_AUTH_TOKEN && SMS_FROM);

export async function sendSms(to: string, message: string) {
  if (!isConfigured) {
    console.log("[sms] disabled, would send:", { to, message });
    return;
  }

  const client = Twilio(SMS_ACCOUNT_SID, SMS_AUTH_TOKEN);
  await client.messages.create({
    body: message,
    from: SMS_FROM,
    to,
  });
}
