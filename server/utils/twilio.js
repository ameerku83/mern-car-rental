import twilio from "twilio"

 export const sendSMS = async (to, body) => {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: body, // The SMS message content
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: to, // The recipient's phone number
    });

    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
};
